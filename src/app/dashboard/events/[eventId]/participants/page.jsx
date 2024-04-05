"use client";
import Title from "@/components/dashbaord/Title";
import { participantsColumns } from "@/components/datatable/Columns";
import { DataTable } from "@/components/datatable/DataTable";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { fetcher } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";

export default function EventParticipantsPage({ params: { eventId } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const page = searchParams.get("page");
  const [pagination, setPagination] = useState({
    pageIndex: page ? page - 1 : 0,
    pageSize: 10,
  });
  const [globalFilter, setGlobalFilter] = useState(search || "");

  const { data, isLoading, error } = useSWR(
    eventId
      ? `/api/participants/${eventId}?role=Admin&pageIndex=${pagination.pageIndex}&pageSize=${pagination.pageSize}&search=${globalFilter}`
      : null,
    fetcher
  );

  return (
    <div className="space-y-2">
      <Button variant="outline" size="icon" onClick={() => router.back()}>
        <ChevronLeft size={16} />
      </Button>
      {isLoading ? (
        <Skeleton className="h-7" />
      ) : (
        <Title title={`${data?.event?.title} - অংশগ্রহণকারী শিক্ষার্থী`} />
      )}

      <DataTable
        columns={participantsColumns({ role: "Admin" })}
        data={data}
        isLoading={isLoading}
        columnVisible={{ student_avatar: false }}
        pagination={pagination}
        setPagination={setPagination}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
    </div>
  );
}
