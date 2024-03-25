"use client";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Loader } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { SERVER_URL, getbloodGroups } from "@/lib/utils";
import { useState } from "react";
import { mutate } from "swr";
import { format } from "date-fns";
import CustomAvatar from "../common/CustomAvatar";
import { useBatch } from "@/hooks/useBatch";
import { toast } from "../ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "@/lib/zodSchema";
export default function ProfileForm({ user, setIsOpen }) {
  const { batches, isLoading, error } = useBatch();
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar || "");

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      ...user,
      dob: user?.dob ? format(new Date(user.dob), "yyyy-MM-dd") : "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  // handle avatar change
  const handleAvatarChange = (file) => {
    const avatar = file ? URL.createObjectURL(file) : "";
    setSelectedAvatar(avatar);
  };

  const updateUser = async (formData) => {
    const res = await fetch(`${SERVER_URL}/api/profile`, {
      method: "PATCH",
      body: formData,
    });
    if (!res.ok) {
      const error = await res.json();
      throw error;
    }
    return res.json();
  };

  // handle submit an event
  const handleEvent = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    try {
      const res = await updateUser(formData);
      mutate(`/api/profile/${user._id}`);
      setIsOpen(false);
      toast({
        description: res?.message,
      });
    } catch (error) {
      console.error({ userUpdateError: error });
      toast({
        title: "Error!",
        description: error.message,
      });
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-3" onSubmit={form.handleSubmit(handleEvent)}>
        <div className="flex gap-3">
          <div className="h-20 w-20 bg-gray-100 rounded-full">
            <CustomAvatar avatar={selectedAvatar} name={user?.name} />
          </div>
          <FormField
            control={form.control}
            name="avatar"
            defaultValue=""
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>ইমেজ</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    onChange={(e) => {
                      field.onChange(e.target.files[0]);
                      handleAvatarChange(e.target.files[0]);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="name"
          defaultValue=""
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

        <div className="grid sm:grid-cols-3 gap-3">
          <FormField
            control={form.control}
            name="dob"
            defaultValue=""
            render={({ field }) => (
              <FormItem>
                <FormLabel>জন্ম তারিখ</FormLabel>
                <FormControl>
                  <Input type="date" {...field} className="block" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bloodGroup"
            defaultValue=""
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
                    {getbloodGroups().map((group) => (
                      <SelectItem key={group} value={group}>
                        {group}
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
            name="passingYear"
            defaultValue=""
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
                    {batches?.length > 0 &&
                      batches?.map((batch) => (
                        <SelectItem
                          key={batch._id}
                          value={batch.passingYear.toString()}
                        >
                          {batch.passingYear}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="presentAddress"
          defaultValue=""
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
          defaultValue=""
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
          name="qualification"
          defaultValue=""
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
          defaultValue=""
          render={({ field }) => (
            <FormItem>
              <FormLabel>প্রতিষ্ঠানের নাম</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormDescription>
                সর্বশেষ শিক্ষাগত যোগ্যতা যে প্রতিষ্ঠান থেকে অর্জন করেছেন
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="professionalInstitute"
          defaultValue=""
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
          defaultValue=""
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

        <div className="fixed bottom-0 left-0 bg-background border-t border-muted w-full py-2 px-6 rounded-b-lg flex justify-end">
          <Button
            type="submit"
            className="flex items-center gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting && <Loader size={18} className="animate-spin" />}
            আপডেট
          </Button>
        </div>
      </form>
    </Form>
  );
}
