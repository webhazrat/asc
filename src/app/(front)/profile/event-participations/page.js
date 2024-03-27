"use client";
import { participationsColumns } from "@/components/datatable/Columns";
import { DataTable } from "@/components/datatable/DataTable";
import { useParticipations } from "@/hooks/useParticipation";

export default function Page() {
  const { participations, isLoading } = useParticipations();

  return (
    <>
      <h1 className="text-lg font-semibold">ইভেন্টে অংশগ্রহণ</h1>
      <DataTable
        columns={participationsColumns()}
        isLoading={isLoading}
        data={participations}
      />
    </>
  );
}
