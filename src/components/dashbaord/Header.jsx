import { Home } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import UserDropdown from "../common/UserDropdown";

export default function Header() {
  return (
    <div className="sticky top-0 flex gap-2 items-center justify-end border-b bg-background px-4 h-14">
      <Button size="icon" variant="ghost" asChild>
        <Link href={"/"}>
          <Home size={16} />
        </Link>
      </Button>
      <UserDropdown />
    </div>
  );
}
