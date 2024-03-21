import { checkLogin } from "@/lib/apiAuth";
import connectDB from "@/lib/connect";
import { deleteFile, generateFilename } from "@/lib/helpers";
import studentModel from "@/models/studentModel";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import { join } from "path";

export async function PATCH(req) {
  try {
    const session = await checkLogin();
    await connectDB();
    const formData = await req.formData();
    let {
      avatar,
      prevAvatar,
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

    if (avatar.name) {
      const avatarName = generateFilename(avatar.name);
      const bytes = await avatar.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const path = join("", "public/uploads/avatars", avatarName);
      await writeFile(path, buffer);
      avatar = avatarName;

      if (prevAvatar)
        await deleteFile(`./public/uploads/avatars/${prevAvatar}`);
    }

    const student = await studentModel
      .findOneAndUpdate(
        { _id: session.user._id },
        {
          $set: {
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
          },
        },
        { new: true }
      )
      .select("-password");

    return NextResponse.json(
      { title: "সফল!", message: "প্রোফাইল তথ্য সফলভাবে আপডেট হয়েছে" },
      { status: 200 }
    );
  } catch (error) {
    console.error({ profileError: error });
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
