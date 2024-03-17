import Calculation from "@/components/Calculation";
import FeaturedEvent from "@/components/event/FeaturedEvent";
import Footer from "@/components/common/Footer";
import HeaderNavigation from "@/components/common/HeaderNavigation";
import Hero from "@/components/common/Hero";

export default function Home() {
  return (
    <>
      <HeaderNavigation />
      <Hero />
      <FeaturedEvent />
      <Calculation />
      <Footer />
    </>
  );
}
