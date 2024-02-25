import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { AlignRight } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import NavItems from "./NavItems";

export default function HeaderNavigation() {
  return (
    <div className="py-3 sticky border-b border-muted w-full top-0 backdrop-filter backdrop-blur-lg bg-white/60 z-20 h-16">
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
            <div className="flex flex-col gap-2 mt-4">
              <NavItems />
            </div>
          </SheetContent>
        </Sheet>

        <div className="hidden md:flex items-center gap-2">
          <NavItems />
        </div>
      </div>
    </div>
  );
}
