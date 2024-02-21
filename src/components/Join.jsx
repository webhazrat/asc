import Image from "next/image";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";

export default function Join() {
  return (
    <>
      <div className="flex items-center justify-center h-[calc(100vh_-_64px)]">
        <div className="max-w-sm">
          <div className="mb-8 text-center space-y-2">
            <h2 className="text-2xl font-semibold">Create an account</h2>
            <p className="text-muted-foreground">
              Enter your information below to create your account
            </p>
          </div>

          <form className="space-y-8">
            <div className="space-y-3">
              <div className="space-y-1">
                <label htmlFor="">Name</label>
                <Input type="text" />
              </div>
              <div className="space-y-1">
                <label htmlFor="">Email address</label>
                <Input type="emaill" />
              </div>
              <div className="space-y-1">
                <label htmlFor="">Phone</label>
                <Input type="text" />
              </div>
              <div className="space-y-1">
                <label htmlFor="">SSC Passing year</label>
                <Input type="text" />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label htmlFor="terms">
                  Are you a student of Al Islah Islami Academy?
                </label>
              </div>
              <Button type="submit" className="w-full">
                Create an account
              </Button>
            </div>
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <span class="w-full border-t"></span>
              </div>
              <div class="relative flex justify-center text-xs uppercase">
                <span class="bg-background px-2 text-muted-foreground">
                  Or continue with
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
            <p className="text-center px-5 text-muted-foreground">
              By clicking continue, you agree to our Terms of Service and
              Privacy Policy.
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
