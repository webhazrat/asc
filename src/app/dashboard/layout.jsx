"use client";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import logo from "../../../public/itwindow.svg";
import {
  CalendarClock,
  Group,
  LayoutGrid,
  MessageCircle,
  MessageSquare,
  Settings2,
  Users,
} from "lucide-react";
import Header from "@/components/dashbaord/Header";
import Nav from "@/components/common/Nav";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function DashboardLayout({ children }) {
  return (
    <>
      <div className="w-60 border-r h-screen fixed top-0">
        <div className="h-14 w-full border-b flex items-center p-4">
          <Image src={logo} height={30} alt="logo" />
        </div>
        <ScrollArea className="h-[calc(100vh_-_64px)]">
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
                  title: "মেসেজ সেটিংস",
                  href: "/dashboard/message",
                  icon: MessageSquare,
                },
                {
                  id: "8",
                  title: "সেটিংস",
                  href: "/dashboard/settings",
                  icon: Settings2,
                },
              ]}
            />
          </div>
        </ScrollArea>
      </div>
      <main className="pl-60">
        <Header />
        <div className="p-4">{children}</div>
      </main>
    </>
  );
}
