import Image from "next/image";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function Login() {
  return (
    <>
      <div className="flex items-center justify-center h-[calc(100vh_-_64px)]">
        <div className="max-w-sm w-full">
          <div className="mb-8 text-center space-y-2">
            <h2 className="text-2xl font-semibold">অ্যাকাউন্ট লগইন করুন</h2>
            <p className="text-muted-foreground">
              লগইন করতে নিচের তথ্যগুলো ইনপুট করুন
            </p>
          </div>

          <form className="space-y-8">
            <div className="space-y-3">
              <div className="space-y-1">
                <label htmlFor="">ইমেইল</label>
                <Input type="email" />
              </div>
              <div className="space-y-1">
                <label htmlFor="">পাসওয়ার্ড</label>
                <Input type="password" />
              </div>
              <Button type="submit" className="w-full">
                লগইন
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
