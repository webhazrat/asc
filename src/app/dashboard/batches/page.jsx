"use client";
import Title from "@/components/dashbaord/Title";
import { batchesColumns } from "@/components/datatable/Columns";
import { DataTable } from "@/components/datatable/DataTable";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <>
      <Title title="ব্যাচসমূহ">
        <div>
          <Button>ব্যাচ সংযুক্ত করুন</Button>
        </div>
      </Title>
      <DataTable columns={batchesColumns()} data={[]} />
    </>
  );
}
