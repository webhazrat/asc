import connectDB from "@/lib/connect";
import studentModel from "@/models/studentModel";
import { NextResponse } from "next/server";

export async function GET(req, { params: { id } }) {
  try {
    await connectDB();
    const profile = await studentModel.findById(id).select("-password");
    if (profile) {
      return NextResponse.json(
        {
          user: profile,
        },
        {
          status: 200,
        }
      );
    } else {
      return NextResponse.json(
        {
          title: "দুঃখিত!",
          message: `ব্যবহারকারীর তথ্য পাওয়া যায়নি`,
        },
        {
          status: 404,
        }
      );
    }
  } catch (error) {
    console.log({ profileError: error });
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}
