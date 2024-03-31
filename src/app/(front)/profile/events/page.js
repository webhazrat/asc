"use client";
import { eventsColumns } from "@/components/datatable/Columns";
import { DataTable } from "@/components/datatable/DataTable";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";

export default function Page() {
  const { data, isLoading, error } = useSWR(`/api/events`, fetcher);
  return (
    <div className="space-y-2">
      <h1 className="text-lg font-semibold">ইভেন্টস</h1>

      <DataTable
        columns={eventsColumns({ role: "Head" })}
        data={data?.events}
        isLoading={isLoading}
        columnVisible={{ author_name: false }}
      />
    </div>
  );
}
