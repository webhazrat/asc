import connectDB from "@/lib/connect";
import { NextResponse } from "next/server";
import participationModel from "@/models/participationModel";
import { checkLogin } from "@/lib/apiAuth";

// get participations
export async function GET(req) {
  try {
    const session = await checkLogin();
    const id = session.user._id;
    await connectDB();
    const participations = await participationModel
      .find({ student: id })
      .populate({
        path: "event",
        select: { title: true, slug: true, fees: true, date: true },
      });

    if (participations) {
      return NextResponse.json(
        {
          participations: participations,
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
    const session = await checkLogin();
    const id = session.user._id;
    await connectDB();
    const { eventId } = await req.json();

    const student = await participationModel.countDocuments({
      event: eventId,
      student: id,
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
      student: id,
      event: eventId,
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
