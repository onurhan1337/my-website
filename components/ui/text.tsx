import React from "react";
import { cn } from "@/lib/utils";

type Variant = "h1" | "h2" | "h3" | "h4" | "p" | "blockquote" | "li";
type StyleVariant = "lead" | "muted";

type TextProps = {
  as: Variant;
  styleVariant?: StyleVariant;
  className?: string;
  children: React.ReactNode;
};

const variantStyles: Record<Variant, string> = {
  h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
  h2: "mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
  h3: "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight",
  h4: "scroll-m-20 text-xl font-semibold tracking-tight",
  p: "leading-7 mt-6",
  blockquote: "mt-6 border-l-2 pl-6 italic",
  li: "my-6 ml-6 list-disc mt-2",
};

const styleVariants: Record<StyleVariant, string> = {
  lead: "text-xl text-muted-foreground",
  muted: "text-sm text-muted-foreground",
};

export const Text = ({
  as: Component,
  styleVariant,
  className,
  children,
}: TextProps) => {
  return (
    <Component
      className={cn(
        variantStyles[Component],
        styleVariant ? styleVariants[styleVariant] : "",
        className
      )}
    >
      {children}
    </Component>
  );
};
