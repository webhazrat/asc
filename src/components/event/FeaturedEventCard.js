import { Button } from "../ui/button";
import { Banknote, Calendar, MapPin } from "lucide-react";
import Link from "next/link";
import EventCountDown from "./EventCountDown";
import { format } from "date-fns";
import { truncateString } from "@/lib/utils";
import Thumbnail from "../common/Thumbnail";
import ParticipateAction from "./ParticipateAction";
import ParticipateAvatars from "./ParticipantsAvatars";
import { useCountDownTimer } from "@/hooks/useCountDownTimer";

export default function FeaturedEventCard({ event }) {
  const { days, hours, minutes } = useCountDownTimer(event?.date);
  const feesDetail =
    event?.fees?.length > 0 &&
    event?.fees.map((fee) => `${fee.category} - ${fee.amount}`);
  return (
    <div className="grid md:grid-cols-2 items-center p-4 md:p-8 gap-10 relative border border-muted rounded-2xl backdrop-filter backdrop-blur-lg">
      <div className="relative">
        <Thumbnail thumbnail={event?.thumbnail || ""} alt={event?.title} />
        <EventCountDown endDate={event?.date} />
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
                ফি : {feesDetail.join(", ")}
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
            {days !== 0 && hours !== 0 && minutes !== 0 && (
              <ParticipateAction eventId={event?._id} />
            )}
            <Button variant="link" asChild>
              <Link href={`events/${event?.slug}`}>বিস্তারিত দেখুন</Link>
            </Button>
          </div>
          <ParticipateAvatars eventId={event?._id} />
        </div>
      </div>
    </div>
  );
}
