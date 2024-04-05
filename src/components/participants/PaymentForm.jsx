import { useFieldArray, useForm } from "react-hook-form";
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
import { SERVER_URL } from "@/lib/utils";
import { mutate } from "swr";
import { toast } from "../ui/use-toast";
export default function PaymentForm({ eventId, participant, setIsOpen }) {
  const feesData = participant.event?.fees.map((fee, index) => {
    return {
      category: fee.category,
      amount: participant.fees[index]?.amount ?? "",
    };
  });

  const form = useForm({
    defaultValues: {
      name: participant.student?.name,
      fees: feesData,
    },
  });

  const {
    control,
    formState: { isSubmitting },
  } = form;

  const fees = useFieldArray({
    control,
    name: "fees",
  });

  const paymentReceive = async (data) => {
    const res = await fetch(
      `${SERVER_URL}/api/participant/${participant._id}`,
      {
        method: "PATCH",
        body: JSON.stringify(data),
      }
    );
    if (!res.ok) {
      const error = await res.json();
      throw error;
    }
    return res.json();
  };

  // handle submit an event
  const handlePayment = async (data) => {
    try {
      const res = await paymentReceive(data);
      mutate(`/api/participants/${eventId}?role=Head`);
      setIsOpen(false);
      toast({
        description: res?.message,
      });
    } catch (error) {
      console.error({ participantPatchError: error });
      toast({
        title: "Error!",
        description: error.message,
      });
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-3" onSubmit={form.handleSubmit(handlePayment)}>
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>নাম</FormLabel>
              <FormControl>
                <Input type="text" {...field} readOnly />
              </FormControl>
              <FormDescription>নাম পরিবর্তন করা যাবে না</FormDescription>
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
                        <Input
                          type="text"
                          placeholder="ক্যাটেগরি"
                          {...field}
                          readOnly
                        />
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
        </FormItem>

        <div className="fixed bottom-0 left-0 bg-background border-t border-muted w-full py-2 px-6 rounded-b-lg flex justify-end">
          <Button
            type="submit"
            className="flex items-center gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting && <Loader size={18} className="animate-spin" />}
            সাবমিট
          </Button>
        </div>
      </form>
    </Form>
  );
}
