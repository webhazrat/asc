import { checkLogin } from "@/lib/apiAuth";
import connectDB from "@/lib/connect";
import { createFile, deleteFile } from "@/lib/helpers";
import studentModel from "@/models/studentModel";
import { NextResponse } from "next/server";

// profile update
export async function PATCH(req) {
  const folder = "public/uploads/avatars";
  try {
    const session = await checkLogin();
    await connectDB();
    const formData = await req.formData();
    let {
      avatar,
      name,
      dob,
      bloodGroup,
      passingYear,
      presentAddress,
      permanentAddress,
      qualification,
      institute,
      professionalInstitute,
      designation,
    } = Object.fromEntries(formData);

    let parsedAvatar = avatar;

    if (avatar.name) {
      parsedAvatar = await createFile(avatar, folder);
    }

    const student = await studentModel
      .findOneAndUpdate(
        { _id: session.user._id },
        {
          $set: {
            avatar: parsedAvatar,
            name,
            dob,
            bloodGroup,
            passingYear,
            presentAddress,
            permanentAddress,
            qualification,
            institute,
            professionalInstitute,
            designation,
          },
        }
      )
      .select("-password");

    if (avatar?.name && student?.avatar) {
      await deleteFile(student?.avatar, folder);
    }

    return NextResponse.json(
      { title: "সফল!", message: "প্রোফাইল তথ্য সফলভাবে আপডেট হয়েছে" },
      { status: 200 }
    );
  } catch (error) {
    console.error({ profileError: error });
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
