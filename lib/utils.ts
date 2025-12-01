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
  if (!content || typeof content !== "string") {
    return [];
  }

  const headings: Heading[] = [];
  const len = content.length;
  let i = 0;
  let lineStart = 0;

  while (i <= len) {
    if (i === len || content.charCodeAt(i) === 10) {
      const line = content.slice(lineStart, i);

      if (line.startsWith("## ")) {
        const title = line.slice(3).trim();
        const id = title
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-");

        headings.push({ title, id });
      }

      lineStart = i + 1;
    }
    i++;
  }

  return headings;
}
