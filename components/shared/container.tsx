import React from "react";
import { cn } from "@/lib/utils";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: string;
  size?: "default" | "large";
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({
  as = "div",
  size = "default",
  children,
  className,
  ...props
}: ContainerProps) => {
  const sizes = {
    default: "max-w-screen-sm mx-auto px-6",
    large: "max-w-screen-xl mx-auto px-6",
  };

  return React.createElement(
    as,
    { className: cn(sizes[size], className), ...props },
    children
  );
};

export default Container;
