import Footer from "@/components/common/Footer";
import HeaderNavigation from "@/components/common/HeaderNavigation";
import Event from "@/components/event/Event";

export default function Page() {
  return (
    <>
      <HeaderNavigation />
      <div className="container py-10 grid grid-cols-3">
        <Event />
      </div>
      <Footer />
    </>
  );
}
