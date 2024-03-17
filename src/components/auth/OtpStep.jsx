import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpSchema } from "@/lib/zodSchema";
import { Loader } from "lucide-react";
import { useRegisterMutation } from "@/hooks/useRegisterMutation";
import { useToast } from "../ui/use-toast";
import { useEffect, useRef, useState } from "react";

export default function OtpStep({ onSubmit, data, setStep }) {
  const form = useForm({
    resolver: zodResolver(otpSchema),
  });
  const {
    formState: { errors, isSubmitting },
    setError,
  } = form;
  const { toast } = useToast();
  const timerRef = useRef();
  const [remainingTime, setRemainingTime] = useState(5 * 60);

  const { verify } = useRegisterMutation();

  const handleVerify = async (formData) => {
    formData = { ...formData, phone: data.phone };
    try {
      const response = await verify(formData);
      if (response.status === 200) {
        toast({
          variant: "success",
          description: response?.message,
        });
        setStep(3);
      } else {
        setError(response?.error?.field, {
          type: "server",
          message: response.error.message,
        });
      }
    } catch (error) {
      console.log({ RegisterOtpError: error });
      setError("root.random", {
        type: "random",
        message: error.message,
      });
    }
  };

  useEffect(() => {
    clearInterval(timerRef.current);
    if (remainingTime > 0) {
      timerRef.current = setInterval(() => {
        setRemainingTime((time) => time - 1);
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [remainingTime]);

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  const handleOtp = () => {
    onSubmit(data);
    setRemainingTime(5 * 60);
  };

  return (
    <>
      <div className="mb-6 text-center space-y-2">
        <h2 className="text-2xl font-semibold">অ্যাকাউন্ট ভেরিফাই</h2>
        <p className="text-muted-foreground">
          অ্যাকাউন্ট ভেরিফাই করতে OTP ইনপুট করুন
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleVerify)}
          className="space-y-3 text-center"
        >
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ওয়ান টাইম পাসওয়ার্ড (ওটিপি)</FormLabel>
                <FormControl>
                  <InputOTP
                    className="justify-center"
                    maxLength={6}
                    render={({ slots }) => (
                      <InputOTPGroup>
                        {slots.map((slot, index) => (
                          <InputOTPSlot key={index} {...slot} />
                        ))}
                      </InputOTPGroup>
                    )}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  আপনার ({data?.phone}) নাম্বারে পাঠানো 6 ডিজিট OTP ইনপুট করুন
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {errors?.root?.random && (
            <p className="text-red-500 text-sm">{errors.root.random.message}</p>
          )}

          <div className="flex justify-between items-center">
            <p>
              {remainingTime !== 0 && (
                <span>
                  অবশিষ্ট সময় {minutes}:{seconds < 10 ? "0" : ""}
                  {seconds}
                </span>
              )}
            </p>
            <Button
              type="button"
              variant="link"
              disabled={remainingTime !== 0}
              className={`p-0 h-auto`}
              onClick={handleOtp}
            >
              আবার কোড পাঠান
            </Button>
          </div>

          <Button
            type="submit"
            className="w-full flex items-center gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting && <Loader size={18} className="animate-spin" />}
            সাবমিট করুন
          </Button>
        </form>
      </Form>
    </>
  );
}
