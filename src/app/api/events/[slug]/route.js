import connectDB from "@/lib/connect";
import eventModal from "@/models/eventModal";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { slug } = params;
  try {
    await connectDB();
    const event = await eventModal.findOne({ slug });
    if (event) {
      return NextResponse.json(
        {
          data: event,
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
    console.log({ eventSlugError: error });
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}
