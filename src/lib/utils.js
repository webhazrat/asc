import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import crypto from "crypto";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const getYearRange = (start) => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = start; year <= currentYear - 1; year++) {
    years.push(year);
  }
  return years;
};

export const generateToken = () => {
  return crypto.randomBytes(32).toString("base64").replace(/[/+=]/g, "");
};

export const generateOTP = () => {
  const max = 999999;
  const min = 100000;
  const otp = Math.floor(crypto.randomInt(max - min + 1) + min).toString();
  return otp;
};

export async function sendSMS(phone, msg) {
  const encodeMsg = encodeURIComponent(msg);
  try {
    const response = await fetch(
      `https://tpsms.xyz/sms/api?action=send-sms&api_key=${process.env.SMS_API_KEY}=&to=${phone}&from=8809612444246&sms=${encodeMsg}`
    );
    const data = await response.json();
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
}
