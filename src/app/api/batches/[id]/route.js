import { checkAuthUser } from "@/lib/apiAuth";
import connectDB from "@/lib/connect";
import batchModel from "@/models/batchModel";
import { NextResponse } from "next/server";

// patch a batch
export async function PATCH(req, { params: { id } }) {
  try {
    // check admin role
    const user = await checkAuthUser();
    if (!user.role?.includes("Admin")) throw new Error("Unauthorized route");

    await connectDB();
    const data = await req.json();
    const { passingYear, examineeNumber } = data;

    const batchExist = await batchModel.countDocuments({
      passingYear,
      _id: { $ne: id },
    });

    if (batchExist) {
      return NextResponse.json(
        {
          field: "passingYear",
          message: "পাশের সাল পূর্বেই ব্যবহার করা হয়েছে",
        },
        { status: 400 }
      );
    }
    await batchModel.findByIdAndUpdate(id, {
      passingYear,
      examineeNumber,
    });

    return NextResponse.json(
      { title: "সফল!", message: "ব্যাচ সফলভাবে আপডেট হয়েছে" },
      { status: 200 }
    );
  } catch (error) {
    console.error({ batchesPatchError: error });
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// delete an event
export async function DELETE(req, { params: { id } }) {
  try {
    // check admin role
    const user = await checkAuthUser();
    if (!user.role?.includes("Admin")) throw new Error("Unauthorized route");

    await connectDB();
    await batchModel.findByIdAndDelete(id);

    return NextResponse.json(
      { title: "সফল!", message: "ব্যাচ সফলভাবে ডিলিট হয়েছে" },
      { status: 200 }
    );
  } catch (error) {
    console.error({ batchesIdDeleteError: error });
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
