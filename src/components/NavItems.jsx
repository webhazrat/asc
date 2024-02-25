"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { Moon, Search } from "lucide-react";
import { usePathname } from "next/navigation";

export default function NavItems() {
  const pathname = usePathname();
  const isActive = (path) => {
    return path === pathname || pathname.includes(path) ? "secondary" : "ghost";
  };
  return (
    <>
      <Button variant={isActive("/batches")} asChild className="justify-start">
        <Link href={"/batches"}>ব্যাচসমূহ</Link>
      </Button>
      <Button variant={isActive("/teachers")} asChild className="justify-start">
        <Link href={"/teachers"}>শিক্ষক</Link>
      </Button>
      <Button variant={isActive("/about")} asChild className="justify-start">
        <Link href={"/about"}>আমাদের সম্পর্কে</Link>
      </Button>
      <Button variant={isActive("/events")} asChild className="justify-start">
        <Link href={"/events"}>ইভেন্টস</Link>
      </Button>
      <Button variant="ghost" size="icon">
        <span className="sr-only">Theme</span>
        <Moon size={16} />
      </Button>
      <Button variant="ghost" size="icon">
        <span className="sr-only">Search</span>
        <Search size={16} />
      </Button>
      <Button variant={isActive("/login")} asChild>
        <Link href="/login">লগইন</Link>
      </Button>
      <Button asChild>
        <Link href="/join">জয়েন করুন</Link>
      </Button>
    </>
  );
}
