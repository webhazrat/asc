"use client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/zodSchema";
import Link from "next/link";
import { Checkbox } from "../ui/checkbox";
import { signIn } from "next-auth/react";
import { Loader } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { useState } from "react";
import ShowPasswordAction from "../common/ShowPasswordAction";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const {
    formState: { errors, isSubmitting },
    setError,
  } = form;

  const handleLogin = async (formData) => {
    const response = await signIn("credentials", {
      redirect: false,
      ...formData,
    });
    if (response.ok) {
      toast({
        description: "সফলভাবে অ্যাকাউন্ট লগইন হয়েছে",
      });
      const search = searchParams.get("callbackUrl");
      const url = search ? search : "/profile";
      router.push(url);
    } else {
      setError("common", {
        type: "server",
        message: response.error,
      });
    }
  };

  return (
    <>
      <div className="container flex items-center justify-center py-20">
        <div className="max-w-sm w-full">
          <div className="mb-8 text-center space-y-2">
            <h2 className="text-2xl font-semibold">অ্যাকাউন্ট লগইন করুন</h2>
            <p className="text-muted-foreground">
              লগইন করতে নিচের তথ্যগুলো ইনপুট করুন
            </p>
          </div>

          <Form {...form}>
            <form
              className="space-y-3"
              onSubmit={form.handleSubmit(handleLogin)}
            >
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>মোবাইল নাম্বার</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormDescription>
                      মোবাইল নাম্বার 11 ডিজিটের ইংরেজিতে হতে হবে
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>পাসওয়ার্ড</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          {...field}
                          className="pr-10"
                        />
                        <ShowPasswordAction
                          setShowPassword={setShowPassword}
                          showPassword={showPassword}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      পাসওয়ার্ড সর্বনিম্ন ছয় সংখ্যার হতে হবে
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {errors?.common && (
                <p className="text-red-500 text-sm">{errors.common.message}</p>
              )}

              <div className="flex items-center justify-between gap-3">
                <label htmlFor="remember" className="flex items-center gap-2">
                  <Checkbox id="remember" /> আমাকে মনে রাখুন
                </label>
                <Link href={"/forgot"} className="text-primary">
                  পাসওয়ার্ড ভুলে গেছেন?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full flex items-center gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting && <Loader size={18} className="animate-spin" />}
                লগইন
              </Button>

              <div className="text-center">
                অ্যাকাউন্ট নেই?{" "}
                <Link href={"/register"} className="text-primary">
                  জয়েন করুন
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
