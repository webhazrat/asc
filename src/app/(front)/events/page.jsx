import EventsList from "@/components/event/EventsList";
export default function EventsPage() {
  return (
    <div className="container py-10">
      <h2 className="text-2xl font-bold mb-4 text-center">ইভেন্টস</h2>
      <EventsList />
    </div>
  );
}
