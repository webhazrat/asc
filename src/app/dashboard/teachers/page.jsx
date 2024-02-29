"use client";
import Title from "@/components/dashbaord/Title";
import { teachersColumns } from "@/components/datatable/Columns";
import { DataTable } from "@/components/datatable/DataTable";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <>
      <Title title="শিক্ষকগণ">
        <div>
          <Button>শিক্ষক সংযুক্ত করুন</Button>
        </div>
      </Title>
      <DataTable columns={teachersColumns()} data={[]} />
    </>
  );
}
