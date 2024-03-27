import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { AppWindow, LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useUser } from "@/hooks/useUser";
import CustomAvatar from "./CustomAvatar";

export default function UserDropdown() {
  const { user, isLoading } = useUser();
  const handleLogout = () => {
    signOut();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <CustomAvatar avatar={user?.avatar || ""} name={user?.name} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-2" align="end">
        <DropdownMenuLabel>আমার অ্যাকাউন্ট</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {user?.role?.includes("Admin") && (
            <Link href={"/dashboard"}>
              <DropdownMenuItem className="cursor-pointer">
                <AppWindow className="mr-2 h-4 w-4" />
                <span>ড্যাশবোর্ড</span>
              </DropdownMenuItem>
            </Link>
          )}

          <Link href={"/profile"}>
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>প্রোফাইল</span>
            </DropdownMenuItem>
          </Link>
          <Link href={"/profile/settings"}>
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>সেটিংস</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>লগ আউট</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
