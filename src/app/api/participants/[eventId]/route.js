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
    let match = {};
    let limit = 3;

    if (user?.role?.includes("Admin") && role === "Admin") {
      console.log("Admin");
      limit = null;
    }

    if (user?.role?.includes("Head") && role === "Head") {
      console.log("Head");
      match = { passingYear: user.passingYear };
      limit = null;
    }

    await connectDB();
    let participants = await participationModel
      .find(query)
      .populate([
        {
          path: "student",
          match: match,
          select: { name: true, avatar: true, phone: true, passingYear: true },
        },
        {
          path: "event",
          select: { fees: true },
        },
      ])
      .sort({ createdAt: -1 })
      .limit(limit);

    participants = participants.filter((participant) => participant.student);

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
