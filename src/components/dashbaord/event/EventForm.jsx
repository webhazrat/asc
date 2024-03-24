import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "../../ui/button";
import { DialogFooter } from "../../ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { Loader, Minus } from "lucide-react";
import { Textarea } from "../../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { SERVER_URL } from "@/lib/utils";
import { useState } from "react";
import Image from "next/image";
import { mutate } from "swr";
import { toast } from "@/components/ui/use-toast";
import { format } from "date-fns";

export default function EventForm({ setIsModalOpen, event }) {
  const [seletedThumbnail, setSelectedThumbnail] = useState(
    event.thumbnail ? `/uploads/${event.thumbnail}` : ""
  );

  const form = useForm({
    defaultValues: event._id
      ? {
          ...event,
          date: event.date ? format(new Date(event.date), "yyyy-MM-dd") : "",
        }
      : {
          thumbnail: "",
          title: "",
          slug: "",
          description: "",
          fees: [{ category: "", amount: "" }],
          location: "",
          date: "",
          status: "",
        },
  });

  const {
    control,
    unregister,
    formState: { isSubmitting },
    setError,
  } = form;

  const fees = useFieldArray({
    control,
    name: "fees",
  });

  // onChange thumbnail hanlder
  const handleThumbChange = (file) => {
    if (file) {
      const thumbnail = URL.createObjectURL(file);
      setSelectedThumbnail(thumbnail);
    } else {
      setSelectedThumbnail(
        event.thumbnail ? `/uploads/${event.thumbnail}` : ""
      );
    }
  };

  // create an event
  const createEvent = async (formData) => {
    const res = await fetch(`${SERVER_URL}/api/events`, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) {
      const error = await res.json();
      throw error;
    }
    return res.json();
  };

  // patch an event
  const updateEvent = async (formData) => {
    const res = await fetch(`${SERVER_URL}/api/events/${event._id}`, {
      method: "PATCH",
      body: formData,
    });
    if (!res.ok) {
      const error = await res.json();
      throw error;
    }
    return res.json();
  };

  // hanlde form submit
  const handleEvent = async (data) => {
    const formData = new FormData();
    for (let key in data) {
      const value = Array.isArray(data[key])
        ? JSON.stringify(data[key])
        : data[key];
      formData.append(key, value);
    }

    try {
      const res = event._id
        ? await updateEvent(formData)
        : await createEvent(formData);
      mutate(`/api/events`);
      setIsModalOpen(false);
      toast({
        description: res.message,
      });
    } catch (error) {
      console.error({ eventCreateUpdateError: error });
      setError(error?.field || "common", {
        type: "server",
        message: error.message,
      });
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-3" onSubmit={form.handleSubmit(handleEvent)}>
        {seletedThumbnail ? (
          <Image
            src={seletedThumbnail}
            width={400}
            height={192}
            alt="blog"
            className="mb-1 rounded-md mx-auto"
          />
        ) : null}
        <FormField
          control={control}
          name="thumbnail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ইমেজ</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  onChange={(e) => {
                    field.onChange(e.target.files[0]);
                    handleThumbChange(e.target.files[0]);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>টাইটেল</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>স্ল্যাগ</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>বিবরণ</FormLabel>
              <FormControl>
                <Textarea className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel>ফি</FormLabel>
          {fees.fields.map((field, index) => {
            return (
              <div key={field.id} className="flex gap-2">
                <FormField
                  control={control}
                  name={`fees.${index}.category`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input type="text" placeholder="ক্যাটেগরি" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`fees.${index}.amount`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input type="number" placeholder="পরিমাণ" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            );
          })}
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => fees.append({ category: "", amount: 0 })}
            >
              আরো
            </Button>

            {fees.fields.length > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  fees.remove(fees.fields.length - 1);
                  unregister(`fees.${fees.fields.length - 1}`);
                }}
              >
                <Minus size={10} />
              </Button>
            )}
          </div>
        </FormItem>

        <FormField
          control={control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>স্থান</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid sm:grid-cols-2 gap-3">
          <FormField
            control={control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>তারিখ</FormLabel>
                <FormControl>
                  <Input type="date" {...field} className="block" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>স্ট্যাটাস</FormLabel>
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
                    <SelectItem value="Featured">Featured</SelectItem>
                    <SelectItem value="Unpublished">Unpublished</SelectItem>
                    <SelectItem value="Published">Published</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
