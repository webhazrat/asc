import { Calendar, MapPin } from "lucide-react";
import Thumbnail from "../common/Thumbnail";
import { format } from "date-fns";
import ParticipateAction from "./ParticipateAction";
import ParticipateAvatars from "./ParticipantsAvatars";

export default function Event({ event }) {
  const feesDetail =
    event?.fees?.length > 0 &&
    event.fees.map((fee) => `${fee.category} - ${fee.amount}`);
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl md:text-[28px] font-bold mb-5 text-center max-w-2xl mx-auto">
        {event.title}
      </h2>

      <Thumbnail thumbnail={event.thumbnail || ""} alt={event.title} />

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
        ফি : {feesDetail.join(", ")}
        <span className="block text-primary">
          (ব্যাচ প্রতিনিধির হাতে জমা দিতে হবে) - ব্যাচ প্রতিনিধি
        </span>
      </div>

      <p className="text-justify">{event.description}</p>

      <div className="flex items-center gap-4 justify-between mt-5">
        <ParticipateAction eventId={event._id} />
        <ParticipateAvatars />
      </div>
    </div>
  );
}
