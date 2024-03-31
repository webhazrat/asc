import connectDB from "@/lib/connect";
import { NextResponse } from "next/server";
import participationModel from "@/models/participationModel";
import { checkAuthUser } from "@/lib/apiAuth";
import eventModel from "@/models/eventModel";

// get event wise participants
export async function GET(req, { params: { eventId } }) {
  const { searchParams } = new URL(req.url);
  const role = searchParams.get("role");

  try {
    const user = await checkAuthUser();

    let query = { event: eventId };
    let limit = 3;

    if (user?.role?.includes("Admin") && role === "Admin") {
      console.log("Admin");
      limit = -1;
    }

    if (user?.role?.includes("Head") && role === "Head") {
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

    const event = await eventModel.findById(eventId).select("title date");

    const totalCount = await participationModel.countDocuments(query);

    return NextResponse.json(
      {
        event,
        totalCount,
        participants,
      },
      {
        status: 200,
      }
    );
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
