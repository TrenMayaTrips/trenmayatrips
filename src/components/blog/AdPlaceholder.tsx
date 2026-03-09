const AdPlaceholder = () => (
  <div className="rounded-xl border border-border bg-card overflow-hidden">
    <p className="text-[10px] text-muted-foreground/50 px-3 pt-2 uppercase tracking-wider">
      Publicidad
    </p>
    <div
      className="flex items-center justify-center min-h-[250px] text-muted-foreground/30 text-xs"
      aria-hidden="true"
    >
      {/* AdSense slot placeholder — replace with actual ad tag */}
      <span>Espacio publicitario</span>
    </div>
  </div>
);

export default AdPlaceholder;
