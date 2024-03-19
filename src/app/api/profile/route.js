import { checkLogin } from "@/lib/apiAuth";
import connectDB from "@/lib/connect";
import { uniqueFilename } from "@/lib/utils";
import studentModel from "@/models/studentModel";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import { join } from "path";

export async function PATCH(req) {
  try {
    const session = await checkLogin();
    const formData = await req.formData();
    const data = Object.fromEntries(formData);
    const { avatar } = data;
    await connectDB();

    const avatarName = avatar.name ? uniqueFilename(avatar.name) : null;

    if (avatar.name) {
      const bytes = await avatar.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const path = join("", "public/avatar", avatarName);
      await writeFile(path, buffer);
    }

    const student = await studentModel.updateOne(
      { _id: session.user._id },
      {
        $set: {
          ...data,
          avatar: avatarName,
        },
      }
    );

    return NextResponse.json(
      { message: "Data updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
