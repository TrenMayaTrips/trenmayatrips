import { useState } from "react";
import { Play, X } from "lucide-react";
import { cn } from "@/lib/utils";
import VideoEmbed from "@/components/ui/VideoEmbed";

interface VideoModuleProps {
  url: string;
  poster?: string;
  title?: string;
  badge?: string;
  className?: string;
}

/**
 * Non-invasive video module: shows as a compact clickable strip.
 * On click, expands inline to full video or opens a lightbox overlay.
 */
const VideoModule = ({ url, poster, title, badge, className }: VideoModuleProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Compact trigger */}
      <button
        onClick={() => setOpen(true)}
        className={cn(
          "group w-full flex items-center gap-4 p-3 rounded-xl border border-border bg-card hover:bg-secondary/50 transition-all hover:shadow-md",
          className
        )}
      >
        {/* Mini thumbnail */}
        <div className="relative w-20 h-14 rounded-lg overflow-hidden bg-muted shrink-0">
          {poster && (
            <img src={poster} alt="" className="w-full h-full object-cover" loading="lazy" />
          )}
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <Play size={16} className="text-white ml-0.5" fill="white" />
          </div>
        </div>

        {/* Text */}
        <div className="flex-1 text-left min-w-0">
          <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
            {title || "Ver video"}
          </p>
          {badge && (
            <span className="text-xs text-muted-foreground">{badge}</span>
          )}
        </div>

        {/* Play icon */}
        <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
          <Play size={16} className="text-accent ml-0.5" />
        </div>
      </button>

      {/* Lightbox overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-12 right-0 flex items-center gap-1.5 text-white/70 hover:text-white text-sm transition-colors"
              aria-label="Cerrar video"
            >
              <X size={18} />
              Cerrar
            </button>

            {/* Video */}
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <VideoEmbed url={url} poster={poster} badge={badge} />
            </div>

            {/* Title below */}
            {title && (
              <p className="text-white/60 text-sm text-center mt-3">{title}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default VideoModule;
