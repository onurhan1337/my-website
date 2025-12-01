export function WavySeparator() {
  return (
    <div className="relative w-full my-12">
      <svg
        className="w-full h-4"
        viewBox="0 0 800 16"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,8 C20,7 40,9 60,8 C80,7 100,9 120,8 C140,7 160,9 180,8 C200,7 220,9 240,8 C260,7 280,9 300,8 C320,7 340,9 360,8 C380,7 400,9 420,8 C440,7 460,9 480,8 C500,7 520,9 540,8 C560,7 580,9 600,8 C620,7 640,9 660,8 C680,7 700,9 720,8 C740,7 760,9 780,8 C790,7.5 800,8 800,8"
          fill="none"
          stroke="hsl(var(--foreground))"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-10"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
