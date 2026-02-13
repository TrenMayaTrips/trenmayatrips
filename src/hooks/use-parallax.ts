import { useEffect, useState, useRef, useCallback } from "react";

export function useParallax(speed = 0.3) {
  const ref = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  const handleScroll = useCallback(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const scrolled = -rect.top * speed;
    setOffset(scrolled);
  }, [speed]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return { ref, offset };
}
