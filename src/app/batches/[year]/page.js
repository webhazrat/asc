"use client";
import Footer from "@/components/common/Footer";
import HeaderNavigation from "@/components/common/HeaderNavigation";
import { batchStudentsColumns } from "@/components/datatable/Columns";
import { DataTable } from "@/components/datatable/DataTable";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";

export default function Page({ params }) {
  const { year } = params;
  const { data, isLoading, error } = useSWR(`/api/students/${year}`, fetcher);
  return (
    <>
      <HeaderNavigation />
      <div className="container py-10">
        <div className="flex flex-col sm:flex-row gap-2 justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            ব্যাচ {params.year} এর শিক্ষার্থী
          </h2>
        </div>
        <DataTable
          columns={batchStudentsColumns()}
          data={data?.students}
          isLoading={isLoading}
          columnVisible={{ avatar: false }}
        />
      </div>
      <Footer />
    </>
  );
}
