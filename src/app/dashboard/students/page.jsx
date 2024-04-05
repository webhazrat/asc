"use client";
import Title from "@/components/dashbaord/Title";
import StudentForm from "@/components/dashbaord/student/StudentForm";
import StudentModal from "@/components/dashbaord/student/StudentModal";
import { studentsColumns } from "@/components/datatable/Columns";
import { DataTable } from "@/components/datatable/DataTable";
import { fetcher } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";

export default function Page() {
  const [studentData, setStudentData] = useState(false);
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const page = searchParams.get("page");
  const [pagination, setPagination] = useState({
    pageIndex: page ? page - 1 : 0,
    pageSize: 10,
  });
  const [globalFilter, setGlobalFilter] = useState(search || "");

  const { data, isLoading, error } = useSWR(
    `/api/students?pageIndex=${pagination.pageIndex}&pageSize=${pagination.pageSize}&search=${globalFilter}`,
    fetcher
  );

  return (
    <div className="space-y-2">
      <Title title="স্টুডেন্টস">
        <StudentModal isModalOpen={studentData} setIsModalOpen={setStudentData}>
          <StudentForm setIsModalOpen={setStudentData} student={studentData} />
        </StudentModal>
      </Title>
      <DataTable
        columns={studentsColumns(setStudentData)}
        data={data}
        isLoading={isLoading}
        columnVisible={{ avatar: false }}
        pagination={pagination}
        setPagination={setPagination}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
    </div>
  );
}
