"use client";
import { participantsColumns } from "@/components/datatable/Columns";
import { DataTable } from "@/components/datatable/DataTable";
import PaymentForm from "@/components/participants/PaymentForm";
import PaymentModal from "@/components/participants/PaymentModal";
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

  const [participant, setPartcipant] = useState(null);
  const { data, isLoading, error } = useSWR(
    eventId
      ? `/api/participants/${eventId}?role=Head&pageIndex=${pagination.pageIndex}&pageSize=${pagination.pageSize}&search=${globalFilter}`
      : null,
    fetcher
  );

  return (
    <div className="space-y-2">
      <Button variant="outline" size="icon" onClick={() => router.back()}>
        <ChevronLeft size={16} />
      </Button>
      {isLoading ? (
        <Skeleton className="h-7 max-w-md" />
      ) : (
        <h1 className="text-lg font-semibold">
          {data?.event?.title} - অংশগ্রহনকারী
        </h1>
      )}

      <PaymentModal isOpen={participant} setIsOpen={setPartcipant}>
        <PaymentForm
          eventId={eventId}
          participant={participant}
          setIsOpen={setPartcipant}
        />
      </PaymentModal>
      <DataTable
        columns={participantsColumns({ role: "Head", setPartcipant })}
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
