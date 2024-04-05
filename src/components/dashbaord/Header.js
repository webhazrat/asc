import { AlignRight, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import UserDropdown from "../common/UserDropdown";
import LeftNavigation from "./LeftNavigation";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

export default function Header() {
  return (
    <div className="sticky top-0 z-30 flex gap-2 items-center justify-end border-b bg-background px-4 h-14">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm" className="block md:hidden">
            <AlignRight size={16} />
          </Button>
        </SheetTrigger>
        <SheetContent className="max-w-64 px-0">
          <LeftNavigation />
        </SheetContent>
      </Sheet>

      <Button size="sm" variant="ghost" asChild>
        <Link href={"/"}>
          <Home size={16} />
        </Link>
      </Button>
      <UserDropdown />
    </div>
  );
}
