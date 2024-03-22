"use client";
import Footer from "@/components/common/Footer";
import HeaderNavigation from "@/components/common/HeaderNavigation";
import Event from "@/components/event/Event";
import { fetcher } from "@/lib/utils";
import { useRouter } from "next/navigation";
import useSWR from "swr";

export default function Page({ params }) {
  const { slug } = params;
  const router = useRouter();
  const { data, isLoading, error } = useSWR(`/api/event/${slug}`, fetcher);
  const event = data?.event;

  let content = null;
  if (isLoading) {
    content = <p className="text-center">Loading...</p>;
  }

  if (!isLoading && event?._id) {
    content = <Event event={event} />;
  }

  if (!isLoading && !event) {
    router.push("/404");
    return null;
  }

  return (
    <>
      <HeaderNavigation />
      <div className="container py-10">{content}</div>
      <Footer />
    </>
  );
}
