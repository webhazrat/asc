import { Plus } from "lucide-react";
import CustomAvatar from "../common/CustomAvatar";
import { Button } from "../ui/button";

export default function ParticipateAvatars({ eventId }) {
  return (
    <div className="flex -space-x-3">
      <div className="h-10 w-10">
        <CustomAvatar
          avatar={"https://github.com/shadcn.png"}
          name={"@shadcn"}
        />
      </div>
      <div className="h-10 w-10">
        <CustomAvatar
          avatar={"https://github.com/shadcn.png"}
          name={"@shadcn"}
        />
      </div>
      <div className="h-10 w-10">
        <CustomAvatar
          avatar={"https://github.com/shadcn.png"}
          name={"@shadcn"}
        />
      </div>

      <Button variant="outline" size="icon" className="rounded-full z-10">
        200 <Plus size={10} />
      </Button>
    </div>
  );
}
