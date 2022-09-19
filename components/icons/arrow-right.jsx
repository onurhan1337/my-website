export default function IconArrowRight({ size = 16, ...props }) {
  return (
    <svg
      className="ml-2"
      viewBox="0 0 24 24"
      stroke="currentColor"
      fill="none"
      width={size}
      height={size}
      {...props}
    >
      <path d="M5 12h14"></path>
      <path d="M12 5l7 7-7 7"></path>
    </svg>
  );
}
