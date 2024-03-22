import Image from "next/image";
import { Button } from "../ui/button";
import { Banknote, Calendar, MapPin, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import EventCountDown from "./EventCountDown";
import { format } from "date-fns";
import { truncateString } from "@/lib/utils";
import Thumbnail from "../common/Thumbnail";

export default function FeaturedEventCard({ event }) {
  return (
    <div className="grid md:grid-cols-2 items-center p-4 md:p-8 gap-10 relative border border-muted rounded-2xl backdrop-filter backdrop-blur-lg">
      <div className="relative">
        <Thumbnail
          thumbnail={event?.thumbnail ? `/uploads/${event.thumbnail}` : ""}
          alt={event?.title}
        />
        <EventCountDown endDate={"2024-04-08T00:00:00.000+00:00"} />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl md:text-[28px] font-bold">{event?.title}</h2>
        <div>
          <ul className="space-y-1 text-muted-foreground">
            <li className="flex gap-2">
              <Calendar size={16} className="mt-1 shrink-0" />
              {event?.date
                ? format(new Date(event.date), "dd MMMM, yyyy")
                : "-"}
            </li>
            <li className="flex gap-2">
              <MapPin size={16} className="mt-1 shrink-0" />
              <span>{event?.location}</span>
            </li>
            <li className="flex gap-2">
              <Banknote size={16} className="mt-1 shrink-0" />
              <span>
                {event?.feeDetail}
                <span className="block text-primary">
                  (ব্যাচ প্রতিনিধির হাতে জমা দিতে হবে)
                </span>
              </span>
            </li>
          </ul>
        </div>
        <p>{truncateString(event?.description, 274)}</p>
        <div className="flex flex-col lg:flex-row lg:items-center gap-5 justify-between">
          <div className="flex items-center">
            <Button>অংশগ্রহন করুন</Button>
            <Button variant="link" asChild>
              <Link href={`events/${event?.slug}`}>বিস্তারিত দেখুন</Link>
            </Button>
          </div>
          <div className="flex -space-x-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=50&h=50&auto=format&fit=crop"
                alt="@shadcn"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=50&h=50&auto=format&fit=crop"
                alt="@shadcn"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=50&h=50&auto=format&fit=crop"
                alt="@shadcn"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="icon" className="rounded-full z-10">
              200 <Plus size={10} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
