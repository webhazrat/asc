import { fetcher } from "@/lib/utils";
import { useSession } from "next-auth/react";
import useSWR from "swr";

export const useUser = (userId) => {
  const { data: session } = useSession();
  const id = userId ? userId : session?.user._id;
  const { data, error, isLoading } = useSWR(
    id ? `/api/profile/${id}` : null,
    fetcher
  );

  const user = data?.user ? data.user : session?.user;

  return {
    user,
    isLoading,
    error,
  };
};
