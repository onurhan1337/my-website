import { type ClassValue, clsx } from "clsx";
import { unstable_noStore } from "next/cache";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string, options?: { time?: boolean }) {
  unstable_noStore();
  let currentDate = new Date();
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }
  let targetDate = new Date(date);

  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  let daysAgo = currentDate.getDate() - targetDate.getDate();

  let formattedDate = "";

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`;
  } else {
    formattedDate = "Today";
  }

  let fullDate = targetDate.toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (options?.time) {
    let time = targetDate.toLocaleString("en-us", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    return `${time} • ${formattedDate}`;
  }

  return `${fullDate} (${formattedDate})`;
}

export function extractHeadings(content: string) {
  interface Heading {
    title: string;
    id: string;
  }
  const headings: Heading[] = [];
  const headingRegex = /^#{2}\s+(.+)$/gm;
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    headings.push({
      title: match[1],
      id: match[1]
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-"),
    });
  }

  return headings;
}
