import BatchesList from "@/components/batch/BatchesList";
import { Input } from "@/components/ui/input";

export default function BatchesPage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col sm:flex-row gap-2 justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">ব্যাচসমূহ</h2>
        <Input
          type="search"
          placeholder="ব্যাচ সার্চ করুন"
          className="max-w-64"
        />
      </div>
      <BatchesList />
    </div>
  );
}
