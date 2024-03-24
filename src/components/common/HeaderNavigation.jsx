"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AlignRight } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import NavItems from "./NavItems";
import Logo from "../../../public/logo.svg";
import UserDropdown from "./UserDropdown";
import { useUser } from "@/hooks/useUser";

export default function HeaderNavigation() {
  const { user, isLoading, error } = useUser();
  return (
    <div className="py-3 border-b border-muted w-fullbackdrop-filter backdrop-blur-lg bg-white/60 z-20 h-16">
      <div className="container flex justify-between items-center h-full">
        <Link href={"/"}>
          <Image src={Logo} alt="logo" />
        </Link>

        <div className="flex gap-2 items-center md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <AlignRight size={16} />
              </Button>
            </SheetTrigger>
            <SheetContent className="max-w-60">
              <div className="flex flex-col gap-2 mt-4">
                <NavItems />
              </div>
            </SheetContent>
          </Sheet>

          {user ? (
            <UserDropdown />
          ) : (
            <>
              <Button variant={"ghost"} size="sm" asChild>
                <Link href="/login">লগইন</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/register">জয়েন করুন</Link>
              </Button>
            </>
          )}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <NavItems />
          {user ? (
            <UserDropdown />
          ) : (
            <>
              <Button variant={"ghost"} asChild>
                <Link href="/login">লগইন</Link>
              </Button>
              <Button asChild>
                <Link href="/register">জয়েন করুন</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
