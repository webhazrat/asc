import { checkAuthUser } from "@/lib/apiAuth";
import connectDB from "@/lib/connect";
import studentModel from "@/models/studentModel";
import { NextResponse } from "next/server";

// get all students with year
export async function GET(req) {
  try {
    // check admin role
    const user = await checkAuthUser();
    if (!user.role?.includes("Admin")) throw new Error("Unauthorized route");

    await connectDB();
    const students = await studentModel.find().sort({ createdAt: -1 });
    const totalCount = await studentModel.countDocuments();
    if (students) {
      return NextResponse.json(
        {
          totalCount,
          students,
        },
        {
          status: 200,
        }
      );
    } else {
      return NextResponse.json(
        {
          title: "দুঃখিত!",
          message: `শিক্ষার্থীর তথ্য পাওয়া যায়নি`,
        },
        {
          status: 404,
        }
      );
    }
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
