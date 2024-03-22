"use client";
import Alert from "@/components/common/Alert";
import Title from "@/components/dashbaord/Title";
import BatchFrom from "@/components/dashbaord/batch/BatchForm";
import BatchModal from "@/components/dashbaord/batch/BatchModal";
import { batchesColumns } from "@/components/datatable/Columns";
import { DataTable } from "@/components/datatable/DataTable";
import { fetcher } from "@/lib/utils";
import { useState } from "react";
import useSWR from "swr";

export default function Page() {
  const [batchId, setBatchId] = useState(false);
  const [batchData, setBatchData] = useState(false);
  const { data, isLoading, error, mutate } = useSWR("/api/batches", fetcher);

  const handleBatchDelete = () => {};

  return (
    <>
      <Title title="ব্যাচসমূহ">
        <BatchModal isModalOpen={batchData} setIsModalOpen={setBatchData}>
          <BatchFrom setIsModalOpen={setBatchData} batch={batchData} />
        </BatchModal>
      </Title>

      <Alert
        isAlertOpen={batchId}
        setIsAlertOpen={setBatchId}
        onContinue={handleBatchDelete}
        title="আপনি কি নিশ্চিত?"
        desciption="এটি স্থায়ীভাবে আপনার ব্যাচটি মুছে যাবে এবং আমাদের সার্ভার থেকে ডেটাটি মুছে যাবে"
      />
      <DataTable
        columns={batchesColumns(setBatchId, setBatchData)}
        data={data?.batches}
        isLoading={isLoading}
      />
    </>
  );
}
