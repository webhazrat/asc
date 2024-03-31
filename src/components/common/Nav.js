"use client";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";

export default function Nav({ navs }) {
  const { user } = useUser();
  const pathname = usePathname();
  return (
    <div className="flex flex-col gap-1">
      {navs.map((nav) => {
        if (
          !user?.role?.includes("Head") &&
          nav.href === "/profile/event-participants"
        ) {
          return;
        }
        return (
          <Button
            key={nav.id}
            className="w-full justify-start"
            size="sm"
            variant={
              (nav.href.includes("/dashboard/") &&
                pathname.includes(nav.href)) ||
              (nav.href.includes("/profile/") && pathname.includes(nav.href)) ||
              pathname === nav.href
                ? ""
                : "ghost"
            }
            asChild
          >
            <Link href={nav.href}>
              {nav.icon && <nav.icon className="mr-2 h-4 w-4" />} {nav.title}
            </Link>
          </Button>
        );
      })}
    </div>
  );
}
