import { Skeleton } from "../ui/skeleton";

export default function EventCardLoader() {
  return (
    <div className="p-2 border border-muted rounded-lg">
      <Skeleton className="h-40 rounded-lg mb-3" />
      <div className="space-y-4">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
      </div>
    </div>
  );
}
