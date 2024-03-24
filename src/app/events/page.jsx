import Footer from "@/components/common/Footer";
import HeaderNavigation from "@/components/common/HeaderNavigation";
import EventsList from "@/components/event/EventsList";
export default function Page() {
  return (
    <>
      <HeaderNavigation />
      <EventsList />
      <Footer />
    </>
  );
}
