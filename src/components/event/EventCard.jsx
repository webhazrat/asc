import { Calendar } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { truncateString } from "@/lib/utils";
import Thumbnail from "../common/Thumbnail";

export default function EventCard({ event }) {
  const { slug, thumbnail, title, date, description } = event;
  return (
    <Link href={`events/${slug}`}>
      <div className="border border-muted rounded-lg p-2 hover:outline outline-2 outline-primary outline-offset-2 h-full">
        <Thumbnail
          thumbnail={thumbnail ? `/uploads/${thumbnail}` : ""}
          alt={title}
        />
        <div>
          <ul className="flex items-center gap-4 my-3">
            <li className="flex items-center gap-2">
              <Calendar size={16} /> {format(new Date(date), "dd MMMM, yyyy")}
            </li>
          </ul>
          <h2 className="text-lg font-semibold mb-2">{title}</h2>
          <p>{truncateString(description, 120)}</p>
        </div>
      </div>
    </Link>
  );
}
