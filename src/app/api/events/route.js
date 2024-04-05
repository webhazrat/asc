import { NextResponse } from "next/server";
import eventModel from "@/models/eventModel";
import connectDB from "@/lib/connect";
import { checkAuthUser } from "@/lib/apiAuth";
import { put } from "@vercel/blob";

// dashboard/events
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const pageIndex = searchParams.get("pageIndex");
  const pageSize = searchParams.get("pageSize");
  const search = searchParams.get("search") ?? "";
  const index = parseInt(pageIndex) || 0;
  const size = parseInt(pageSize) || 10;

  const status = searchParams.get("status");

  try {
    const regex = new RegExp(search, "i");
    const match = {
      $and: [
        status ? { status: status } : {},
        {
          $or: [
            { title: { $regex: regex } },
            { description: { $regex: regex } },
            { location: { $regex: regex } },
            { status: { $regex: regex } },
          ],
        },
      ],
    };

    await connectDB();
    const events = await eventModel
      .find(match)
      .populate({
        path: "author",
        select: { name: true, _id: true, avatar: true },
      })
      .sort({ createdAt: -1 })
      .skip(index * size)
      .limit(size);
    const total = await eventModel.countDocuments(match);
    return NextResponse.json(
      {
        total,
        pageCount: Math.ceil(total / size),
        pageSize: size,
        data: events,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error({ eventsGetError: error });
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// create an event
export async function POST(req) {
  try {
    // check admin role
    const user = await checkAuthUser();
    if (!user.role?.includes("Admin")) throw new Error("Unauthorized route");

    await connectDB();
    const formData = await req.formData();
    let { thumbnail, title, slug, description, fees, location, date, status } =
      Object.fromEntries(formData);

    fees = JSON.parse(fees);

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

    if (thumbnail?.name) {
      const blob = await put(thumbnail.name, thumbnail, {
        access: "public",
      });
      thumbnail = blob.url;
    }

    await eventModel.create({
      author: user._id,
      thumbnail,
      title,
      slug,
      description,
      fees,
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
