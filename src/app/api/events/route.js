import { NextResponse } from "next/server";
import eventModel from "@/models/eventModel";
import connectDB from "@/lib/connect";
import { checkAdmin } from "@/lib/apiAuth";
import { writeFile } from "fs/promises";
import { join } from "path";
import { generateFilename } from "@/lib/helpers";

// get all events
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const query = {};
  if (status) query.status = status;
  try {
    await connectDB();
    const events = await eventModel
      .find(query)
      .populate({
        path: "author",
        select: { name: true, _id: true, avatar: true },
      })
      .sort({ createdAt: -1 });
    return NextResponse.json({ events }, { status: 200 });
  } catch (error) {
    console.error({ eventsGetError: error });
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// create an event
export async function POST(req) {
  try {
    const session = await checkAdmin();
    await connectDB();
    const formData = await req.formData();
    let {
      thumbnail,
      title,
      slug,
      description,
      feeDetail,
      location,
      date,
      status,
    } = Object.fromEntries(formData);

    const event = await eventModel.countDocuments({ slug });
    if (event) {
      return NextResponse.json(
        {
          field: "slug",
          message: "ইভেন্ট স্ল্যাগটি পূর্বেই ব্যবহার করা হয়েছে",
        },
        { status: 400 }
      );
    }

    if (thumbnail.name) {
      const thumbnailName = generateFilename(thumbnail.name);
      const bytes = await thumbnail.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const path = join("", "public/uploads", thumbnailName);
      await writeFile(path, buffer);
      thumbnail = thumbnailName;
    }

    await eventModel.create({
      author: session.user._id,
      thumbnail,
      title,
      slug,
      description,
      feeDetail,
      location,
      date,
      status,
    });

    return NextResponse.json(
      { title: "সফল!", message: "ইভেন্ট সফলভাবে সংযুক্ত হয়েছে" },
      { status: 201 }
    );
  } catch (error) {
    console.error({ eventsPostError: error });
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
