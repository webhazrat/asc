import Calculation from "@/components/Calculation";
import Event from "@/components/Event";
import HeaderNavigation from "@/components/HeaderNavigation";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      <HeaderNavigation />
      <Hero />
      <Event />
      <Calculation />
    </>
  );
}
