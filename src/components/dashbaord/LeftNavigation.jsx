import {
  CalendarClock,
  Group,
  LayoutGrid,
  MessageSquare,
  Settings2,
  Users,
} from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import Nav from "../common/Nav";
import { Separator } from "../ui/separator";

export default function LeftNavigation() {
  return (
    <ScrollArea className="h-[calc(100vh_-_64px)]">
      <div className="p-4">
        <Nav
          navs={[
            {
              id: "1",
              title: "ড্যাশবোর্ড",
              href: "/dashboard",
              icon: LayoutGrid,
            },
            {
              id: "2",
              title: "ব্যাচসমূহ",
              href: "/dashboard/batches",
              icon: Group,
            },
            {
              id: "3",
              title: "টিচার্স",
              href: "/dashboard/teachers",
              icon: Users,
            },
            {
              id: "4",
              title: "ইভেন্টস",
              href: "/dashboard/events",
              icon: CalendarClock,
            },
            {
              id: "5",
              title: "স্টুডেন্টস",
              href: "/dashboard/students",
              icon: Users,
            },
          ]}
        />
      </div>
      <Separator />
      <div className="p-4">
        <Nav
          navs={[
            {
              id: "6",
              title: "ইউজারস",
              href: "/dashboard/users",
              icon: Users,
            },
            {
              id: "7",
              title: "মেসেজ সেটিংস",
              href: "/dashboard/message",
              icon: MessageSquare,
            },
            {
              id: "8",
              title: "সেটিংস",
              href: "/dashboard/settings",
              icon: Settings2,
            },
          ]}
        />
      </div>
    </ScrollArea>
  );
}
