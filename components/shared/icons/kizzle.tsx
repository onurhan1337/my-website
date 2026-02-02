import type { ISVGProps } from "@/types";

export default function IconKizzle({ size = 16, ...props }: ISVGProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="36" height="36" fill="#FFFF3F" />
      <path
        d="M15.2 17.336L21.428 9.92H27.08L20.564 17.12L27.512 29H21.716L17.144 20.576L15.2 22.736V29H10.232V3.224H15.2V17.336Z"
        fill="black"
      />
      <rect x="10" width="7" height="7" fill="#FFFF3F" />
    </svg>
  );
}
