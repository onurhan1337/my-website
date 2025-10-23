import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  size?: "small" | "medium" | "large";
  className?: string;
};

export default function Container({
  children,
  size = "large",
  className,
}: ContainerProps) {
  let width;
  switch (size) {
    case "small":
      width = "w-full sm:max-w-screen-sm";
      break;
    case "medium":
      width = "w-full sm:max-w-screen-md";
      break;
    case "large":
    default:
      width = "w-full sm:max-w-2xl";
      break;
  }

  return (
    <div
      className={`mx-auto bg-background ${width} ${
        className || ""
      }`}
    >
      {children}
    </div>
  );
}
