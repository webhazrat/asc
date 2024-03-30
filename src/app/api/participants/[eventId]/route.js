import connectDB from "@/lib/connect";
import { NextResponse } from "next/server";
import participationModel from "@/models/participationModel";
import { checkAuthUser } from "@/lib/apiAuth";

// get event wise participants
export async function GET(req, { params: { eventId } }) {
  const { searchParams } = new URL(req.url);
  const all = searchParams.get("all");

  try {
    const user = await checkAuthUser();

    let query = { event: eventId };
    let limit = 3;

    if (user?.role?.includes("Admin") && all) {
      console.log("Admin");
      limit = -1;
    }

    if (user?.role?.includes("Head") && !all) {
      console.log("Head");
      query = { event: eventId, passingYear: user.passingYear };
      limit = -1;
    }

    await connectDB();
    const participants = await participationModel
      .find(query)
      .populate({
        path: "student",
        select: { name: true, avatar: true, phone: true },
      })
      .sort({ createdAt: -1 })
      .limit(limit);

    const totalCount = await participationModel.countDocuments(query);

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
