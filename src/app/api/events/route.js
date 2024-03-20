import { NextResponse } from "next/server";
import eventModal from "@/models/eventModal";
import connectDB from "@/lib/connect";
import { checkAdmin } from "@/lib/apiAuth";
import { writeFile } from "fs/promises";
import { join } from "path";
import { generateFilename } from "@/lib/helpers";

// all events
export async function GET(req) {
  try {
    await connectDB();
    const events = await eventModal.find();
    return NextResponse.json({ events }, { status: 200 });
  } catch (error) {
    console.error({ eventsGetError: error });
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await checkAdmin();
    const formData = await req.formData();
    const data = Object.fromEntries(formData);
    const { thumbnail } = data;
    await connectDB();

    if (thumbnail.name) {
      const thumbnailName = generateFilename(thumbnail.name);
      const bytes = await thumbnail.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const path = join("", "public/uploads", thumbnailName);
      await writeFile(path, buffer);
      data.thumbnail = thumbnailName;
    }

    const event = await eventModal.create({
      ...data,
      author: session.user._id,
    });

    return NextResponse.json(
      { data: event, message: "ইভেন্ট সফলভাবে সংযুক্ত হয়েছে" },
      { status: 201 }
    );
  } catch (error) {
    console.error({ eventsPostError: error });
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
