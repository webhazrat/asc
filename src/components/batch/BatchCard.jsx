import { UsersRound } from "lucide-react";
import Link from "next/link";

export default function BatchCard({ batch }) {
  return (
    <Link href={`/batches/${batch.passingYear}`}>
      <div className="rounded-lg border border-muted shadow-sm p-6 space-y-2 hover:outline outline-2 outline-primary outline-offset-2">
        <h4 className="flex gap-2 items-center text-lg font-semibold mb-2">
          <UsersRound size={20} /> এসএসসি {batch.passingYear}
        </h4>
        <h2 className="text-muted-foreground">
          শিক্ষার্থী জয়েন হয়েছে {batch.examineeNumber} জনে
          <span className="text-green-500"> {batch.studentCount} </span> জন
        </h2>
      </div>
    </Link>
  );
}
