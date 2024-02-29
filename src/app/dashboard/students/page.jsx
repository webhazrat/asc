"use client";
import Title from "@/components/dashbaord/Title";
import { eventsColumns } from "@/components/datatable/Columns";
import { DataTable } from "@/components/datatable/DataTable";

export default function Page() {
  return (
    <>
      <Title title="শিক্ষার্থী" />
      <DataTable columns={eventsColumns()} data={[]} />
    </>
  );
}
