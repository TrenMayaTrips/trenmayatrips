import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface EstelaCardProps {
  children: ReactNode;
  className?: string;
  variant?: "jade" | "gold";
}

/**
 * Card with estela-tallada (carved stela) inspired border.
 * Double border with stepped corner accents evoking stone inscriptions.
 */
const EstelaCard = ({ children, className, variant = "jade" }: EstelaCardProps) => {
  const borderColor = variant === "jade" ? "border-primary/20" : "border-accent/25";
  const cornerColor = variant === "jade" ? "bg-primary/15" : "bg-accent/20";

  return (
    <div className={cn("relative", className)}>
      {/* Outer border frame */}
      <div className={cn("absolute inset-0 border-2 rounded-xl", borderColor)} />
      {/* Inner border for double-frame effect */}
      <div className={cn("absolute inset-[3px] border rounded-lg", borderColor)} />

      {/* Corner accents — stepped squares at each corner */}
      <div className={cn("absolute -top-[2px] -left-[2px] w-3 h-3", cornerColor)} style={{ clipPath: "polygon(0 0, 100% 0, 100% 33%, 33% 33%, 33% 100%, 0 100%)" }} />
      <div className={cn("absolute -top-[2px] -right-[2px] w-3 h-3", cornerColor)} style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 66% 100%, 66% 33%, 0 33%)" }} />
      <div className={cn("absolute -bottom-[2px] -left-[2px] w-3 h-3", cornerColor)} style={{ clipPath: "polygon(0 0, 33% 0, 33% 66%, 100% 66%, 100% 100%, 0 100%)" }} />
      <div className={cn("absolute -bottom-[2px] -right-[2px] w-3 h-3", cornerColor)} style={{ clipPath: "polygon(66% 0, 100% 0, 100% 100%, 0 100%, 0 66%, 66% 66%)" }} />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default EstelaCard;
