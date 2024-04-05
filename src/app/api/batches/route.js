import { NextResponse } from "next/server";
import connectDB from "@/lib/connect";
import { checkAuthUser } from "@/lib/apiAuth";
import batchModel from "@/models/batchModel";
import studentModel from "@/models/studentModel";

// get all batches
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const pageIndex = searchParams.get("pageIndex");
  const pageSize = searchParams.get("pageSize");
  const search = searchParams.get("search") ?? "";
  const index = parseInt(pageIndex) || 0;
  const size = parseInt(pageSize) || null;
  try {
    const regex = new RegExp(search, "i");

    const match = {
      $or: [{ passingYear: { $regex: regex } }],
    };

    await connectDB();
    const batches = await batchModel
      .find(match)
      .populate({
        path: "author",
        select: { name: true, _id: true, avatar: true },
      })
      .sort({ passingYear: -1 })
      .skip(index * size)
      .limit(size);

    const batchsWithStudents = await Promise.all(
      batches.map(async (batch) => {
        const students = await studentModel
          .find({ passingYear: batch.passingYear })
          .select({ _id: true });

        const batchData = {
          ...batch.toObject(),
          studentCount: students.length,
        };
        return batchData;
      })
    );

    const total = await batchModel.countDocuments();

    return NextResponse.json(
      {
        total,
        pageCount: Math.ceil(total / size),
        pageSize: size,
        data: batchsWithStudents,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error({ batchesGetError: error });
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// create a batch
export async function POST(req) {
  try {
    // check admin role
    const user = await checkAuthUser();
    if (!user.role?.includes("Admin")) throw new Error("Unauthorized route");

    await connectDB();
    const { passingYear, examineeNumber } = await req.json();

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
      author: user._id,
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
