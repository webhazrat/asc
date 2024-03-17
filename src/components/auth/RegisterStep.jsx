import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { getYearRange } from "@/lib/utils";
import Link from "next/link";
import { Loader } from "lucide-react";

export default function RegisterStep({ form, onSubmit }) {
  const {
    formState: { errors, isSubmitting },
    setError,
  } = form;

  return (
    <>
      <div className="mb-6 text-center space-y-2">
        <h2 className="text-2xl font-semibold">অ্যাকাউন্ট তৈরি করুন</h2>
        <p className="text-muted-foreground">
          অ্যাকাউন্ট তৈরি করতে নিচে আপনার তথ্যগুলো ইনপুট করুন
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>নাম</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>মোবাইল নাম্বার</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
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
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="passingYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel>এসএসসি পাশের সাল</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {getYearRange(1998).map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bloodGroup"
            render={({ field }) => (
              <FormItem>
                <FormLabel>রক্তের গ্রুপ</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                  </SelectContent>
                </Select>
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
            সাবমিট করুন
          </Button>

          <div className="text-center">
            অ্যাকাউন্ট থাকলে?{" "}
            <Link href={"/login"} className="text-primary">
              লগইন করুন
            </Link>
          </div>

          <p className="text-center text-sm">
            [নোট: অ্যাকাউন্ট তৈরি করতে হলে আপনাকে অবশ্যই আল ইসলাহ ইসলামী একাডেমী
            থেকে এসএসসি পাশের শিক্ষার্থী হতে হবে]
          </p>
        </form>
      </Form>
    </>
  );
}
