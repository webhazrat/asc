import Image from "next/image";
import { Button } from "./ui/button";
import { Calendar, MapPin, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function Event() {
  return (
    <div className="container py-8">
      <div className="grid grid-cols-2 items-center p-10 gap-10 relative border border-gray-100 rounded-2xl backdrop-filter backdrop-blur-lg">
        <div className="relative">
          <Image
            src={
              "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?fit=crop&w=500&q=80"
            }
            width={600}
            height={500}
            alt="about"
            className="rounded-xl shadow-md"
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2 flex items-center backdrop-filter backdrop-blur-sm bg-white/60 rounded-lg">
            <ul className="grid grid-cols-3 divide-x-[1px] divide-gray-50/30">
              <li className="p-5">
                40 <div>Days</div>
              </li>
              <li className="p-5">
                20 <div>Hours</div>
              </li>
              <li className="p-5">
                30 <div>Minutes</div>
              </li>
            </ul>
          </div>
        </div>
        <div className="space-y-5">
          <h2 className="text-3xl font-bold">
            Ramadan Iftar program with all teachers and students
          </h2>
          <div>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-center gap-3">
                <Calendar size={16} />
                24 March, 2024
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={16} />
                <span>Al Islah Islami Academy School Ground</span>
              </li>
            </ul>
          </div>
          <p>
            Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus
            enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor
            praesent donec est. Odio penatibus risus viverra tellus varius sit
            neque erat velit. Faucibus commodo massa rhoncus, volutpat.
            Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae
            sed turpis id.
          </p>
          <div className="flex items-center gap-5 justify-between">
            <div>
              <Button>Let's Participate</Button>
              <Button variant="link">Learn More</Button>
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
