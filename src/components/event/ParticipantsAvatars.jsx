import { Plus } from "lucide-react";
import CustomAvatar from "../common/CustomAvatar";
import { Button } from "../ui/button";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export default function ParticipantsAvatars({ eventId }) {
  const { data, isLoading, error } = useSWR(
    `/api/participants/${eventId}`,
    fetcher
  );
  const participants = data?.participants;

  return (
    <div className="flex -space-x-3">
      {participants.length > 0 &&
        participants.map((participant, index) => {
          const { student } = participant;
          if (index < 4) {
            return (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="h-10 w-10 cursor-pointer">
                      <CustomAvatar
                        avatar={student.avatar}
                        name={student.name}
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{student.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          }
        })}

      <Button variant="outline" size="icon" className="rounded-full z-10">
        200 <Plus size={10} />
      </Button>
    </div>
  );
}
