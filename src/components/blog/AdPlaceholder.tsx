interface AdPlaceholderProps {
  variant?: "square" | "horizontal";
}

const AdPlaceholder = ({ variant = "square" }: AdPlaceholderProps) => (
  <div className="rounded-xl border border-border bg-card overflow-hidden">
    <p className="text-[10px] text-muted-foreground/50 px-3 pt-2 uppercase tracking-wider">
      Publicidad
    </p>
    <div
      className={`flex items-center justify-center text-muted-foreground/30 text-xs ${
        variant === "horizontal" ? "min-h-[90px]" : "min-h-[250px]"
      }`}
      aria-hidden="true"
    >
      <span>Espacio publicitario</span>
    </div>
  </div>
);

export default AdPlaceholder;
