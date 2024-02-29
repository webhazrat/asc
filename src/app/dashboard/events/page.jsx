"use client";
import Title from "@/components/dashbaord/Title";
import { eventsColumns } from "@/components/datatable/Columns";
import { DataTable } from "@/components/datatable/DataTable";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <>
      <Title title="ইভেন্টস">
        <div>
          <Button>ইভেন্ট সংযুক্ত করুন</Button>
        </div>
      </Title>
      <DataTable columns={eventsColumns()} data={[]} />
    </>
  );
}
