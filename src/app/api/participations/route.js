import connectDB from "@/lib/connect";
import { NextResponse } from "next/server";
import { checkAuthUser } from "@/lib/apiAuth";
import participationModel from "@/models/participationModel";

// get participations
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const pageIndex = searchParams.get("pageIndex");
  const pageSize = searchParams.get("pageSize");
  const search = searchParams.get("search") ?? "";
  const index = parseInt(pageIndex) || 0;
  const size = parseInt(pageSize) || 10;
  try {
    // check login
    const user = await checkAuthUser();
    if (!user?._id) throw new Error("Unauthorized route");

    const regex = new RegExp(search, "i");

    const match = {
      $and: [
        { student: user?._id },
        {
          $or: [
            { "event.title": { $regex: regex } },
            { status: { $regex: regex } },
          ],
        },
      ],
    };

    await connectDB();
    const participations = await participationModel
      .find(match)
      .populate({
        path: "event",
        select: { title: true, slug: true, fees: true, date: true },
      })
      .sort({ createdAt: -1 })
      .skip(index * size)
      .limit(size);

    const total = await participationModel.countDocuments({
      student: user._id,
    });
    return NextResponse.json(
      {
        total,
        pageCount: Math.ceil(total / size),
        pageSize: size,
        data: participations,
      },
      {
        status: 200,
      }
    );
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
    if (!user?._id) throw new Error("Unauthorized route");

    await connectDB();
    const { eventId } = await req.json();

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
