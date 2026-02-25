import { useState, useMemo } from "react";
import { Play, X, Image } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoEmbedProps {
  url: string;
  poster?: string;
  aspectRatio?: string;
  badge?: string;
  className?: string;
  onClose?: () => void;
}

function extractYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/))([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

function extractVimeoId(url: string): string | null {
  const match = url.match(/vimeo\.com\/(\d+)/);
  return match ? match[1] : null;
}

const VideoEmbed = ({
  url,
  poster,
  aspectRatio = "16/9",
  badge,
  className,
  onClose,
}: VideoEmbedProps) => {
  const [playing, setPlaying] = useState(false);

  const embedSrc = useMemo(() => {
    const ytId = extractYouTubeId(url);
    if (ytId) return `https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`;
    const vimeoId = extractVimeoId(url);
    if (vimeoId) return `https://player.vimeo.com/video/${vimeoId}?autoplay=1`;
    return null; // MP4 or unsupported
  }, [url]);

  const isMp4 = !embedSrc;

  return (
    <div
      className={cn("relative w-full overflow-hidden bg-muted", className)}
      style={{ aspectRatio }}
    >
      {!playing ? (
        <>
          {/* Poster */}
          {poster && (
            <img
              src={poster}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
          )}

          {/* Play button */}
          <button
            onClick={() => setPlaying(true)}
            className="absolute inset-0 flex items-center justify-center group/play z-10"
            aria-label="Reproducir video"
          >
            <span className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center transition-colors group-hover/play:bg-accent/80">
              <Play size={24} className="text-white ml-0.5" fill="white" />
            </span>
          </button>

          {/* Badge */}
          {badge && (
            <span className="absolute top-3 left-3 px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full z-10">
              {badge}
            </span>
          )}
        </>
      ) : (
        <>
          {/* Video */}
          {isMp4 ? (
            <video
              src={url}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              playsInline
              controls
            />
          ) : (
            <iframe
              src={embedSrc}
              className="absolute inset-0 w-full h-full"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              title="Video"
            />
          )}

          {/* Close / back to photo */}
          {onClose && (
            <button
              onClick={() => {
                setPlaying(false);
                onClose();
              }}
              className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-medium hover:bg-black/70 transition-colors"
              aria-label="Volver a foto"
            >
              <Image size={14} />
              Foto
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default VideoEmbed;
