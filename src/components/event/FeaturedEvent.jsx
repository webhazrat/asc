"use client";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import FeaturedEventLoader from "../loader/FeatureEventLoader";
import FeaturedEventCard from "./FeaturedEventCard";

export default function FeaturedEvent() {
  const { data, isLoading } = useSWR(`/api/events?status=Featured`, fetcher);
  const event = data?.events[0];

  let content = null;
  if (isLoading) {
    content = <FeaturedEventLoader />;
  }

  if (!isLoading && event?._id) {
    content = <FeaturedEventCard event={event} />;
  }

  return (
    <div className="container py-10">
      <h2 className="text-2xl font-bold mb-4 text-center">সর্বশেষ ইভেন্ট</h2>
      {content}
    </div>
  );
}
