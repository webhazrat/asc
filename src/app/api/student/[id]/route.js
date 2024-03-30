import { checkAuthUser } from "@/lib/apiAuth";
import connectDB from "@/lib/connect";
import studentModel from "@/models/studentModel";
import { NextResponse } from "next/server";

// student update
export async function PATCH(req, { params: { id } }) {
  try {
    // check admin role
    const user = await checkAuthUser();
    if (!user.role?.includes("Admin")) throw new Error("Unauthorized route");

    await connectDB();
    const { passingYear, role, status } = await req.json();

    if (role.includes("Head")) {
      const existStudent = await studentModel.countDocuments({
        passingYear,
        role: { $in: ["Head"] },
        _id: { $ne: id },
      });
      if (existStudent) {
        return NextResponse.json(
          {
            field: "role",
            message: `ব্যাচ (${passingYear}) প্রতিনিধি পূর্বেই সংযুক্ত আছে`,
          },
          { status: 400 }
        );
      }
    }

    await studentModel.updateOne(
      { _id: id },
      {
        $set: {
          role,
          status,
        },
      }
    );

    return NextResponse.json(
      { title: "সফল!", message: "শিক্ষার্থী তথ্য সফলভাবে আপডেট হয়েছে" },
      { status: 200 }
    );
  } catch (error) {
    console.error({ studentPatchApiError: error });
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
