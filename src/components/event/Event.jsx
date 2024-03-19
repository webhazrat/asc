import Image from "next/image";
import { Button } from "../ui/button";
import { Calendar, MapPin, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import eventImage from "../../../public/iftar-2023.jpg";

export default function Event({ event }) {
  const { title, thumbnail } = event || {};
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl md:text-[28px] font-bold mb-5 text-center max-w-2xl mx-auto">
        সকল শিক্ষক, কর্মচারী ও শিক্ষার্থীদের নিয়ে রমজানে ইফতার কর্মসূচি 2024
      </h2>
      <Image
        src={eventImage}
        alt="about"
        className="rounded-lg shadow-md h-96 object-cover"
      />

      <ul className="flex items-center gap-5 justify-center py-5 font-medium">
        <li className="flex items-center gap-2">
          <Calendar size={20} className="shrink-0" />
          08 April, 2024
        </li>
        <li className="flex items-center gap-2">
          <MapPin size={20} className="shrink-0" />
          <span>আল ইসলাহ ইসলামী একাডেমী স্কুল প্রাঙ্গন</span>
        </li>
      </ul>

      <div className="font-medium text-center mb-4">
        অংশগ্রহন ফি সর্বনিম্ন 200 টাকা, ক্রিকেট কর্মসূচি 600 টাকা{" "}
        <span className="block text-primary">
          (ব্যাচ প্রতিনিধির হাতে জমা দিতে হবে) - ব্যাচ প্রতিনিধি
        </span>
      </div>

      <p className="text-justify">
        প্রতি বছরের মত করে আল ইসলাহ ইসলামী একাডেমীর মাধ্যমিক পর্যায়ের প্রাক্তন
        শিক্ষার্থীদের নিয়ে আসন্ন রমজানে ইফতার কর্মসূচি বাস্তবায়নের উদ্যোগ নেওয়া
        হচ্ছে। কর্মসূচি সুষ্ঠভাবে সম্পন্ন করার লক্ষ্যে সার্বিক দিক পর্যালোচনা
        করার জন্য কিছু ব্যাচের প্রতিনিধিদের নিয়ে ধারাবাহিক আলোচনা করা হচ্ছে।
        প্রতি বছরের মত করে আল ইসলাহ ইসলামী একাডেমীর মাধ্যমিক পর্যায়ের প্রাক্তন
        শিক্ষার্থীদের নিয়ে আসন্ন রমজানে ইফতার কর্মসূচি বাস্তবায়নের উদ্যোগ নেওয়া
        হচ্ছে। কর্মসূচি সুষ্ঠভাবে সম্পন্ন করার লক্ষ্যে সার্বিক দিক পর্যালোচনা
        করার জন্য কিছু ব্যাচের প্রতিনিধিদের নিয়ে ধারাবাহিক আলোচনা করা হচ্ছে।
      </p>

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
