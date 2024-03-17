"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/zodSchema";
import { useState } from "react";
import OtpStep from "./OtpStep";
import { useRegisterMutation } from "@/hooks/useRegisterMutation";
import { useToast } from "../ui/use-toast";
import RegisterStep from "./RegisterStep";
import SuccessStep from "./SuccessStep";

export default function RegisterForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState(null);

  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      phone: "",
      password: "",
      passingYear: "",
      bloodGroup: "",
    },
  });

  const { register } = useRegisterMutation();

  const handleRegister = async (formData) => {
    try {
      const response = await register(formData);
      if (response.status === 200) {
        setStep(2);
        setData(formData);
        toast({
          variant: "success",
          description: response?.message,
        });
      } else {
        setError(response?.error?.field, {
          type: "server",
          message: response.error.message,
        });
      }
    } catch (error) {
      console.log({ RegisterFormError: error });
      setError("common", {
        type: "server",
        message: error.message,
      });
    }
  };

  return (
    <>
      <div className="container flex items-center justify-center py-20">
        <div className="max-w-[400px] w-full">
          {step === 1 && <RegisterStep onSubmit={handleRegister} form={form} />}

          {step === 2 && (
            <OtpStep onSubmit={handleRegister} data={data} setStep={setStep} />
          )}

          {step === 3 && <SuccessStep />}
        </div>
      </div>
    </>
  );
}
