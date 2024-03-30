import { useUser } from "@/hooks/useUser";
import { Button } from "../ui/button";
import { useState } from "react";
import Alert from "../common/Alert";
import { SERVER_URL } from "@/lib/utils";
import { toast } from "../ui/use-toast";
import { Loader } from "lucide-react";
import { useParticipations } from "@/hooks/useParticipations";
import { mutate } from "swr";
import { Skeleton } from "../ui/skeleton";

const messages = [
  {
    title: "দুঃখিত! ইভেন্টে অংশগ্রহণে অবশ্যই আপনাকে লগইন করতে হবে।",
    description:
      "পূর্বেই অ্যাকাউন্ট থাকলে সেটা লগইন করুন। অথবা নতুন অ্যাকাউন্ট করে লগইন এর পর ইভেন্টে অংশগ্রহণ করুন। ধন্যবাদ",
  },
  {
    title: "আপনি কি নিশ্চিত?",
    description: "নিশ্চিত হলে ঠিক আছে বাটনে ক্লিক করুন। ধন্যবাদ",
  },
  {
    title: "ইভেন্টে অংশগ্রহণে আগ্রহের জন্য আপনাকে ধন্যবাদ!",
    description: "খুব শিঘ্রই আপনার ব্যাচ প্রতিনিধি আপনার সাথে যোগাযোগ করবে।",
  },
];

export default function ParticipateAction({ eventId }) {
  const { participations, isLoading } = useParticipations();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const { user } = useUser();

  const [status, setStatus] = useState({
    title: "",
    description: "",
    variant: "",
  });

  const participate = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${SERVER_URL}/api/participations`, {
        method: "POST",
        body: JSON.stringify({ eventId }),
      });
      if (res.ok) {
        mutate(`/api/participants/${eventId}`);
        mutate("/api/participations");
        setIsAlertOpen(true);
        setStatus({
          ...status,
          title: messages[2].title,
          description: messages[2].description,
          variant: "success",
        });
      }
      throw await res.json();
    } catch (error) {
      toast({
        description: error?.message,
      });
    } finally {
      setLoading(false);
      setConfirm(false);
    }
  };

  const handleParticipate = async () => {
    if (user?._id) {
      setIsAlertOpen(true);
      setStatus({
        ...status,
        title: messages[1].title,
        description: messages[1].description,
      });
      setConfirm(true);
    } else {
      setIsAlertOpen(true);
      setStatus({
        ...status,
        title: messages[0].title,
        description: messages[0].description,
        variant: "destructive",
      });
    }
  };

  const isParticipate = participations?.some(
    (data) => data.event && data.event._id === eventId
  );

  let content = null;

  if (isLoading) {
    content = <Skeleton className="h-7 w-32" />;
  }

  if (!isLoading) {
    content = (
      <>
        {isParticipate ? (
          <span className="text-green-500">অংশগ্রহণ করেছেন</span>
        ) : (
          <Button
            onClick={handleParticipate}
            disabled={loading}
            className="flex items-center gap-2"
          >
            {loading && <Loader size={18} className="animate-spin" />}
            অংশগ্রহন করুন
          </Button>
        )}
      </>
    );
  }

  return (
    <>
      <Alert
        isAlertOpen={isAlertOpen}
        setIsAlertOpen={setIsAlertOpen}
        title={status.title}
        desciption={status.description}
        onContinue={confirm ? participate : () => setIsAlertOpen(false)}
        variant={status.variant}
      />
      {content}
    </>
  );
}
