import { Input } from "./ui/input";
import Batch from "./Batch";

export default function Batches() {
  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Batches</h2>
        <Input
          type="search"
          placeholder="Search keyword..."
          className="max-w-64"
        />
      </div>
      <div className="grid grid-cols-4 gap-5">
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
