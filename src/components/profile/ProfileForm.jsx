"use client";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { DialogFooter } from "../ui/dialog";
import {
  Form,
  FormControl,
  FormpresentAddress,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { CalendarIcon, Loader } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { SERVER_URL, getYearRange } from "@/lib/utils";
export default function ProfileForm({ user }) {
  const form = useForm({
    defaultValues: {
      ...user,
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const handleEvent = async (data) => {
    const formData = new FormData();
    formData.append("avatar", data.avatar);
    formData.append("name", data.name);
    formData.append("bloodGroup", data.bloodGroup);
    formData.append("presentAddress", data.presentAddress);
    formData.append("permanentAddress", data.permanentAddress);
    formData.append("dob", data.dob);
    formData.append("passingYear", data.passingYear);
    formData.append("qualification", data.qualification);
    formData.append("institute", data.institute);
    formData.append("professionalInstitute", data.professionalInstitute);
    formData.append("designation", data.designation);
    console.log(Object.fromEntries(formData));

    try {
      const result = await fetch(`${SERVER_URL}/api/profile`, {
        method: "PATCH",
        body: formData,
      });

      const response = await result.json();
      console.log({ response });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-3" onSubmit={form.handleSubmit(handleEvent)}>
        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ইমেজ</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  onChange={(e) => {
                    field.onChange(e.target.files[0]);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
          name="bloodGroup"
          render={({ field }) => (
            <FormItem>
              <FormLabel>রক্তের গ্রুপ</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="presentAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>বর্তমান ঠিকানা</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="permanentAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>স্থায়ী ঠিকানা</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
          name="dob"
          render={({ field }) => (
            <FormItem>
              <FormLabel>জন্ম তারিখ</FormLabel>
              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant={"outline"} className="w-full">
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span></span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="qualification"
          render={({ field }) => (
            <FormItem>
              <FormLabel>সর্বশেষ শিক্ষাগত যোগ্যতা</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="institute"
          render={({ field }) => (
            <FormItem>
              <FormLabel>প্রতিষ্ঠানের নাম</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="professionalInstitute"
          render={({ field }) => (
            <FormItem>
              <FormLabel>কর্মরত প্রতিষ্ঠান</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="designation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>পদবি </FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          <Button
            type="submit"
            className="flex items-center gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting && <Loader size={18} className="animate-spin" />}
            সাবমিট
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
