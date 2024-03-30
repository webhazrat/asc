import { useForm } from "react-hook-form";
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
import { Loader } from "lucide-react";
import { SERVER_URL } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import { mutate } from "swr";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const roles = ["General", "Head", "Admin"];

export default function StudentForm({ setIsModalOpen, student }) {
  const form = useForm({
    defaultValues: {
      name: student.name,
      passingYear: student.passingYear,
      role: student.role,
      status: student.status,
    },
  });

  const {
    formState: { isSubmitting },
    setError,
  } = form;

  // patch a batch
  const updateStudent = async (formData) => {
    const res = await fetch(`${SERVER_URL}/api/student/${student._id}`, {
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
  const handleStudent = async (formData) => {
    console.log({ formData });
    try {
      const res = await updateStudent(formData);
      mutate(`/api/students`);
      setIsModalOpen(false);
      toast({
        description: res.message,
      });
    } catch (error) {
      console.error({ studentPatchError: error });
      setError(error?.field || "common", {
        type: "server",
        message: error.message,
      });
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-3" onSubmit={form.handleSubmit(handleStudent)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>নাম</FormLabel>
              <FormControl>
                <Input type="text" {...field} readOnly />
              </FormControl>
              <FormDescription>নাম পরিবর্তন করা যাবে না </FormDescription>
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
              <FormControl>
                <Input type="text" {...field} readOnly />
              </FormControl>
              <FormDescription>পাশের সাল পরিবর্তন করা যাবে না </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={() => (
            <FormItem>
              <FormLabel>ভূমিকা</FormLabel>
              <div className="flex gap-5">
                {roles.map((role) => (
                  <FormField
                    key={role}
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem
                        key={role}
                        className="flex flex-row items-center space-x-2 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(role)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, role])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== role
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">{role}</FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>অবস্থা</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Verified">Verified</SelectItem>
                  <SelectItem value="Unverified">Unverified</SelectItem>
                </SelectContent>
              </Select>
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
