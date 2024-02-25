import Footer from "@/components/Footer";
import HeaderNavigation from "@/components/HeaderNavigation";
import Event from "@/components/Event";

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
