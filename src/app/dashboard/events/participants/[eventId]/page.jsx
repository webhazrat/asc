"use client";
import Title from "@/components/dashbaord/Title";
import { participantsColumns } from "@/components/datatable/Columns";
import { DataTable } from "@/components/datatable/DataTable";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";

export default function Page({ params: { eventId } }) {
  const { data, isLoading, error } = useSWR(
    `/api/participants/${eventId}?all=${true}`,
    fetcher
  );

  console.log({ data });
  return (
    <>
      <Title title="অংশগ্রহণকারী শিক্ষার্থী" />
      <DataTable
        columns={participantsColumns()}
        data={data?.participants}
        isLoading={isLoading}
        columnVisible={{ student_avatar: false }}
      />
    </>
  );
}
