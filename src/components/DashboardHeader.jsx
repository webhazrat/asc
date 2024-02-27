import { Home, LogOut, Settings, User } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Image from "next/image";
import photo from "../../public/student1.png";

export default function DashboardHeader() {
  return (
    <div className="flex gap-2 items-center justify-end border-b px-4 h-14">
      <Button size="icon" variant="ghost" asChild>
        <Link href={"/"}>
          <Home size={16} />
        </Link>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full p-[2px]"
          >
            <Image src={photo} alt="photo" className="rounded-full" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 mr-2">
          <DropdownMenuLabel>আমার অ্যাকাউন্ট</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>প্রোফাইল</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>সেটিংস</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>লগ আউট</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
