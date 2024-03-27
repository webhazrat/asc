import { Check } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
export default function SuccessStep() {
  return (
    <>
      <div className="mb-6 text-center space-y-2">
        <span className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="stroke-green-500" />
        </span>
        <h2 className="text-2xl font-semibold">অভিনন্দন!</h2>
        <p className="text-muted-foreground">
          আপনার অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে
        </p>

        <Button type="button" asChild>
          <Link href={"/login"}>লগইন</Link>
        </Button>
      </div>
    </>
  );
}
