import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { ScrollArea } from "../../ui/scroll-area";

export default function StudentModal({
  children,
  isModalOpen,
  setIsModalOpen,
}) {
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="p-0">
        <ScrollArea className="max-h-[calc(100vh_-_100px)]">
          <div className="p-6 space-y-5">
            <DialogHeader>
              <DialogTitle>স্টুডেন্ট</DialogTitle>
            </DialogHeader>
            {children}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
