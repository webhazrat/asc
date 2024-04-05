"use client";
import { batchStudentsColumns } from "@/components/datatable/Columns";
import { DataTable } from "@/components/datatable/DataTable";
import { fetcher } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";

export default function BatchesYearPage({ params: { year } }) {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const page = searchParams.get("page");
  const [pagination, setPagination] = useState({
    pageIndex: page ? page - 1 : 0,
    pageSize: 10,
  });
  const [globalFilter, setGlobalFilter] = useState(search || "");

  const { data, isLoading, error } = useSWR(
    `/api/students/${year}?pageIndex=${pagination.pageIndex}&pageSize=${pagination.pageSize}&search=${globalFilter}`,
    fetcher
  );
  return (
    <div className="container py-10">
      <div className="flex flex-col sm:flex-row gap-2 justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">ব্যাচ {year} এর শিক্ষার্থী</h2>
      </div>
      <DataTable
        columns={batchStudentsColumns()}
        data={data}
        isLoading={isLoading}
        columnVisible={{ avatar: false }}
        pagination={pagination}
        setPagination={setPagination}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
    </div>
  );
}
