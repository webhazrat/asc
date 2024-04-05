import connectDB from "@/lib/connect";
import studentModel from "@/models/studentModel";
import { NextResponse } from "next/server";

// batches/[year]
export async function GET(req, { params: { year } }) {
  const { searchParams } = new URL(req.url);
  const pageIndex = searchParams.get("pageIndex");
  const pageSize = searchParams.get("pageSize");
  const search = searchParams.get("search");
  const index = parseInt(pageIndex) || 0;
  const size = parseInt(pageSize) || 10;
  try {
    const regex = new RegExp(search, "i");

    const match = {
      $and: [
        { passingYear: year },
        {
          $or: [
            { name: { $regex: regex } },
            { phone: { $regex: regex } },
            { bloodGroup: search.toUpperCase() },
            { presentAddress: { $regex: regex } },
            { status: { $regex: regex } },
          ],
        },
      ],
    };

    await connectDB();
    const students = await studentModel
      .find(match)
      .sort({ createdAt: -1 })
      .skip(index * size)
      .limit(size);
    const total = await studentModel.countDocuments(match);
    return NextResponse.json(
      {
        total,
        pageCount: Math.ceil(total / size),
        pageSize: size,
        data: students,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log({ studentsYearGetError: error });
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}
