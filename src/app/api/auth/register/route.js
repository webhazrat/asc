import connectDB from "@/lib/connect";
import { generateOTP } from "@/lib/utils";
import { registerSchema } from "@/lib/zodSchema";
import otpModel from "@/models/otpModel";
import studentModel from "@/models/studentModel";
import { hashSync } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();
    registerSchema.parse(data);
    const { name, phone, password, passingYear, bloodGroup } = data;
    await connectDB();

    // existing student find
    const exist = await studentModel.findOne({ phone }).select("status");

    if (exist?.status === "Verified") {
      return NextResponse.json(
        {
          error: {
            field: "phone",
            message: "মোবাইল নাম্বার পূর্বেই ব্যবহার করে হয়েছে",
          },
        },
        { status: 400 }
      );
    }

    // otp generate and store to db and send to phone
    const otp = generateOTP();
    await otpModel.updateOne({ phone }, { $set: { otp } }, { upsert: true });
    // sendToPhone()

    // student create
    const hashedPassword = hashSync(password, 10);
    await studentModel.updateOne(
      {
        phone,
      },
      {
        $set: {
          name,
          password: hashedPassword,
          passingYear,
          bloodGroup,
        },
      },
      { upsert: true }
    );

    return NextResponse.json(
      {
        title: "অভিনন্দন!",
        message: `আপনার ফোনে ${phone} ওটিপি পাঠানো হয়েছে`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log({ RegisterError: error });
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}
