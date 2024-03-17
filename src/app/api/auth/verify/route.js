import connectDB from "@/lib/connect";
import { otpSchema } from "@/lib/zodSchema";
import otpModel from "@/models/otpModel";
import studentModel from "@/models/studentModel";

export async function POST(req) {
  try {
    const data = await req.json();
    otpSchema.parse(data);
    const { phone, otp } = data;
    await connectDB();

    // verify otp
    const otpDoc = await otpModel.findOne({ phone });
    if (!otpDoc || otpDoc.otp !== otp) {
      return Response.json({
        status: 400,
        error: {
          field: "otp",
          message: "OTP টি সঠিক নয়",
        },
      });
    }

    const now = Date.now();
    if (now > otpDoc.expiresAt) {
      return Response.json({
        status: 400,
        error: {
          field: "otp",
          message: "OTP টির মেয়াদ শেষ",
        },
      });
    }

    await otpModel.deleteOne({ phone });

    await studentModel.findOneAndUpdate({ phone }, { status: "Verified" });

    return Response.json({
      status: 200,
      title: "অভিনন্দন!",
      message: `আপনার অ্যাকাউন্ট সম্পন্ন হয়েছে`,
    });
  } catch (error) {
    console.log({ verifyError: error });
    return Response.json({
      status: 500,
      message: error.message,
    });
  }
}
