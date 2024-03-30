"use client";
import { participantsColumns } from "@/components/datatable/Columns";
import { DataTable } from "@/components/datatable/DataTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetcher } from "@/lib/utils";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function Page() {
  const { data, isLoading, error } = useSWR(`/api/events`, fetcher);

  const events = data?.events;

  const [eventId, setEventId] = useState(null);

  const { data: participantsData, isLoading: participantsLoading } = useSWR(
    eventId ? `/api/participants/${eventId}` : null,
    fetcher
  );

  useEffect(() => {
    if (events?.length > 0) {
      setEventId(events[0]._id);
    }
  }, [events?.length]);

  console.log({ eventId, participantsData });

  return (
    <>
      <h1 className="text-lg font-semibold">ইভেন্টে অংশগ্রহণকারী</h1>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {events?.length > 0 &&
            events.map((event) => (
              <SelectItem key={event._id} value={event._id}>
                {event.title}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
      <DataTable
        columns={participantsColumns()}
        isLoading={isLoading || participantsLoading}
        data={participantsData?.participants}
        columnVisible={{ student_avatar: false }}
      />
    </>
  );
}
