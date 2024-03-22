import Image from "next/image";
import { Button } from "../ui/button";
import { Calendar, MapPin, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import eventImage from "../../../public/iftar-2023.jpg";
import Thumbnail from "../common/Thumbnail";
import { format } from "date-fns";

export default function Event({ event }) {
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl md:text-[28px] font-bold mb-5 text-center max-w-2xl mx-auto">
        {event.title}
      </h2>

      <Thumbnail
        thumbnail={event.thumbnail ? `/uploads/${event.thumbnail}` : ""}
        alt={event.title}
      />

      <ul className="flex items-center gap-5 justify-center py-5 font-medium">
        <li className="flex items-center gap-2">
          <Calendar size={20} className="shrink-0" />
          {format(new Date(event.date), "dd MMMM, yyyy")}
        </li>
        <li className="flex items-center gap-2">
          <MapPin size={20} className="shrink-0" />
          <span>{event.location}</span>
        </li>
      </ul>

      <div className="font-medium text-center mb-4">
        {event.feeDetail}
        <span className="block text-primary">
          (ব্যাচ প্রতিনিধির হাতে জমা দিতে হবে) - ব্যাচ প্রতিনিধি
        </span>
      </div>

      <p className="text-justify">{event.description}</p>

      <div className="flex items-center gap-4 justify-between mt-5">
        <Button>অংশগ্রহন করুন</Button>

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
  );
}
