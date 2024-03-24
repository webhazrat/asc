import { fetcher } from "@/lib/utils";
import useSWR from "swr";

export const useBatch = () => {
  const { data, isLoading, error } = useSWR(`/api/batches`, fetcher);
  const batches = data?.batches;
  return { batches, isLoading, error };
};
