import connectDB from "@/lib/connect";
import { otpSchema } from "@/lib/zodSchema";
import otpModel from "@/models/otpModel";
import studentModel from "@/models/studentModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();
    otpSchema.parse(data);
    const { phone, otp } = data;
    await connectDB();

    // verify otp
    const otpDoc = await otpModel.findOne({ phone });
    if (!otpDoc || otpDoc.otp !== otp) {
      return NextResponse.json(
        {
          field: "otp",
          message: "OTP টি সঠিক নয়",
        },
        { status: 400 }
      );
    }

    const now = Date.now();
    if (now > otpDoc.expiresAt) {
      return NextResponse.json(
        {
          field: "otp",
          message: "OTP টির মেয়াদ শেষ",
        },
        { status: 400 }
      );
    }

    await otpModel.deleteOne({ phone });

    await studentModel.findOneAndUpdate({ phone }, { status: "Verified" });

    return NextResponse.json(
      {
        title: "অভিনন্দন!",
        message: `আপনার অ্যাকাউন্ট সম্পন্ন হয়েছে`,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log({ verifyError: error });
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}
