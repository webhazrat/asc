import connectDB from "@/lib/connect";
import { NextResponse } from "next/server";
import { checkAuthUser } from "@/lib/apiAuth";
import participationModel from "@/models/participationModel";
import eventModel from "@/models/eventModel";

// get participations
export async function GET(req) {
  try {
    // check login
    const user = await checkAuthUser();
    if (!user._id) throw new Error("Unauthorized route");

    await connectDB();
    const participations = await participationModel
      .find({ student: user._id })
      .populate({
        path: "event",
        select: { title: true, slug: true, fees: true, date: true },
      });

    if (participations) {
      return NextResponse.json(
        {
          participations,
        },
        {
          status: 200,
        }
      );
    } else {
      return NextResponse.json(
        {
          title: "দুঃখিত!",
          message: `অংশগ্রহণের কোন তথ্য পাওয়া যায়নি`,
        },
        {
          status: 404,
        }
      );
    }
  } catch (error) {
    console.log({ participationsGetError: error });
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}

// create a participation
export async function POST(req) {
  try {
    // check login
    const user = await checkAuthUser();
    if (!user._id) throw new Error("Unauthorized route");

    await connectDB();
    const { eventId } = await req.json();

    const event = await eventModel.findById(eventId).select("fees");

    const student = await participationModel.countDocuments({
      event: eventId,
      student: user._id,
    });
    if (student) {
      return NextResponse.json(
        {
          title: "দুঃখিত!",
          message: "ইভেন্টে পূর্বেই অংশগ্রহণ করা হয়েছে",
        },
        { status: 400 }
      );
    }

    await participationModel.create({
      student: user._id,
      event: eventId,
      fees: event.fees,
    });

    return NextResponse.json(
      { title: "সফল!", message: "ইভেন্টে অংশগ্রহণ সফল হয়েছে" },
      { status: 201 }
    );
  } catch (error) {
    console.error({ participationsPostError: error });
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
