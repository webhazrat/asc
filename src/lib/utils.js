import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

// swr fetcher
export const fetcher = async (...args) => {
  const res = await fetch(...args);
  return res.json();
};

// first letter from string
export const firstLetter = (string) => {
  return string?.charAt(0);
};

// blood groups array
export const getbloodGroups = () => {
  return ["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"];
};

// truncate a string
export const truncateString = (str, maxLength, ending = "...") => {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - ending.length) + ending;
};
