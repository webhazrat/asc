import Image from "next/image";
import { Button } from "./ui/button";
import { Banknote, Calendar, MapPin, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import event from "../../public/iftar-2023.jpg";
import Link from "next/link";

export default function FeaturedEvent() {
  return (
    <div className="container py-10">
      <h2 className="text-2xl font-bold mb-4 text-center">সর্বশেষ ইভেন্ট</h2>
      <div className="grid md:grid-cols-2 items-center p-4 md:p-8 gap-10 relative border border-muted rounded-2xl backdrop-filter backdrop-blur-lg">
        <div className="relative">
          <Image
            src={event}
            alt="about"
            className="rounded-xl shadow-md h-80 object-cover"
          />
          <div className="absolute bottom-2 left-2 backdrop-filter backdrop-blur-sm bg-white/70 rounded-lg">
            <ul className="flex divide-x-[1px] divide-gray-50/30">
              <li className="py-2 px-5">
                44 <div>দিন</div>
              </li>
              <li className="py-2 px-5">
                20 <div>ঘন্টা</div>
              </li>
              <li className="py-2 px-5">
                30 <div>মিনিট</div>
              </li>
            </ul>
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl md:text-[28px] font-bold">
            সকল শিক্ষক, কর্মচারী ও শিক্ষার্থীদের নিয়ে রমজানে ইফতার কর্মসূচি
            2024
          </h2>
          <div>
            <ul className="space-y-1 text-muted-foreground">
              <li className="flex gap-2">
                <Calendar size={16} className="mt-1 shrink-0" />
                08 April, 2024
              </li>
              <li className="flex gap-2">
                <MapPin size={16} className="mt-1 shrink-0" />
                <span>আল ইসলাহ ইসলামী একাডেমী স্কুল প্রাঙ্গন</span>
              </li>
              <li className="flex gap-2">
                <Banknote size={16} className="mt-1 shrink-0" />
                <span>
                  অংশগ্রহন ফি সর্বনিম্ন 200 টাকা, ক্রিকেট কর্মসূচি 600 টাকা{" "}
                  <span className="text-sm block text-primary">
                    (ব্যাচ প্রতিনিধির হাতে জমা দিতে হবে)
                  </span>
                </span>
              </li>
            </ul>
          </div>
          <p>
            প্রতি বছরের মত করে আল ইসলাহ ইসলামী একাডেমীর মাধ্যমিক পর্যায়ের
            প্রাক্তন শিক্ষার্থীদের নিয়ে আসন্ন রমজানে ইফতার কর্মসূচি বাস্তবায়নের
            উদ্যোগ নেওয়া হচ্ছে। কর্মসূচি সুষ্ঠভাবে সম্পন্ন করার লক্ষ্যে সার্বিক
            দিক পর্যালোচনা করার জন্য কিছু ব্যাচের প্রতিনিধিদের নিয়ে ধারাবাহিক
            আলোচনা করা হচ্ছে।
          </p>
          <div className="flex flex-col lg:flex-row lg:items-center gap-5 justify-between">
            <div className="flex items-center">
              <Button>অংশগ্রহন করুন</Button>
              <Button variant="link" asChild>
                <Link
                  href={
                    "events/ramadan-iftar-program-2024-with-all-teachers-staff-and-students"
                  }
                >
                  বিস্তারিত দেখুন
                </Link>
              </Button>
            </div>
            <div className="flex -space-x-3">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
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
              <Button
                variant="outline"
                size="icon"
                className="rounded-full z-10"
              >
                200 <Plus size={10} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
