import { UsersRound } from "lucide-react";
import Link from "next/link";

export default function Batch() {
  return (
    <Link href={"/batches/2010"}>
      <div className="rounded-lg border border-muted shadow-sm p-6 space-y-2 hover:outline outline-2 outline-offset-2">
        <h4 className="flex gap-2 items-center text-lg font-semibold mb-2">
          <UsersRound size={20} /> এসএসসি 2010
        </h4>
        <h2 className="text-muted-foreground">
          শিক্ষার্থী জয়েন হয়েছে 50 জনে
          <span className="text-green-500"> 10</span> জন
        </h2>
      </div>
    </Link>
  );
}
