"use client";
import { participationsColumns } from "@/components/datatable/Columns";
import { DataTable } from "@/components/datatable/DataTable";
import { useParticipations } from "@/hooks/useParticipations";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const page = searchParams.get("page");
  const [pagination, setPagination] = useState({
    pageIndex: page ? page - 1 : 0,
    pageSize: 10,
  });
  const [globalFilter, setGlobalFilter] = useState(search || "");
  const { data, isLoading } = useParticipations(
    `/api/participations?pageIndex=${pagination.pageIndex}&pageSize=${pagination.pageSize}&search=${globalFilter}`
  );

  return (
    <>
      <h1 className="text-lg font-semibold">ইভেন্টে অংশগ্রহণ</h1>
      <DataTable
        columns={participationsColumns()}
        isLoading={isLoading}
        data={data}
        pagination={pagination}
        setPagination={setPagination}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
    </>
  );
}
