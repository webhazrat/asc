"use client";
import Title from "@/components/dashbaord/Title";
import { studentsColumns } from "@/components/datatable/Columns";
import { DataTable } from "@/components/datatable/DataTable";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";

export default function Page() {
  const { data, isLoading, error } = useSWR(`/api/students`, fetcher);
  return (
    <>
      <Title title="অংশগ্রহণকারী শিক্ষার্থী" />
      <DataTable
        columns={studentsColumns()}
        data={data?.students}
        isLoading={isLoading}
        columnVisible={{ avatar: false }}
      />
    </>
  );
}
