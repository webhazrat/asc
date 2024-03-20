import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const SERVER_URL = "http://localhost:3000";

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

// year range from start to current - 1
export const getYearRange = (start) => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = start; year <= currentYear - 1; year++) {
    years.push(year);
  }
  return years;
};

export const timeCountDown = (toDate) => {};
