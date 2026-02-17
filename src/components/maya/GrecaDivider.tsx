import { cn } from "@/lib/utils";

interface GrecaDividerProps {
  className?: string;
  variant?: "jade" | "gold" | "terracotta";
  size?: "sm" | "md" | "lg";
}

/**
 * Greca escalonada — stepped fret motif from Uxmal/Mitla architecture.
 * Renders as a repeating SVG pattern divider.
 */
const GrecaDivider = ({ className, variant = "jade", size = "md" }: GrecaDividerProps) => {
  const colorMap = {
    jade: "hsl(var(--jade))",
    gold: "hsl(var(--gold))",
    terracotta: "hsl(var(--terracotta))",
  };
  const color = colorMap[variant];
  const heights = { sm: 8, md: 12, lg: 16 };
  const h = heights[size];
  const stepW = h * 2;

  return (
    <div className={cn("w-full overflow-hidden", className)} aria-hidden="true">
      <svg
        width="100%"
        height={h}
        viewBox={`0 0 ${stepW * 6} ${h}`}
        preserveAspectRatio="xMidYMid meet"
        className="w-full"
      >
        <defs>
          <pattern id={`greca-${variant}-${size}`} x="0" y="0" width={stepW} height={h} patternUnits="userSpaceOnUse">
            {/* Stepped fret: 3 ascending steps then 3 descending */}
            <path
              d={`M0 ${h} L0 ${h * 0.66} L${stepW * 0.166} ${h * 0.66} L${stepW * 0.166} ${h * 0.33} L${stepW * 0.33} ${h * 0.33} L${stepW * 0.33} 0 L${stepW * 0.5} 0 L${stepW * 0.5} ${h * 0.33} L${stepW * 0.66} ${h * 0.33} L${stepW * 0.66} ${h * 0.66} L${stepW * 0.833} ${h * 0.66} L${stepW * 0.833} ${h} Z`}
              fill={color}
              opacity="0.15"
            />
          </pattern>
        </defs>
        <rect width="100%" height={h} fill={`url(#greca-${variant}-${size})`} />
      </svg>
    </div>
  );
};

export default GrecaDivider;
