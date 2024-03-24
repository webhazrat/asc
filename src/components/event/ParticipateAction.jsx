import { useUser } from "@/hooks/useUser";
import { Button } from "../ui/button";
import { useState } from "react";
import Alert from "../common/Alert";
import { SERVER_URL } from "@/lib/utils";
import { toast } from "../ui/use-toast";
import { Loader } from "lucide-react";
import { useParticipations } from "@/hooks/useParticipation";

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
  const { participations } = useParticipations();
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
      const res = await fetch(
        `${SERVER_URL}/api/profile/${user?._id}/participate/`,
        {
          method: "POST",
          body: JSON.stringify({ eventId }),
        }
      );
      if (res.ok) {
        setIsAlertOpen(true);
        setStatus({
          ...status,
          title: messages[2].title,
          description: messages[2].description,
          variant: "success",
        });
      }
    } catch (error) {
      toast({
        desciption: error.message,
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
      {participations?.event?._id === eventId ? (
        <Button
          onClick={handleParticipate}
          disabled={loading}
          className="flex items-center gap-2"
        >
          {loading && <Loader size={18} className="animate-spin" />}
          অংশগ্রহন করুন
        </Button>
      ) : (
        <span className="text-green-500">অংশগ্রহণ করেছেন</span>
      )}
    </>
  );
}
