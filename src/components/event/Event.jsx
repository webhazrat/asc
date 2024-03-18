import { Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import EventImage from "../../../public/iftar-2023.jpg";

export default function Event() {
  return (
    <Link
      href={
        "events/ramadan-iftar-program-2024-with-all-teachers-staff-and-students"
      }
    >
      <div className="border border-muted rounded-lg p-4 hover:outline outline-2 outline-primary outline-offset-2">
        <Image
          src={EventImage}
          height={200}
          alt="event"
          className="rounded-md h-52 object-cover"
        />
        <div>
          <ul className="flex items-center gap-4 my-3">
            <li className="flex items-center gap-2">
              <Calendar size={16} /> 8 April, 2024
            </li>
            <li className="flex items-center gap-2">
              <Clock size={16} /> 4.00 PM
            </li>
          </ul>
          <h2 className="text-lg font-semibold mb-2">
            সকল শিক্ষক, কর্মচারী ও শিক্ষার্থীদের নিয়ে রমজানে ইফতার কর্মসূচি
            2024
          </h2>
          <p>
            প্রতি বছরের মত করে আল ইসলাহ ইসলামী একাডেমীর মাধ্যমিক পর্যায়ের
            প্রাক্তন শিক্ষার্থীদের নিয়ে আসন্ন রমজানে ইফতার কর্মসূচি বাস্তবায়নের
            উদ্যোগ নেওয়া হচ্ছে...
          </p>
        </div>
      </div>
    </Link>
  );
}
