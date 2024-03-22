import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { ScrollArea } from "../../ui/scroll-area";

export default function BatchModal({ children, isModalOpen, setIsModalOpen }) {
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button size="sm">ব্যাচ সংযুক্ত করুন</Button>
      </DialogTrigger>
      <DialogContent className="p-0">
        <ScrollArea className="max-h-[calc(100vh_-_100px)]">
          <div className="p-6 space-y-5">
            <DialogHeader>
              <DialogTitle>ব্যাচ</DialogTitle>
            </DialogHeader>
            {children}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
