import { type ClassValue, clsx } from "clsx";
import { unstable_noStore } from "next/cache";
import { twMerge } from "tailwind-merge";
import type { FormatDateOptions, Heading } from "@/types";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string, options?: FormatDateOptions): string {
  unstable_noStore();
  const currentDate = new Date();
  const normalizedDate = date.includes("T") ? date : `${date}T00:00:00`;
  const targetDate = new Date(normalizedDate);

  const diffInMs = currentDate.getTime() - targetDate.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  let formattedDate = "";

  if (diffInYears > 0) {
    formattedDate = `${diffInYears}y ago`;
  } else if (diffInMonths > 0) {
    formattedDate = `${diffInMonths}mo ago`;
  } else if (diffInDays > 0) {
    formattedDate = `${diffInDays}d ago`;
  } else {
    formattedDate = "Today";
  }

  const fullDate = targetDate.toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (options?.time) {
    const time = targetDate.toLocaleString("en-us", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    return `${time} • ${formattedDate}`;
  }

  return `${fullDate} (${formattedDate})`;
}

export function extractHeadings(content: string): Heading[] {
  const headings: Heading[] = [];
  const len = content.length;
  let i = 0;

  while (i < len) {
    if (content.charCodeAt(i) === 10 || i === 0) {
      if (i > 0) i++;

      if (
        i < len &&
        content.charCodeAt(i) === 35 &&
        content.charCodeAt(i + 1) === 35 &&
        content.charCodeAt(i + 2) === 32
      ) {
        i += 3;
        let title = "";

        while (
          i < len &&
          content.charCodeAt(i) !== 10 &&
          content.charCodeAt(i) !== 13
        ) {
          title += content[i];
          i++;
        }

        title = title.trim();

        let id = "";
        for (let j = 0; j < title.length; j++) {
          const code = title.charCodeAt(j);
          if (
            (code >= 97 && code <= 122) ||
            (code >= 48 && code <= 57) ||
            code === 45
          ) {
            id += title[j];
          } else if (code >= 65 && code <= 90) {
            id += String.fromCharCode(code + 32);
          } else if (code === 32) {
            id += "-";
          }
        }

        headings.push({ title, id });
      } else {
        i++;
      }
    } else {
      i++;
    }
  }

  return headings;
}
