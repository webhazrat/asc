"use client";
import Footer from "@/components/common/Footer";
import HeaderNavigation from "@/components/common/HeaderNavigation";
import Nav from "@/components/common/Nav";
import { ActivitySquare, Link, Lock, User, Users } from "lucide-react";

export default function ProfileLayout({ children }) {
  return (
    <>
      <HeaderNavigation />
      <div className="container py-10">
        <div className="flex gap-4">
          <div className="w-56">
            <Nav
              navs={[
                {
                  id: "1",
                  title: "প্রোফাইল",
                  href: "/profile",
                  icon: User,
                },
                {
                  id: "2",
                  title: "সোশ্যাল মেডিয়া",
                  href: "/socials",
                  icon: Link,
                },
                {
                  id: "3",
                  title: "টাইমলাইন",
                  href: "/timeline",
                  icon: ActivitySquare,
                },
                {
                  id: "4",
                  title: "ইভেন্টে অংশগ্রহণ",
                  href: "/event-participants",
                  icon: Users,
                },
                {
                  id: "5",
                  title: "পাসওয়ার্ড",
                  href: "/password",
                  icon: Lock,
                },
              ]}
            />
          </div>
          <div className="flex-1 px-4">{children}</div>
        </div>
      </div>
      <Footer />
    </>
  );
}
