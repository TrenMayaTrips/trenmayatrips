import { Link } from "react-router-dom";
import { Clock, User } from "lucide-react";
import { useBlogCategories, type BlogPost } from "@/hooks/useBlog";
import { Badge } from "@/components/ui/badge";

interface RelatedCardProps {
  post: BlogPost;
}

const RelatedCard = ({ post }: RelatedCardProps) => {
  const { data: blogCategories = [] } = useBlogCategories();
  const category = blogCategories.find((c) => c.slug === post.category);
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("es-MX", {
    month: "short",
    day: "numeric",
  });

  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group block rounded-xl border border-border bg-card overflow-hidden hover:shadow-lg transition-all"
    >
      <div className="aspect-video overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <div className="p-4 space-y-2">
        {category && (
          <Badge variant="secondary" className="text-[10px]">
            {category.emoji} {category.label}
          </Badge>
        )}
        <h3 className="font-heading text-sm font-bold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-2">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-3 text-[11px] text-muted-foreground pt-1">
          <span className="flex items-center gap-1">
            <User size={10} /> {post.author}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={10} /> {post.readTime} min
          </span>
          <span>{formattedDate}</span>
        </div>
      </div>
    </Link>
  );
};

export default RelatedCard;
