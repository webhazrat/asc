import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import studentModel from "@/models/studentModel";
import { getServerSession } from "next-auth";
import connectDB from "./connect";

export async function checkAuthUser() {
  const session = await getServerSession(authOptions);
  if (session) {
    await connectDB();
    const user = await studentModel
      .findById(session.user._id)
      .select("_id role passingYear");
    if (user) {
      return user;
    }
    return null;
  }
  return null;
}
