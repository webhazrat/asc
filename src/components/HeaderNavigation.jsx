"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { Moon, Search } from "lucide-react";

export default function HeaderNavigation() {
  return (
    <div className="py-3 sticky border-b border-gray-300/20 w-full top-0 backdrop-filter backdrop-blur-lg bg-white/60 z-20 h-16">
      <div className="container flex justify-between items-center">
        <Link href={"/"}>
          <Image src={"/logo.svg"} alt="logo" width={50} height={20} />
        </Link>

        <div className="flex items-center">
          <Button variant="ghost" asChild>
            <Link href={"/"}>Home</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href={"/batches"}>Batches</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href={"/teachers"}>Teachers</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href={"/about"}>About</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href={"/events"}>Events</Link>
          </Button>
          <Button variant="ghost">
            <span className="sr-only">Theme</span>
            <Moon size={16} />
          </Button>
          <Button variant="ghost">
            <span className="sr-only">Search</span>
            <Search size={16} />
          </Button>
          <Button variant="outline" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild className="ml-2">
            <Link href="/join">Let's Join</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
