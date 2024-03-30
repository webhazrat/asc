import useSWR from "swr";
import { useUser } from "./useUser";
import { fetcher } from "@/lib/utils";

export const useParticipations = () => {
  const { user } = useUser();
  const { data, isLoading, error } = useSWR(
    user?._id ? `/api/participations` : null,
    fetcher
  );

  return {
    participations: data?.participations,
    isLoading,
    error,
  };
};
