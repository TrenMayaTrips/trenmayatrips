import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import { blogPosts, type BlogPost } from "@/data/blog";

interface SidebarPopularPostsProps {
  currentSlug: string;
}

const SidebarPopularPosts = ({ currentSlug }: SidebarPopularPostsProps) => {
  // Pick featured or first 3 posts excluding current
  const popular: BlogPost[] = blogPosts
    .filter((p) => p.slug !== currentSlug)
    .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    .slice(0, 3);

  if (popular.length === 0) return null;

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <p className="font-heading text-sm font-bold text-foreground mb-3">
        Artículos populares
      </p>
      <div className="space-y-3">
        {popular.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="group flex gap-3 items-start"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-14 h-14 rounded-lg object-cover flex-shrink-0 border border-border"
              loading="lazy"
            />
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                {post.title}
              </p>
              <span className="flex items-center gap-1 text-[11px] text-muted-foreground mt-0.5">
                <Clock size={10} /> {post.readTime} min
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SidebarPopularPosts;
