import { checkAdmin } from "@/lib/apiAuth";
import connectDB from "@/lib/connect";
import { deleteFile } from "@/lib/helpers";
import eventModel from "@/models/eventModel";
import { NextResponse } from "next/server";

// get an event
export async function GET(req, { params }) {
  const { id } = params;
  try {
    await connectDB();
    const event = await eventModel.findOne({ _id: id });
    if (event) {
      return NextResponse.json(
        {
          event,
        },
        {
          status: 200,
        }
      );
    } else {
      return NextResponse.json(
        {
          title: "দুঃখিত!",
          message: `ইভেন্ট তথ্য পাওয়া যায়নি`,
        },
        {
          status: 404,
        }
      );
    }
  } catch (error) {
    console.log({ eventsIdGetError: error });
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}

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

    const eventExist = await eventModel.countDocuments({ slug });

    const event = await eventModel.findByIdAndUpdate(id, {});
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
