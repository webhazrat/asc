"use client";
import useSWR from "swr";
import { Input } from "../ui/input";
import BatchCard from "./BatchCard";
import { fetcher } from "@/lib/utils";
import BatchCardLoader from "../loader/BatchCardLoader";

export default function BatchesList() {
  const { data, isLoading } = useSWR(`/api/batches`, fetcher);
  const batches = data?.batches;

  console.log({ batches });

  let content = null;
  if (isLoading) {
    content = (
      <>
        <BatchCardLoader />
        <BatchCardLoader />
        <BatchCardLoader />
        <BatchCardLoader />
      </>
    );
  }
  if (!isLoading && batches?.length > 0) {
    content = (
      <>
        {batches.map((batch) => (
          <BatchCard key={batch._id} batch={batch} />
        ))}
      </>
    );
  }

  if (!isLoading && batches?.length === 0) {
    content = <p>No data found!</p>;
  }
  return (
    <div className="container py-10">
      <div className="flex flex-col sm:flex-row gap-2 justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">ব্যাচসমূহ</h2>
        <Input
          type="search"
          placeholder="ব্যাচ সার্চ করুন"
          className="max-w-64"
        />
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {content}
      </div>
    </div>
  );
}
