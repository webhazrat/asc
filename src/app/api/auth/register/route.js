import connectDB from "@/lib/connect";
import { generateOTP } from "@/lib/utils";
import { registerSchema } from "@/lib/zodSchema";
import otpModel from "@/models/otpModel";
import studentModel from "@/models/studentModel";
import { hashSync } from "bcryptjs";

export async function POST(req) {
  try {
    const data = await req.json();
    registerSchema.parse(data);
    const { name, phone, password, passingYear, bloodGroup } = data;
    await connectDB();

    // existing student find
    const exist = await studentModel.findOne({ phone }).select("status");

    if (exist && exist.status === "Verified") {
      return Response.json({
        status: 400,
        error: {
          field: "phone",
          message: "মোবাইল নাম্বার পূর্বেই ব্যবহার করে হয়েছে",
        },
      });
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

    return Response.json({
      status: 200,
      title: "অভিনন্দন!",
      message: `আপনার ফোনে ${phone} ওটিপি পাঠানো হয়েছে`,
    });
  } catch (error) {
    console.log({ error });
    return Response.json({
      status: 500,
      message: error.message,
    });
  }
}
