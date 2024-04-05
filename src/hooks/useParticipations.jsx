import useSWR from "swr";
import { useUser } from "./useUser";
import { fetcher } from "@/lib/utils";

export const useParticipations = (url) => {
  const { user } = useUser();
  const { data, isLoading, error } = useSWR(user?._id ? url : null, fetcher);

  return {
    data,
    isLoading,
    error,
  };
};
