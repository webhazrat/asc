import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import studentModel from "@/models/studentModel";
import { getServerSession } from "next-auth";
import connectDB from "./connect";

export async function checkAdmin() {
  const session = await getServerSession(authOptions);
  if (session) {
    await connectDB();
    const user = await studentModel.findById(session.user._id).select("role");
    if (user.role.includes("Admin")) {
      return Promise.resolve(session);
    } else {
      return Promise.reject({ message: "Unauthorized route" });
    }
  }
  return Promise.reject({ message: "Unauthorized route" });
}

export async function checkHead() {
  const session = await getServerSession(authOptions);
  if (session) {
    await connectDB();
    const user = await studentModel.findById(session.user._id).select("role");
    if (user.role.includes("Head")) {
      return Promise.resolve(session);
    } else {
      return Promise.reject({ message: "Unauthorized route" });
    }
  }
  return Promise.reject({ message: "Unauthorized route" });
}

export async function checkLogin() {
  const session = await getServerSession(authOptions);
  if (session) {
    return Promise.resolve(session);
  }
  return Promise.reject({ message: "Unauthorized route" });
}
