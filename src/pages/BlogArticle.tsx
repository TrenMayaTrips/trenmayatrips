import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Clock, User, Calendar, Tag, Share2 } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { blogPosts, blogCategories } from "@/data/blog";
import { Button } from "@/components/ui/button";
import GrecaDivider from "@/components/maya/GrecaDivider";
import EstelaCard from "@/components/maya/EstelaCard";
import SEOHead from "@/components/seo/SEOHead";

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return <Navigate to="/blog" replace />;

  const category = blogCategories.find((c) => c.slug === post.category);
  const related = blogPosts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: post.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  // JSON-LD Article structured data for SEO
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: typeof post.image === "string" ? post.image : undefined,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt, // Using publishedAt as we don't have separate modifiedAt
    author: {
      "@type": "Person",
      name: post.author,
      jobTitle: post.authorRole,
    },
    publisher: {
      "@type": "Organization",
      name: "Tren Maya Trips",
      logo: {
        "@type": "ImageObject",
        url: "https://trenmayatrips.lovable.app/logo-tmt.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://trenmayatrips.lovable.app/blog/${post.slug}`,
    },
    articleSection: category?.label,
    keywords: post.tags.join(", "),
    wordCount: post.content.join(" ").split(/\s+/).length,
  };

  return (
    <PageLayout>
      <SEOHead
        title={`${post.title} | Blog Tren Maya Trips`}
        description={post.excerpt}
        canonical={`/blog/${post.slug}`}
        type="article"
      />
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {/* Hero */}
      <section className="relative pt-24 md:pt-32 pb-10 md:pb-14 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/30" />
        <div className="container mx-auto px-4 max-w-3xl relative z-10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft size={16} /> Volver al Blog
          </Link>
          <span className="inline-block text-xs font-medium bg-accent/90 text-accent-foreground px-3 py-1 rounded-full mb-4">
            {category?.emoji} {category?.label}
          </span>
          <h1 className="font-heading text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
            <span className="flex items-center gap-1.5">
              <User size={14} /> {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={14} /> {formattedDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} /> {post.readTime} min lectura
            </span>
          </div>
        </div>
      </section>

      <GrecaDivider variant="jade" size="md" />

      {/* Article Content */}
      <section className="py-10 md:py-16 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Excerpt */}
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 border-l-4 border-accent pl-6 italic">
            {post.excerpt}
          </p>

          {/* Content Blocks with inline images */}
          <div className="prose-custom space-y-6">
            {post.content.map((block, i) => {
              const inlineImage = post.contentImages?.find((img) => img.afterBlock === i);
              const lines = block.split("\n").filter(Boolean);
              return (
                <div key={i}>
                  <div className="space-y-3">
                    {lines.map((line, j) => {
                      if (line.startsWith("## ")) {
                        return (
                          <h2
                            key={j}
                            className="font-heading text-xl md:text-2xl font-bold text-foreground mt-8 mb-3"
                          >
                            {line.replace("## ", "")}
                          </h2>
                        );
                      }
                      if (line.startsWith("**") && line.endsWith("**")) {
                        return (
                          <h3
                            key={j}
                            className="font-heading text-lg font-semibold text-foreground mt-4"
                          >
                            {line.replace(/\*\*/g, "")}
                          </h3>
                        );
                      }
                      if (line.startsWith("**")) {
                        const parts = line.split("**");
                        return (
                          <p
                            key={j}
                            className="text-foreground leading-relaxed text-base"
                          >
                            <strong className="font-semibold">{parts[1]}</strong>
                            {parts[2]}
                          </p>
                        );
                      }
                      if (line.startsWith("- ")) {
                        return (
                          <li
                            key={j}
                            className="text-foreground leading-relaxed ml-4 list-disc"
                          >
                            {line.replace("- ", "")}
                          </li>
                        );
                      }
                      if (/^\d+\.\s/.test(line)) {
                        return (
                          <li
                            key={j}
                            className="text-foreground leading-relaxed ml-4 list-decimal"
                          >
                            {line.replace(/^\d+\.\s/, "")}
                          </li>
                        );
                      }
                      return (
                        <p
                          key={j}
                          className="text-foreground leading-relaxed text-base"
                        >
                          {line}
                        </p>
                      );
                    })}
                  </div>

                  {/* Inline image after this block */}
                  {inlineImage && (
                    <figure className="my-8 -mx-4 md:mx-0">
                      <div className="overflow-hidden rounded-lg md:rounded-xl border border-border shadow-sm">
                        <img
                          src={inlineImage.src}
                          alt={inlineImage.alt}
                          className="w-full h-auto object-cover max-h-[400px]"
                          loading="lazy"
                        />
                      </div>
                      {inlineImage.caption && (
                        <figcaption className="mt-3 text-sm text-muted-foreground text-center italic px-4">
                          {inlineImage.caption}
                        </figcaption>
                      )}
                    </figure>
                  )}
                </div>
              );
            })}
          </div>

          {/* Tags & Share */}
          <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <Tag size={14} className="text-muted-foreground" />
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-secondary text-foreground text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 size={14} className="mr-2" /> Compartir
            </Button>
          </div>

          {/* Author Card */}
          <EstelaCard variant="jade" className="mt-8">
            <div className="p-6 rounded-xl bg-secondary/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <User size={20} className="text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{post.author}</p>
                  <p className="text-sm text-muted-foreground">
                    {post.authorRole}
                  </p>
                </div>
              </div>
            </div>
          </EstelaCard>
        </div>
      </section>

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="py-10 md:py-16 bg-secondary/30 border-t border-border">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-8">
              Artículos relacionados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={`/blog/${r.slug}`}
                  className="group block rounded-lg border border-border bg-card p-5 hover:shadow-md transition-all"
                >
                  <h3 className="font-heading text-sm font-bold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2 mb-2">
                    {r.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {r.readTime} min · {r.author}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </PageLayout>
  );
};

export default BlogArticle;
