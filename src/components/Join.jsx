import Image from "next/image";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";

export default function Join() {
  return (
    <>
      <div className="flex items-center justify-center h-[calc(100vh_-_64px)]">
        <div className="max-w-[400px] w-full">
          <div className="mb-8 text-center space-y-2">
            <h2 className="text-2xl font-semibold">অ্যাকাউন্ট তৈরি করুন</h2>
            <p className="text-muted-foreground">
              অ্যাকাউন্ট তৈরি করতে নিচে আপনার তথ্যগুলো ইনপুট করুন
            </p>
          </div>

          <form className="space-y-8">
            <div className="space-y-3">
              <div className="space-y-1">
                <label htmlFor="">নাম</label>
                <Input type="text" />
              </div>
              <div className="space-y-1">
                <label htmlFor="">ইমেইল</label>
                <Input type="emaill" />
              </div>
              <div className="space-y-1">
                <label htmlFor="">মোবাইল নাম্বার</label>
                <Input type="text" />
              </div>
              <div className="space-y-1">
                <label htmlFor="">এসএসসি পাশের সাল</label>
                <Input type="text" />
              </div>
              <div className="flex space-x-2">
                <Checkbox id="terms" className="mt-[1px]" />
                <label htmlFor="terms" className="text-sm">
                  আল ইসলাহ ইসলামী একাডেমী থেকে এসএসসি পাশ করেছিলেন?
                </label>
              </div>
              <Button type="submit" className="w-full">
                সাবমিট করুন
              </Button>
            </div>
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <span class="w-full border-t"></span>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="bg-background px-2 text-muted-foreground">
                  অথবা চালিয়ে যান
                </span>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              <Image
                src="/google.svg"
                width={18}
                height={18}
                alt="google"
                className="mr-2"
              />{" "}
              Google
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
