"use client";
import CreateEventModal from "@/components/dashbaord/CreateEventModal";
import Title from "@/components/dashbaord/Title";
import { eventsColumns } from "@/components/datatable/Columns";
import { DataTable } from "@/components/datatable/DataTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <Title title="ইভেন্টস">
        <CreateEventModal />
      </Title>
      <DataTable columns={eventsColumns()} data={[]} />
    </>
  );
}
