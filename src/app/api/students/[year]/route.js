import connectDB from "@/lib/connect";
import studentModel from "@/models/studentModel";
import { NextResponse } from "next/server";

// get students with year
export async function GET(req, { params }) {
  const { year } = params;
  try {
    await connectDB();
    const students = await studentModel.find({ passingYear: year });
    if (students) {
      return NextResponse.json(
        {
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
    console.log({ studentsYearGetError: error });
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}
