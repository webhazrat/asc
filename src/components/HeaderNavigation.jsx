import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { AlignRight, Moon, Search } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

export default function HeaderNavigation() {
  return (
    <div className="py-3 sticky border-b border-gray-300/20 w-full top-0 backdrop-filter backdrop-blur-lg bg-white/60 z-20 h-16">
      <div className="container flex justify-between items-center h-full">
        <Link href={"/"}>
          <Image src={"/logo.svg"} width={50} height={20} alt="logo" />
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <AlignRight size={16} />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col gap-3 mt-4">
              <Button variant="ghost" asChild className="justify-start">
                <Link href={"/batches"}>ব্যাচসমূহ</Link>
              </Button>
              <Button variant="ghost" asChild className="justify-start">
                <Link href={"/teachers"}>শিক্ষক</Link>
              </Button>
              <Button variant="ghost" asChild className="justify-start">
                <Link href={"/about"}>আমাদের সম্পর্কে</Link>
              </Button>
              <Button variant="ghost" asChild className="justify-start">
                <Link href={"/events"}>ইভেন্ট</Link>
              </Button>
              <Button variant="ghost" size="icon">
                <span className="sr-only">Theme</span>
                <Moon size={16} />
              </Button>
              <Button variant="ghost" size="icon">
                <span className="sr-only">Search</span>
                <Search size={16} />
              </Button>
              <Button variant="outline" asChild>
                <Link href="/login">লগইন</Link>
              </Button>
              <Button asChild>
                <Link href="/join">জয়েন করুন</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>

        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" asChild className="justify-start">
            <Link href={"/batches"}>ব্যাচসমূহ</Link>
          </Button>
          <Button variant="ghost" asChild className="justify-start">
            <Link href={"/teachers"}>শিক্ষক</Link>
          </Button>
          <Button variant="ghost" asChild className="justify-start">
            <Link href={"/about"}>আমাদের সম্পর্কে</Link>
          </Button>
          <Button variant="ghost" asChild className="justify-start">
            <Link href={"/events"}>ইভেন্ট</Link>
          </Button>
          <Button variant="ghost" size="icon">
            <span className="sr-only">Theme</span>
            <Moon size={16} />
          </Button>
          <Button variant="ghost" size="icon">
            <span className="sr-only">Search</span>
            <Search size={16} />
          </Button>
          <Button variant="outline" asChild>
            <Link href="/login">লগইন</Link>
          </Button>
          <Button asChild>
            <Link href="/join">জয়েন করুন</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
