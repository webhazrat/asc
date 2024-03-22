import { NextResponse } from "next/server";
import connectDB from "@/lib/connect";
import { checkAdmin } from "@/lib/apiAuth";
import batchModel from "@/models/batchModel";

// get all batches
export async function GET(req) {
  try {
    await connectDB();
    const batches = await batchModel
      .find()
      .populate({
        path: "author",
        select: { name: true, _id: true, avatar: true },
      })
      .sort({ passingYear: -1 });
    return NextResponse.json({ batches }, { status: 200 });
  } catch (error) {
    console.error({ batchesGetError: error });
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// create a batch
export async function POST(req) {
  try {
    const session = await checkAdmin();
    await connectDB();
    const data = await req.json();
    console.log({ data });
    const { passingYear, examineeNumber } = data;

    const batch = await batchModel.countDocuments({ passingYear });
    if (batch) {
      return NextResponse.json(
        {
          field: "passingYear",
          message: "পাশের সাল পূর্বেই ব্যবহার করা হয়েছে",
        },
        { status: 400 }
      );
    }

    await batchModel.create({
      author: session.user._id,
      passingYear,
      examineeNumber,
    });

    return NextResponse.json(
      { title: "সফল!", message: "ব্যাচ সফলভাবে সংযুক্ত হয়েছে" },
      { status: 201 }
    );
  } catch (error) {
    console.error({ batchesPostError: error });
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
