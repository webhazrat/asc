import { UsersRound } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function Batch() {
  return (
    <Link href={"/batches/2010"}>
      <div className="rounded-lg border shadow-sm p-6 space-y-2 hover:outline outline-2 outline-offset-2">
        <h4 className="flex gap-2 items-center text-lg font-semibold mb-2">
          <UsersRound size={20} /> SSC 2010
        </h4>
        <h2 className="text-muted-foreground">
          Joined students <span className="text-green-500">10</span> of 50
        </h2>
        <div className="flex items-center gap-2">
          <Avatar className="w-7 h-7">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>{" "}
          Hazrat Ali
        </div>
      </div>
    </Link>
  );
}
