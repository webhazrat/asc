"use client";
import Alert from "@/components/common/Alert";
import Title from "@/components/dashbaord/Title";
import EventForm from "@/components/dashbaord/event/EventForm";
import EventModal from "@/components/dashbaord/event/EventModal";
import { eventsColumns } from "@/components/datatable/Columns";
import { DataTable } from "@/components/datatable/DataTable";
import { toast } from "@/components/ui/use-toast";
import { SERVER_URL, fetcher } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";

export default function Page() {
  const [eventId, setEventId] = useState(false);
  const [eventData, setEventData] = useState(false);
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const page = searchParams.get("page");
  const [pagination, setPagination] = useState({
    pageIndex: page ? page - 1 : 0,
    pageSize: 10,
  });
  const [globalFilter, setGlobalFilter] = useState(search || "");

  const { data, isLoading, error, mutate } = useSWR(
    `/api/events?pageIndex=${pagination.pageIndex}&pageSize=${pagination.pageSize}&search=${globalFilter}`,
    fetcher
  );

  // delete an event
  const deleteEvent = async (id) => {
    const res = await fetch(`${SERVER_URL}/api/events/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      const error = await res.json();
      throw error;
    }
    return res.json();
  };

  // mutate after delete
  const handleEventDelete = async () => {
    try {
      const res = await deleteEvent(eventId);
      mutate();
      setEventId(false);
    } catch (error) {
      console.error({ deleteEventError: error });
      toast({
        description: error.message,
      });
    }
  };

  return (
    <div className="space-y-2">
      <Title title="ইভেন্টস">
        <EventModal isModalOpen={eventData} setIsModalOpen={setEventData}>
          <EventForm setIsModalOpen={setEventData} event={eventData} />
        </EventModal>
      </Title>

      <Alert
        isAlertOpen={eventId}
        setIsAlertOpen={setEventId}
        onContinue={handleEventDelete}
        title="আপনি কি নিশ্চিত?"
        desciption="এটি স্থায়ীভাবে আপনার ইভেন্টটি মুছে যাবে এবং আমাদের সার্ভার থেকে ডেটাটি মুছে যাবে"
      />
      <DataTable
        columns={eventsColumns({ role: "Admin", setEventId, setEventData })}
        data={data}
        isLoading={isLoading}
        pagination={pagination}
        setPagination={setPagination}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
    </div>
  );
}
