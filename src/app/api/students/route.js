import { checkAuthUser } from "@/lib/apiAuth";
import connectDB from "@/lib/connect";
import studentModel from "@/models/studentModel";
import { NextResponse } from "next/server";

// dashboard/students
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const pageIndex = searchParams.get("pageIndex");
  const pageSize = searchParams.get("pageSize");
  const search = searchParams.get("search");
  const index = parseInt(pageIndex) || 0;
  const size = parseInt(pageSize) || 10;
  try {
    // check admin role
    const user = await checkAuthUser();
    if (!user?.role?.includes("Admin")) throw new Error("Unauthorized route");

    const regex = new RegExp(search, "i");
    const match = {
      $or: [
        { name: { $regex: regex } },
        { phone: { $regex: regex } },
        { bloodGroup: { $regex: regex } },
        { passingYear: { $regex: regex } },
        { presentAddress: { $regex: regex } },
        { status: { $regex: regex } },
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
    console.log({ studentsGetError: error });
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}
