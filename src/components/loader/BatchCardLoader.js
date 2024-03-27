import { Skeleton } from "../ui/skeleton";

export default function BatchCardLoader() {
  return (
    <div className="space-y-4 p-6 border border-muted rounded-lg">
      <Skeleton className="h-5" />
      <Skeleton className="h-3" />
    </div>
  );
}
