"use client";
import logo from "../../../public/itwindow.svg";
import Image from "next/image";
import Header from "@/components/dashbaord/Header";
import LeftNavigation from "@/components/dashbaord/LeftNavigation";

export default function DashboardLayout({ children }) {
  return (
    <>
      <div className="w-60 border-r h-screen fixed top-0 hidden md:block">
        <div className="h-14 w-full border-b flex items-center p-4">
          <Image src={logo} height={30} alt="logo" />
        </div>
        <LeftNavigation />
      </div>
      <main className="md:pl-60">
        <Header />
        <div className="p-4">{children}</div>
      </main>
    </>
  );
}
