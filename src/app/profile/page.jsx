"use client";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";

export default function Page() {
  const { data } = useSession();
  console.log({ data });
  return (
    <>
      <h1>Hello</h1>
      <Button onClick={() => signOut()}>লগ আউট</Button>
    </>
  );
}
