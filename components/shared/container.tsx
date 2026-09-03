import type { ContainerProps } from "@/types";
import { cn } from "@/lib/utils";

export default function Container({ children, className }: ContainerProps) {
  return <div className={cn("w-full", className)}>{children}</div>;
}
