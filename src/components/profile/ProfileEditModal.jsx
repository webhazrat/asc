import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import ProfileForm from "./ProfileForm";

export default function ProfileEditModal({ user }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm">আপডেট</Button>
      </DialogTrigger>
      <DialogContent className="p-0">
        <ScrollArea className="max-h-[calc(100vh_-_100px)]">
          <div className="p-6 space-y-5">
            <DialogHeader>
              <DialogTitle>প্রোফাইল</DialogTitle>
            </DialogHeader>
            <ProfileForm user={user} setIsOpen={setIsOpen} />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
