import { checkAuthUser } from "@/lib/apiAuth";
import connectDB from "@/lib/connect";
import eventModel from "@/models/eventModel";
import { NextResponse } from "next/server";
import { del, put } from "@vercel/blob";

// patch an event
export async function PATCH(req, { params: { id } }) {
  try {
    // check admin role
    const user = await checkAuthUser();
    if (!user.role?.includes("Admin")) throw new Error("Unauthorized route");

    await connectDB();
    const formData = await req.formData();
    let { thumbnail, title, slug, description, fees, location, date, status } =
      Object.fromEntries(formData);

    fees = JSON.parse(fees);

    let parsedThumbnail = thumbnail;

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

    if (thumbnail?.name) {
      const blob = await put(thumbnail.name, thumbnail, {
        access: "public",
      });
      parsedThumbnail = blob.url;
    }

    // findByIdAndUpdate return prev document
    const event = await eventModel.findByIdAndUpdate(id, {
      thumbnail: parsedThumbnail,
      title,
      slug,
      description,
      fees,
      location,
      date,
      status,
    });

    if (thumbnail?.name && event?.thumbnail) {
      await del(event?.thumbnail);
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
export async function DELETE(req, { params: { id } }) {
  try {
    // check admin role
    const user = await checkAuthUser();
    if (!user.role?.includes("Admin")) throw new Error("Unauthorized route");

    await connectDB();
    const event = await eventModel.findByIdAndDelete(id);

    if (event?.thumbnail) {
      await del(event?.thumbnail);
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
