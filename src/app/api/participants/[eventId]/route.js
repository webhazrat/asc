import connectDB from "@/lib/connect";
import { NextResponse } from "next/server";
import participationModel from "@/models/participationModel";
import { checkAuthUser } from "@/lib/apiAuth";
import eventModel from "@/models/eventModel";

// dashboard/events/[eventId]/participants
// profile/events/[eventId]/participants
export async function GET(req, { params: { eventId } }) {
  const { searchParams } = new URL(req.url);
  const role = searchParams.get("role");
  const pageIndex = searchParams.get("pageIndex");
  const pageSize = searchParams.get("pageSize");
  const search = searchParams.get("search");
  const index = parseInt(pageIndex) || 0;
  const size = parseInt(pageSize) || 10;

  try {
    const user = await checkAuthUser();

    let sMatch = {};
    let limit = 3;

    if (user?.role?.includes("Admin") && role === "Admin") {
      console.log("Admin");
      limit = size;
    }

    if (user?.role?.includes("Head") && role === "Head") {
      console.log("Head");
      sMatch = { passingYear: user?.passingYear };
      limit = size;
    }

    const regex = new RegExp(search, "i");

    const match = { event: eventId };

    await connectDB();
    let participants = await participationModel
      .find(match)
      .populate([
        {
          path: "student",
          select: { name: true, avatar: true, phone: true, passingYear: true },
          match: {
            $and: [
              sMatch,
              {
                $or: [
                  { name: { $regex: regex } },
                  { phone: { $regex: regex } },
                  { passingYear: { $regex: regex } },
                ],
              },
            ],
          },
        },
        {
          path: "event",
          select: { fees: true },
        },
      ])
      .sort({ createdAt: -1 })
      .skip(index * size)
      .limit(size);

    participants = participants.filter((participant) => participant.student);

    const event = await eventModel.findById(eventId).select("title date");

    const total = await participationModel.countDocuments(match);

    return NextResponse.json(
      {
        event,
        total,
        pageCount: Math.ceil(total / size),
        pageSize: size,
        data: participants,
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
