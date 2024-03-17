"use client";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Nav({ navs }) {
  const pathname = usePathname();
  return (
    <div className="flex flex-col gap-1">
      {navs.map((nav) => (
        <Button
          key={nav.id}
          className="w-full justify-start"
          size="sm"
          variant={pathname === nav.href ? "" : "ghost"}
          asChild
        >
          <Link href={nav.href}>
            {nav.icon && <nav.icon className="mr-2 h-4 w-4" />} {nav.title}
          </Link>
        </Button>
      ))}
    </div>
  );
}
