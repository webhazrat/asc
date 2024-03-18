import connectDB from "@/lib/connect";
import studentModel from "@/models/studentModel";
import { NextResponse } from "next/server";
import { isValidObjectId } from "mongoose";

export async function GET(req, { params }) {
  const id = params.id;
  try {
    await connectDB();

    if (isValidObjectId(id)) {
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
    } else {
      return NextResponse.json(
        {
          title: "দুঃখিত!",
          message: `প্রোফাইল আইডি টি সঠিক নয়`,
        },
        {
          status: 400,
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
