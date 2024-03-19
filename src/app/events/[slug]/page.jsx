import Footer from "@/components/common/Footer";
import HeaderNavigation from "@/components/common/HeaderNavigation";
import Event from "@/components/event/Event";

export default function Page({ params }) {
  const { slug } = params;
  return (
    <>
      <HeaderNavigation />
      <div className="container py-10">
        <Event />
      </div>
      <Footer />
    </>
  );
}
