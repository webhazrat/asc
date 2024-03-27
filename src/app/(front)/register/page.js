import RegisterForm from "@/components/auth/RegisterForm";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/profile");
  }
  return (
    <>
      <RegisterForm />
    </>
  );
}
