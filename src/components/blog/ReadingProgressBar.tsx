import { useEffect, useRef, useState, useCallback } from "react";
import { toast } from "@/hooks/use-toast";

const ReadingProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const toastShownRef = useRef(false);
  const rafRef = useRef<number>(0);

  const update = useCallback(() => {
    const articleEl = document.querySelector(".prose-custom");
    if (!articleEl) return;

    const rect = articleEl.getBoundingClientRect();
    const start = rect.top + window.scrollY;
    const end = start + rect.height;
    const scrollPos = window.scrollY + window.innerHeight * 0.15;

    if (scrollPos < start) {
      setProgress(0);
      setVisible(false);
      return;
    }

    setVisible(true);
    const pct = Math.min(100, Math.max(0, ((scrollPos - start) / (end - start)) * 100));
    setProgress(pct);

    if (pct >= 98 && !toastShownRef.current) {
      toastShownRef.current = true;
      toast({
        title: "¡Has terminado este artículo!",
        description: "¿Te resultó útil? 👍 👎",
        duration: 6000,
      });
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [update]);

  if (!visible) return null;

  return (
    <div
      className="fixed top-[64px] md:top-[72px] left-0 right-0 z-[100] h-[2px] md:h-[3px] bg-transparent pointer-events-none"
    >
      <div
        className="h-full bg-accent origin-left"
        style={{
          width: `${progress}%`,
          willChange: "width",
          transition: "width 80ms linear",
        }}
      />
    </div>
  );
};

export default ReadingProgressBar;
