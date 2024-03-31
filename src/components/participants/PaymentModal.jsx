import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";

export default function PaymentModal({ children, isOpen, setIsOpen }) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="p-0">
        <ScrollArea className="max-h-[calc(100vh_-_100px)]">
          <div className="p-6 pb-20 space-y-5 relative">
            <DialogHeader>
              <DialogTitle>পেমেন্ট</DialogTitle>
            </DialogHeader>
            {children}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
