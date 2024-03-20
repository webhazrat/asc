import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { DialogFooter } from "../ui/dialog";
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
import { CalendarIcon, Loader } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { SERVER_URL } from "@/lib/utils";
export default function EventForm() {
  const form = useForm({
    defaultValues: {
      thumbnail: "",
      title: "",
      slug: "",
      description: "",
      feeDetail: "",
      location: "",
      date: "",
      status: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const handleEvent = async (data) => {
    const formData = new FormData();
    formData.append("thumbnail", data.thumbnail);
    formData.append("title", data.title);
    formData.append("slug", data.slug);
    formData.append("description", data.description);
    formData.append("feeDetail", data.feeDetail);
    formData.append("location", data.location);
    formData.append("date", data.date);
    formData.append("status", data.status);
    console.log(Object.fromEntries(formData));

    try {
      const result = await fetch(`${SERVER_URL}/api/events`, {
        method: "POST",
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
          name="thumbnail"
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
              </FormControl>{" "}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>টাইটেল</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>{" "}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>স্ল্যাগ</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>{" "}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
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

        <FormField
          control={form.control}
          name="feeDetail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ফি বিবরণ</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
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
            control={form.control}
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
            control={form.control}
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
