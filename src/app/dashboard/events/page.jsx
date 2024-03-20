"use client";
import CreateEventModal from "@/components/dashbaord/CreateEventModal";
import Title from "@/components/dashbaord/Title";
import { eventsColumns } from "@/components/datatable/Columns";
import { DataTable } from "@/components/datatable/DataTable";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";

export default function Page() {
  const { data, isLoading, error } = useSWR("/api/events", fetcher);

  console.log({ data });

  return (
    <>
      <Title title="ইভেন্টস">
        <CreateEventModal />
      </Title>
      <DataTable columns={eventsColumns()} data={data?.events} />
    </>
  );
}
