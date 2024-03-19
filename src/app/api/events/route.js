import { NextResponse } from "next/server";
import eventModal from "@/models/eventModal";
import connectDB from "@/lib/connect";
import { checkAdmin } from "@/lib/apiAuth";
import { writeFile } from "fs/promises";
import { join } from "path";
import { uniqueFilename } from "@/lib/utils";

// all events
export async function GET(req) {
  return NextResponse.json("Hello");
}

export async function POST(req) {
  try {
    const session = await checkAdmin();
    const formData = await req.formData();
    const data = Object.fromEntries(formData);
    const { thumbnail } = data;
    await connectDB();

    if (thumbnail) {
      const bytes = await thumbnail.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const path = join("", "public/uploads", uniqueFilename(thumbnail.name));
      await writeFile(path, buffer);
    }

    const event = await eventModal.create({
      ...data,
      author: session.user._id,
      thumbnail: thumbnail ? thumbnail.name : null,
    });

    return NextResponse.json(
      { data: event, message: "Data submitted successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
