import Footer from "@/components/Footer";
import HeaderNavigation from "@/components/HeaderNavigation";

export default function Page() {
  return (
    <>
      <HeaderNavigation />
      <div className="container py-10">
        <div>
          <h2 className="text-xl font-semibold mb-4">আমাদের সম্পর্কে</h2>
          <p>
            আল ইসলাহ ইসলামী একাডেমী স্টুডেন্টস কমিউনিটি- সকল প্রাক্তন
            শিক্ষার্থীদের নিয়ে পুনর্মিলন, ক্রিড়া, শিক্ষার অবকাঠামোর সার্বিক
            উন্নতির জন্য একসাথে সর্বোচ্চ কাজ করার মাধ্যমে প্রাক্তন ও চলমান
            শিক্ষার্থীদের মননশীল চিন্তা ও জ্ঞান বিকাশের মাধ্যমে সম্প্রদায়কে
            এগিয়ে নেওয়ার অঙ্গীকার।
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
