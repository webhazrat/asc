import HeaderNavigation from "@/components/HeaderNavigation";
import { Input } from "@/components/ui/input";

export default function Page({ params }) {
  return (
    <>
      <HeaderNavigation />
      <div className="container py-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            ব্যাচ {params.year} এর শিক্ষার্থী
          </h2>
          <Input
            type="search"
            placeholder="শিক্ষার্থী সার্চ করুন"
            className="max-w-64"
          />
        </div>
        <div className="grid grid-cols-4 gap-5"></div>
      </div>
    </>
  );
}
