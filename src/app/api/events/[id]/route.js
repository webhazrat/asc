import { checkAdmin } from "@/lib/apiAuth";
import connectDB from "@/lib/connect";
import { deleteFile, generateFilename } from "@/lib/helpers";
import eventModel from "@/models/eventModel";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";

// patch an event
export async function PATCH(req, { params }) {
  const { id } = params;
  try {
    await checkAdmin();
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

    const eventExist = await eventModel.countDocuments({
      slug,
      _id: { $ne: id },
    });

    if (eventExist) {
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

    // findByIdAndUpdate return prev document
    const event = await eventModel.findByIdAndUpdate(id, {
      thumbnail,
      title,
      slug,
      description,
      feeDetail,
      location,
      date,
      status,
    });

    if (event?.thumbnail) {
      await deleteFile(`./public/uploads/${event.thumbnail}`);
    }
    return NextResponse.json(
      { title: "সফল!", message: "ইভেন্ট সফলভাবে আপডেট হয়েছে" },
      { status: 200 }
    );
  } catch (error) {
    console.error({ eventsPatchError: error });
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// delete an event
export async function DELETE(req, { params }) {
  const { id } = params;
  try {
    await checkAdmin();
    await connectDB();
    const event = await eventModel.findByIdAndDelete(id);

    if (event?.thumbnail) {
      await deleteFile(`./public/uploads/${event.thumbnail}`);
    }

    return NextResponse.json(
      { title: "সফল!", message: "ইভেন্ট সফলভাবে ডিলিট হয়েছে" },
      { status: 200 }
    );
  } catch (error) {
    console.error({ eventsIdDeleteError: error });
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
