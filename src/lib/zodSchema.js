import { z } from "zod";
import { getbloodGroups } from "./utils";

// register data validation
export const registerSchema = z.object({
  name: z.string().min(1, {
    message: "নাম ইনপুট করুন",
  }),
  phone: z.string().regex(/^01[3-9]\d{8}$/, {
    message: "সঠিক মোবাইল নাম্বার ইনপুট করুন",
  }),
  password: z.string().min(6, {
    message: "পাসওয়ার্ড সর্বনিম্ন ছয় সংখ্যার হতে হবে",
  }),
  passingYear: z.string().min(1, {
    message: "পাশের সালে সিলেক্ট করুন",
  }),
  bloodGroup: z.string().refine((value) => getbloodGroups().includes(value), {
    message: `সঠিক ব্লাড গ্রুপ ইনপুট করুন`,
  }),
});

// otp verify server validation
export const otpSchema = z.object({
  otp: z
    .string({
      required_error: "OTP ইনপুট করুন",
    })
    .min(6, {
      message: "OTP অবশ্যই 6 ডিজিটের হতে হবে",
    }),
});

export const loginSchema = z.object({
  phone: z
    .string({
      required_error: "মোবাইল নাম্বার ইনপুট করুন",
    })
    .regex(/^(?:\+?88)?01[3-9]\d{8}$/, {
      message: "সঠিক মোবাইল নাম্বার ইনপুট করুন",
    }),
  password: z
    .string({
      required_error: "পাসওয়ার্ড ইনপুট করুন",
    })
    .min(6, {
      message: "পাসওয়ার্ড সর্বনিম্ন ছয় সংখ্যার হতে হবে",
    }),
});
