import connectDB from "@/lib/connect";
import { NextResponse } from "next/server";
import participationModel from "@/models/participationModel";

// get event wise participants
export async function GET(req, { params }) {
  const { eventId } = params;
  try {
    await connectDB();
    const participants = await participationModel
      .find({ event: eventId })
      .populate({
        path: "student",
        select: { name: true, avatar: true },
      })
      .sort({ createdAt: -1 })
      .limit(10);

    const totalCount = await participationModel.countDocuments({
      event: eventId,
    });

    if (participants) {
      return NextResponse.json(
        {
          totalCount,
          participants,
        },
        {
          status: 200,
        }
      );
    } else {
      return NextResponse.json(
        {
          title: "দুঃখিত!",
          message: `অংশগ্রহণকারীর কোন তথ্য পাওয়া যায়নি`,
        },
        {
          status: 404,
        }
      );
    }
  } catch (error) {
    console.log({ participantsGetError: error });
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}
