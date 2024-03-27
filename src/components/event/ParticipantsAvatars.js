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
import { Skeleton } from "../ui/skeleton";

export default function ParticipantsAvatars({ eventId }) {
  const { data, isLoading, error } = useSWR(
    `/api/participants/${eventId}`,
    fetcher
  );
  const participants = data?.participants;
  const totalCount = data?.totalCount;

  let content = null;
  if (isLoading) {
    content = <Skeleton className="h-7 w-32" />;
  }

  if (!isLoading) {
    content = (
      <>
        {participants?.length > 0 ? (
          <>
            {participants.map((participant, index) => {
              const { student } = participant;
              if (index < 3) {
                return (
                  <TooltipProvider key={participant._id}>
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
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full z-10"
                  >
                    {totalCount} <Plus size={10} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  সর্বমোট অংশগ্রহণকারী {totalCount} জন
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
        ) : null}
      </>
    );
  }

  return <div className="flex -space-x-3">{content}</div>;
}
