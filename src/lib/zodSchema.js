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
    message: "পাশের সাল সিলেক্ট করুন",
  }),
  bloodGroup: z.string().refine((value) => getbloodGroups().includes(value), {
    message: `সঠিক ব্লাড গ্রুপ ইনপুট করুন`,
  }),
});

// otp verify server validation
export const otpSchema = z.object({
  otp: z.string().min(6, {
    message: "OTP অবশ্যই 6 ডিজিটের হতে হবে",
  }),
});

export const loginSchema = z.object({
  phone: z.string().regex(/^01[3-9]\d{8}$/, {
    message: "সঠিক মোবাইল নাম্বার ইনপুট করুন",
  }),
  password: z.string().min(6, {
    message: "পাসওয়ার্ড সর্বনিম্ন ছয় সংখ্যার হতে হবে",
  }),
});

const MAX_FILE_SIZE = 1024 * 1024 * 1;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

// profile update
export const profileSchema = z.object({
  avatar: z
    .any()
    .refine((file) => {
      return file?.size ? file?.size <= MAX_FILE_SIZE : true;
    }, "সর্বোচ্চ ইমেজ সাইজ 1MB হতে পারে")
    .refine((file) => {
      return file?.type ? ACCEPTED_IMAGE_TYPES.includes(file?.type) : true;
    }, "ইমেজ ফরমেট .jpg, .jpeg ‍এবং .png হতে হবে")
    .optional(),
  name: z.string().min(1, {
    message: "নাম ইনপুট করুন",
  }),
  bloodGroup: z.string().refine((value) => getbloodGroups().includes(value), {
    message: `সঠিক ব্লাড গ্রুপ ইনপুট করুন`,
  }),
  passingYear: z.string().min(1, {
    message: "পাশের সাল সিলেক্ট করুন",
  }),
  dob: z.string().optional(),
  presentAddress: z.string().optional(),
  permanentAddress: z.string().optional(),
  qualification: z.string().optional(),
  institute: z.string().optional(),
  professionalInstitute: z.string().optional(),
  designation: z.string().optional(),
});
