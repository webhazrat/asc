import { checkLogin } from "@/lib/apiAuth";
import connectDB from "@/lib/connect";
import { deleteFile, generateFilename } from "@/lib/helpers";
import studentModel from "@/models/studentModel";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import { join } from "path";

// profile update
export async function PATCH(req) {
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
      const avatarName = generateFilename(avatar.name);
      const bytes = await avatar.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const path = join(process.cwd(), "public/uploads/avatars", avatarName);
      await writeFile(path, buffer);
      parsedAvatar = avatarName;
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
      const path = join(
        process.cwd(),
        "public/uploads/avatars",
        student?.avatar
      );
      console.log({ path });
      await deleteFile(path);
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
