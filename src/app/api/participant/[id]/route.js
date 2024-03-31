import { checkAuthUser } from "@/lib/apiAuth";
import connectDB from "@/lib/connect";
import participationModel from "@/models/participationModel";
import { NextResponse } from "next/server";

export async function PATCH(req, { params: { id } }) {
  try {
    // check head role
    const user = await checkAuthUser();
    if (!user.role?.includes("Head")) throw new Error("Unauthorized route");
    await connectDB();

    let { fees } = await req.json();

    await participationModel.findByIdAndUpdate(id, {
      fees,
      author: user._id,
      status: "Paid",
    });
    return NextResponse.json(
      { title: "সফল!", message: "পেমেন্ট সংগ্রহ সফল হয়েছে" },
      { status: 200 }
    );
  } catch (error) {
    console.log({ participantPatchError: error });
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}
