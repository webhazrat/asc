"use client";
import Alert from "@/components/common/Alert";
import Title from "@/components/dashbaord/Title";
import BatchFrom from "@/components/dashbaord/batch/BatchForm";
import BatchModal from "@/components/dashbaord/batch/BatchModal";
import { batchesColumns } from "@/components/datatable/Columns";
import { DataTable } from "@/components/datatable/DataTable";
import { toast } from "@/components/ui/use-toast";
import { SERVER_URL, fetcher } from "@/lib/utils";
import { useState } from "react";
import useSWR from "swr";

export default function Page() {
  const [batchId, setBatchId] = useState(false);
  const [batchData, setBatchData] = useState(false);
  const { data, isLoading, error, mutate } = useSWR("/api/batches", fetcher);

  // delete a batch
  const deleteBatch = async (id) => {
    const res = await fetch(`${SERVER_URL}/api/batches/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      const error = await res.json();
      throw error;
    }
    return res.json();
  };

  const handleBatchDelete = async () => {
    try {
      const res = await deleteBatch(batchId);
      mutate();
      setBatchId(false);
    } catch (error) {
      console.error({ deleteBatchError: error });
      toast({
        description: error.message,
      });
    }
  };

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
