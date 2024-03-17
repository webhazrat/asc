import Footer from "@/components/common/Footer";
import HeaderNavigation from "@/components/common/HeaderNavigation";
import Student from "@/components/Student";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const students = [
  {
    id: crypto.randomUUID(),
    name: "আব্দুল আলিম",
    image: "student1.png",
    phone: "01712121212",
  },
  {
    id: crypto.randomUUID(),
    name: "সেলিম হায়দার",
    image: "student2.png",
    phone: "01712121212",
  },
  {
    id: crypto.randomUUID(),
    name: "আব্দুল মালেক",
    image: "student3.png",
    phone: "01712121212",
  },
  {
    id: crypto.randomUUID(),
    name: "কালাম উদ্দিন",
    image: "placeholder.png",
    phone: "01712121212",
  },
  {
    id: crypto.randomUUID(),
    name: "হিমেল আশরাফ",
    image: "student4.png",
    phone: "01712121212",
  },
];

export default function Page({ params }) {
  return (
    <>
      <HeaderNavigation />
      <div className="container py-10">
        <div className="flex flex-col sm:flex-row gap-2 justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            ব্যাচ {params.year} এর শিক্ষার্থী
          </h2>
          <Input
            type="search"
            placeholder="শিক্ষার্থী সার্চ করুন"
            className="max-w-64"
          />
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4">
          {students.map((student) => (
            <Student student={student} key={student.id} />
          ))}
          {students.map((student) => (
            <Student student={student} key={student.id} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
