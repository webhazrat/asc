"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";

export default function Login() {
  const form = useForm();
  return (
    <>
      <div className="flex items-center justify-center py-20">
        <div className="max-w-sm w-full">
          <div className="mb-8 text-center space-y-2">
            <h2 className="text-2xl font-semibold">অ্যাকাউন্ট লগইন করুন</h2>
            <p className="text-muted-foreground">
              লগইন করতে নিচের তথ্যগুলো ইনপুট করুন
            </p>
          </div>

          <Form {...form}>
            <form className="space-y-3">
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>মোবাইল নাম্বার</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>{" "}
                    <FormDescription></FormDescription>
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
                      <Input type="password" {...field} />
                    </FormControl>{" "}
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                লগইন
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
