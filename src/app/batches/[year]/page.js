import HeaderNavigation from "@/components/HeaderNavigation";
import { Input } from "@/components/ui/input";

export default function Page({ params }) {
  return (
    <>
      <HeaderNavigation />
      <div className="container py-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Students of {params.year}</h2>
          <Input
            type="search"
            placeholder="Search keyword..."
            className="max-w-64"
          />
        </div>
        <div className="grid grid-cols-4 gap-5"></div>
      </div>
    </>
  );
}
