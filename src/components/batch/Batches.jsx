import { Input } from "../ui/input";
import Batch from "./Batch";

export default function Batches() {
  return (
    <div className="container py-10">
      <div className="flex flex-col sm:flex-row gap-2 justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">ব্যাচসমূহ</h2>
        <Input
          type="search"
          placeholder="ব্যাচ সার্চ করুন"
          className="max-w-64"
        />
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <Batch />
        <Batch />
        <Batch />
        <Batch />
        <Batch />
        <Batch />
        <Batch />
        <Batch />
      </div>
    </div>
  );
}
