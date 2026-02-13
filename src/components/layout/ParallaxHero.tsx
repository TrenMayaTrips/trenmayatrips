import { useRef, useEffect, useState, useCallback } from "react";

interface ParallaxHeroProps {
  imageSrc: string;
  imageAlt: string;
  children: React.ReactNode;
  className?: string;
  overlayClass?: string;
  speed?: number;
  eager?: boolean;
}

const ParallaxHero = ({
  imageSrc,
  imageAlt,
  children,
  className = "pt-24 md:pt-32 pb-12 md:pb-16 min-h-[340px] md:min-h-[420px]",
  overlayClass = "bg-black/45",
  speed = 0.3,
  eager = true,
}: ParallaxHeroProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  const handleScroll = useCallback(() => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setOffset(-rect.top * speed);
  }, [speed]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <section
      ref={sectionRef}
      className={`relative flex items-center overflow-hidden ${className}`}
    >
      <img
        src={imageSrc}
        alt={imageAlt}
        className="absolute inset-0 w-full h-full object-cover will-change-transform"
        loading={eager ? "eager" : "lazy"}
        style={{ transform: `translateY(${offset}px) scale(1.15)` }}
      />
      <div className={`absolute inset-0 ${overlayClass}`} />
      <div className="container mx-auto px-4 text-center relative z-10">
        {children}
      </div>
    </section>
  );
};

export default ParallaxHero;
