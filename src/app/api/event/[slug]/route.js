import connectDB from "@/lib/connect";
import eventModel from "@/models/eventModel";
import { NextResponse } from "next/server";

// get an event
export async function GET(req, { params }) {
  const { slug } = params;
  try {
    await connectDB();
    const event = await eventModel.findOne({ slug });
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
    console.log({ eventsSlugGetError: error });
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}
