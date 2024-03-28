"use client";
import Title from "@/components/dashbaord/Title";
import StudentForm from "@/components/dashbaord/student/StudentForm";
import StudentModal from "@/components/dashbaord/student/StudentModal";
import { studentsColumns } from "@/components/datatable/Columns";
import { DataTable } from "@/components/datatable/DataTable";
import { fetcher } from "@/lib/utils";
import { useState } from "react";
import useSWR from "swr";

export default function Page() {
  const [studentData, setStudentData] = useState(false);
  const { data, isLoading, error } = useSWR(`/api/students`, fetcher);
  return (
    <>
      <Title title="স্টুডেন্টস">
        <StudentModal isModalOpen={studentData} setIsModalOpen={setStudentData}>
          <StudentForm setIsModalOpen={setStudentData} student={studentData} />
        </StudentModal>
      </Title>
      <DataTable
        columns={studentsColumns(setStudentData)}
        data={data?.students}
        isLoading={isLoading}
        columnVisible={{ avatar: false }}
      />
    </>
  );
}
