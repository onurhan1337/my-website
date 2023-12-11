import { useEffect } from "react";

export function useAnimationFrame(callback: () => void): void {
  useEffect(() => {
    let animationFrameId: number;

    const animate = (): void => {
      callback();
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Cleanup function
    return (): void => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [callback]);
}
