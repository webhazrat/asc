"use client";
import EventCard from "@/components/event/EventCard";
import EventCardLoader from "@/components/loader/EventCardLoader";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";
export default function EventsList() {
  const { data, isLoading } = useSWR(`/api/events`, fetcher);
  const events = data?.events;

  let content = null;
  if (isLoading) {
    content = (
      <>
        <EventCardLoader />
        <EventCardLoader />
        <EventCardLoader />
      </>
    );
  }
  if (!isLoading && events?.length > 0) {
    content = (
      <>
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </>
    );
  }

  if (!isLoading && events?.length === 0) {
    content = <p>No data found!</p>;
  }
  return (
    <div className="container py-10">
      <h2 className="text-2xl font-bold mb-4 text-center">ইভেন্টস</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {content}
      </div>
    </div>
  );
}
