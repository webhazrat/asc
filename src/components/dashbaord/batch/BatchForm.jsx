import { useForm } from "react-hook-form";
import { Button } from "../../ui/button";
import { DialogFooter } from "../../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { Loader } from "lucide-react";
import { SERVER_URL } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import { mutate } from "swr";

export default function BatchFrom({ setIsModalOpen, batch }) {
  const form = useForm({
    defaultValues: batch._id
      ? { ...batch }
      : {
          passingYear: "",
          examineeNumber: "",
        },
  });

  const {
    formState: { isSubmitting },
    setError,
  } = form;

  // create a batch
  const createBatch = async (formData) => {
    const res = await fetch(`${SERVER_URL}/api/batches`, {
      method: "POST",
      body: JSON.stringify(formData),
    });
    if (!res.ok) {
      const error = await res.json();
      throw error;
    }
    return res.json();
  };

  // patch a batch
  const updateBatch = async (formData) => {
    const res = await fetch(`${SERVER_URL}/api/batches/${batch._id}`, {
      method: "PATCH",
      body: JSON.stringify(formData),
    });
    if (!res.ok) {
      const error = await res.json();
      throw error;
    }
    return res.json();
  };

  // handle form submit
  const handleBatch = async (formData) => {
    console.log({ formData });
    try {
      const res = batch._id
        ? await updateBatch(formData)
        : await createBatch(formData);

      mutate(`/api/batches`);
      setIsModalOpen(false);
      toast({
        description: res.message,
      });
    } catch (error) {
      console.error({ batchCreateUpdateError: error });
      setError(error?.field || "common", {
        type: "server",
        message: error.message,
      });
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-3" onSubmit={form.handleSubmit(handleBatch)}>
        <FormField
          control={form.control}
          name="passingYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>এসএসসি পাশের সাল</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="examineeNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>পরিক্ষার্থীর সংখ্যা</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
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
