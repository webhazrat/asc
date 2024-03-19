import Footer from "@/components/common/Footer";
import HeaderNavigation from "@/components/common/HeaderNavigation";
import EventCard from "@/components/event/EventCard";

export default function Page() {
  return (
    <>
      <HeaderNavigation />
      <div className="container py-10 grid grid-cols-3">
        <EventCard />
      </div>
      <Footer />
    </>
  );
}
