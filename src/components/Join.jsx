"use client";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
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
import placeholderImage from "../../public/placeholder.png";
import Image from "next/image";

export default function Join() {
  const form = useForm();
  return (
    <>
      <div className="flex items-center justify-center py-20">
        <div className="max-w-[400px] w-full">
          <div className="mb-6 text-center space-y-2">
            <h2 className="text-2xl font-semibold">অ্যাকাউন্ট তৈরি করুন</h2>
            <p className="text-muted-foreground">
              অ্যাকাউন্ট তৈরি করতে নিচে আপনার তথ্যগুলো ইনপুট করুন
            </p>
          </div>

          <Form {...form}>
            <form className="space-y-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>নাম</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>মোবাইল নাম্বার</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
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
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-3">
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
                          <SelectItem value="2010">2010</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription></FormDescription>
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
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-3">
                <div>
                  <Image
                    src={placeholderImage}
                    width={50}
                    height={50}
                    alt="photo"
                    className="rounded-lg"
                  />
                </div>
                <FormField
                  control={form.control}
                  name="photo"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>প্রোফাইল ফটো</FormLabel>
                      <FormControl>
                        <Input type="file" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="isStudent"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-2 py-3">
                      <FormControl>
                        <Checkbox
                          className="-mt-[1px]"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>
                        আল ইসলাহ ইসলামী একাডেমী থেকে এসএসসি পাশ করেছিলেন?
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                সাবমিট করুন
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
