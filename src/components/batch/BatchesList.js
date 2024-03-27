"use client";
import useSWR from "swr";
import BatchCard from "./BatchCard";
import { fetcher } from "@/lib/utils";
import BatchCardLoader from "../loader/BatchCardLoader";

export default function BatchesList() {
  const { data, isLoading } = useSWR(`/api/batches`, fetcher);
  const batches = data?.batches;

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
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {content}
    </div>
  );
}
