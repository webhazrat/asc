"use client";
import DashboardHeader from "@/components/DashboardHeader";
import Nav from "@/components/Nav";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import logo from "../../../public/itwindow.svg";
import {
  CalendarClock,
  Group,
  LayoutGrid,
  Settings2,
  Users,
} from "lucide-react";

export default function DashboardLayout({ children }) {
  return (
    <>
      <div className="flex">
        <div className="w-60 border-r h-screen">
          <div className="h-14 border-b flex items-center p-4">
            <Image src={logo} height={30} alt="logo" />
          </div>
          <div className="p-4">
            <Nav
              navs={[
                {
                  id: "1",
                  title: "ড্যাশবোর্ড",
                  href: "/dashboard",
                  icon: LayoutGrid,
                },
                {
                  id: "2",
                  title: "ব্যাচসমূহ",
                  href: "/dashboard/batches",
                  icon: Group,
                },
                {
                  id: "3",
                  title: "টিচার্স",
                  href: "/dashboard/teachers",
                  icon: Users,
                },
                {
                  id: "4",
                  title: "ইভেন্টস",
                  href: "/dashboard/events",
                  icon: CalendarClock,
                },
                {
                  id: "5",
                  title: "স্টুডেন্টস",
                  href: "/dashboard/students",
                  icon: Users,
                },
              ]}
            />
          </div>
          <Separator />
          <div className="p-4">
            <Nav
              navs={[
                {
                  id: "6",
                  title: "ইউজারস",
                  href: "/dashboard/users",
                  icon: Users,
                },
                {
                  id: "7",
                  title: "সেটিংস",
                  href: "/dashboard/settings",
                  icon: Settings2,
                },
              ]}
            />
          </div>
        </div>
        <main className="flex-1">
          <DashboardHeader />
          <div className="p-4">{children}</div>
        </main>
      </div>
    </>
  );
}
