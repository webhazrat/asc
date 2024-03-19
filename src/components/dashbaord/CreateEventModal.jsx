import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import EventForm from "./EventForm";

export default function CreateEventModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">ইভেন্ট সংযুক্ত করুন</Button>
      </DialogTrigger>
      <DialogContent className="p-0">
        <ScrollArea className="max-h-[calc(100vh_-_100px)]">
          <div className="p-6 space-y-4">
            <DialogHeader>
              <DialogTitle>নতুন ইভেন্ট</DialogTitle>
              <DialogDescription>
                এখানে একটি নতুন ইভেন্ট সংযুক্ত করতে নিচের ইনপুটগুলো পুরণ করে সেভ
                করুন
              </DialogDescription>
            </DialogHeader>

            <EventForm />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
