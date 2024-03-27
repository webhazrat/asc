import Footer from "@/components/common/Footer";
import HeaderNavigation from "@/components/common/HeaderNavigation";

export default function FrontLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderNavigation />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
