"use client";
import { eventsColumns } from "@/components/datatable/Columns";
import { DataTable } from "@/components/datatable/DataTable";
import { fetcher } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";

export default function Page() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const page = searchParams.get("page");
  const [pagination, setPagination] = useState({
    pageIndex: page ? page - 1 : 0,
    pageSize: 10,
  });
  const [globalFilter, setGlobalFilter] = useState(search || "");
  const { data, isLoading, error } = useSWR(
    `/api/events?pageIndex=${pagination.pageIndex}&pageSize=${pagination.pageSize}&search=${globalFilter}`,
    fetcher
  );
  return (
    <div className="space-y-2">
      <h1 className="text-lg font-semibold">ইভেন্টস</h1>

      <DataTable
        columns={eventsColumns({ role: "Head" })}
        data={data}
        isLoading={isLoading}
        columnVisible={{ author_name: false }}
        pagination={pagination}
        setPagination={setPagination}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
    </div>
  );
}
