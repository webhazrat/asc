"use client";
import Title from "@/components/dashbaord/Title";
import { participantsColumns } from "@/components/datatable/Columns";
import { DataTable } from "@/components/datatable/DataTable";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { fetcher } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import useSWR from "swr";

export default function EventParticipantsPage({ params: { eventId } }) {
  const router = useRouter();
  const { data, isLoading, error } = useSWR(
    `/api/participants/${eventId}?role=Admin`,
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
        data={data?.participants}
        isLoading={isLoading}
        columnVisible={{ student_avatar: false }}
      />
    </div>
  );
}
