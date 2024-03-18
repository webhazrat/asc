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
import { Loader } from "lucide-react";
import { useToast } from "../ui/use-toast";

export default function ForgotForm() {
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

  const handleForgot = async (formData) => {};

  return (
    <>
      <div className="container flex items-center justify-center py-20">
        <div className="max-w-sm w-full">
          <div className="mb-8 text-center space-y-2">
            <h2 className="text-2xl font-semibold">পাসওয়ার্ড ভুলে গেছেন</h2>
            <p className="text-muted-foreground">
              পাসওয়ার্ড পুনরুদ্ধার করতে নিচের তথ্যগুলো ইনপুট করুন
            </p>
          </div>

          <Form {...form}>
            <form
              className="space-y-3"
              onSubmit={form.handleSubmit(handleForgot)}
            >
              <FormField
                control={form.control}
                name="phone"
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

              {errors?.common && (
                <p className="text-red-500 text-sm">{errors.common.message}</p>
              )}

              <Button
                type="submit"
                className="w-full flex items-center gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting && <Loader size={18} className="animate-spin" />}
                সাবমিট
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
