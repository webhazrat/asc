import { Skeleton } from "../ui/skeleton";

export default function FeaturedEventLoader() {
  return (
    <div className="grid md:grid-cols-2 gap-10 p-6 border border-muted rounded-lg">
      <Skeleton className="h-60 rounded-lg mb-3" />
      <div className="space-y-4">
        <Skeleton className="h-6" />
        <Skeleton className="h-3 max-w-52" />
        <Skeleton className="h-3 max-w-64" />
        <Skeleton className="h-3 max-w-72" />
        <Skeleton className="h-3" />
        <Skeleton className="h-3" />
        <Skeleton className="h-3" />
        <div className="flex justify-between">
          <Skeleton className="h-4 max-w-28 w-full" />
          <Skeleton className="h-4 max-w-28 w-full" />
        </div>
      </div>
    </div>
  );
}
