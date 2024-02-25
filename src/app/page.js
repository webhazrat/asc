import Calculation from "@/components/Calculation";
import FeaturedEvent from "@/components/FeaturedEvent";
import Footer from "@/components/Footer";
import HeaderNavigation from "@/components/HeaderNavigation";
import Hero from "@/components/Hero";

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
