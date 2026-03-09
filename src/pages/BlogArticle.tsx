import { useMemo } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Clock, User, Calendar, Tag, Share2 } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { blogPosts, blogCategories } from "@/data/blog";
import { Button } from "@/components/ui/button";
import GrecaDivider from "@/components/maya/GrecaDivider";
import EstelaCard from "@/components/maya/EstelaCard";
import SEOHead from "@/components/seo/SEOHead";
import ArticleTOC, { TOCItem } from "@/components/blog/ArticleTOC";
import ArticleSidebarCTA from "@/components/blog/ArticleSidebarCTA";
import AdPlaceholder from "@/components/blog/AdPlaceholder";
import RelatedCard from "@/components/blog/RelatedCard";
import SidebarNewsletter from "@/components/blog/SidebarNewsletter";
import SidebarPopularPosts from "@/components/blog/SidebarPopularPosts";
import MobileStickyBooking from "@/components/blog/MobileStickyBooking";
import {
  getArticleContext,
  InlineRouteCTA,
  InlineExperienceCTA,
  PostArticleCTA,
} from "@/components/blog/InlineArticleCTAs";

/** Convert heading text to a URL-friendly id */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  const tocItems = useMemo<TOCItem[]>(() => {
    if (!post) return [];
    const items: TOCItem[] = [];
    for (const block of post.content) {
      for (const line of block.split("\n").filter(Boolean)) {
        if (line.startsWith("## ")) {
          const text = line.replace("## ", "");
          items.push({ id: slugify(text), text, level: 2 });
        } else if (line.startsWith("**") && line.endsWith("**")) {
          const text = line.replace(/\*\*/g, "");
          items.push({ id: slugify(text), text, level: 3 });
        }
      }
    }
    return items;
  }, [post]);

  const related = useMemo(() => {
    if (!post) return [];
    const others = blogPosts.filter((p) => p.slug !== post.slug);
    const scored = others.map((p) => {
      let score = 0;
      score += p.tags.filter((t) => post.tags.includes(t)).length * 10;
      if (p.category === post.category) score += 5;
      if (p.author === post.author) score += 2;
      score += (new Date(p.publishedAt).getTime() / 1e12);
      return { post: p, score };
    });
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, 6).map((s) => s.post);
  }, [post]);

  if (!post) return <Navigate to="/blog" replace />;

  const category = blogCategories.find((c) => c.slug === post.category);

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

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: typeof post.image === "string" ? post.image : undefined,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: { "@type": "Person", name: post.author, jobTitle: post.authorRole },
    publisher: {
      "@type": "Organization",
      name: "Tren Maya Trips",
      logo: { "@type": "ImageObject", url: "https://trenmayatrips.lovable.app/logo-tmt.png" },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://trenmayatrips.lovable.app/blog/${post.slug}`,
    },
    articleSection: category?.label,
    keywords: post.tags.join(", "),
    wordCount: post.content.join(" ").split(/\s+/).length,
  };

  const renderLine = (line: string, j: number) => {
    if (line.startsWith("## ")) {
      const text = line.replace("## ", "");
      return (
        <h2 key={j} id={slugify(text)} className="font-heading text-xl md:text-2xl font-bold text-foreground mt-8 mb-3 scroll-mt-24">
          {text}
        </h2>
      );
    }
    if (line.startsWith("**") && line.endsWith("**")) {
      const text = line.replace(/\*\*/g, "");
      return (
        <h3 key={j} id={slugify(text)} className="font-heading text-lg font-semibold text-foreground mt-4 scroll-mt-24">
          {text}
        </h3>
      );
    }
    if (line.startsWith("**")) {
      const parts = line.split("**");
      return (
        <p key={j} className="text-foreground leading-relaxed text-base">
          <strong className="font-semibold">{parts[1]}</strong>{parts[2]}
        </p>
      );
    }
    if (line.startsWith("- ")) {
      return <li key={j} className="text-foreground leading-relaxed ml-4 list-disc">{line.replace("- ", "")}</li>;
    }
    if (/^\d+\.\s/.test(line)) {
      return <li key={j} className="text-foreground leading-relaxed ml-4 list-decimal">{line.replace(/^\d+\.\s/, "")}</li>;
    }
    return <p key={j} className="text-foreground leading-relaxed text-base">{line}</p>;
  };

  // Contextual CTA data
  const articleCtx = getArticleContext(post.slug);

  // Find block indices for CTA insertion
  const h2Indices: number[] = [];
  let transportBlockIdx = -1;
  post.content.forEach((block, i) => {
    const lines = block.split("\n").filter(Boolean);
    if (lines.some((l) => l.startsWith("## "))) h2Indices.push(i);
    // Detect "Cómo Llegar" or transport-related H2
    if (lines.some((l) => /^## .*(llegar|tren maya|conectar|transporte)/i.test(l))) {
      transportBlockIdx = i;
    }
  });
  const midAdAfterBlock = h2Indices.length >= 3 ? h2Indices[Math.floor(h2Indices.length / 2)] : -1;
  // Experience CTA: between 2nd and 3rd H2 (but not same as transport or ad block)
  const experienceCtaAfterBlock = h2Indices.length >= 3 ? h2Indices[1] : -1;

  return (
    <PageLayout>
      <SEOHead
        title={`${post.title} | Blog Tren Maya Trips`}
        description={post.excerpt}
        canonical={`/blog/${post.slug}`}
        type="article"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Hero */}
      <section className="relative pt-24 md:pt-32 pb-10 md:pb-14 overflow-hidden">
        <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/30" />
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <Link to="/blog" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft size={16} /> Volver al Blog
          </Link>
          <span className="inline-block text-xs font-medium bg-accent/90 text-accent-foreground px-3 py-1 rounded-full mb-4">
            {category?.emoji} {category?.label}
          </span>
          <h1 className="font-heading text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
            <span className="flex items-center gap-1.5"><User size={14} /> {post.author}</span>
            <span className="flex items-center gap-1.5"><Calendar size={14} /> {formattedDate}</span>
            <span className="flex items-center gap-1.5"><Clock size={14} /> {post.readTime} min lectura</span>
          </div>
        </div>
      </section>

      <GrecaDivider variant="jade" size="md" />

      {/* 3-column article layout: TOC | Content | Sidebar */}
      <section className="py-10 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto lg:grid lg:grid-cols-[200px_1fr_280px] lg:gap-8 xl:grid-cols-[220px_1fr_300px] xl:gap-10">

            {/* LEFT — TOC (desktop only) */}
            <div className="hidden lg:block">
              <ArticleTOC items={tocItems} />
            </div>

            {/* CENTER — Article content */}
            <div className="min-w-0">
              {/* Excerpt */}
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 border-l-4 border-accent pl-6 italic">
                {post.excerpt}
              </p>

              {/* Content Blocks */}
              <div className="prose-custom space-y-6">
                {post.content.map((block, i) => {
                  const inlineImage = post.contentImages?.find((img) => img.afterBlock === i);
                  const lines = block.split("\n").filter(Boolean);
                  return (
                    <div key={i}>
                      <div className="space-y-3">
                        {lines.map((line, j) => renderLine(line, j))}
                      </div>
                      {inlineImage && (
                        <figure className="my-8 -mx-4 md:mx-0">
                          <div className="overflow-hidden rounded-lg md:rounded-xl border border-border shadow-sm">
                            <img src={inlineImage.src} alt={inlineImage.alt} className="w-full h-auto object-cover max-h-[400px]" loading="lazy" />
                          </div>
                          {inlineImage.caption && (
                            <figcaption className="mt-3 text-sm text-muted-foreground text-center italic px-4">{inlineImage.caption}</figcaption>
                          )}
                        </figure>
                      )}
                      {/* Mobile inline ad after mid-article H2 */}
                      {i === midAdAfterBlock && (
                        <div className="my-8 lg:hidden">
                          <AdPlaceholder />
                        </div>
                      )}
                      {/* CTA: Route — after "Cómo Llegar" section */}
                      {i === transportBlockIdx && <InlineRouteCTA ctx={articleCtx} />}
                      {/* CTA: Experience — between 2nd and 3rd H2 */}
                      {i === experienceCtaAfterBlock && i !== transportBlockIdx && (
                        <InlineExperienceCTA ctx={articleCtx} />
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
                    <span key={tag} className="px-3 py-1 bg-secondary text-foreground text-xs rounded-full">{tag}</span>
                  ))}
                </div>
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 size={14} className="mr-2" /> Compartir
                </Button>
              </div>
              {/* CTA: Post-article itinerary banner */}
              <PostArticleCTA ctx={articleCtx} />

              {/* Author Card */}
              <EstelaCard variant="jade" className="mt-8">
                <div className="p-6 rounded-xl bg-secondary/50">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <User size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{post.author}</p>
                      <p className="text-sm text-muted-foreground">{post.authorRole}</p>
                    </div>
                  </div>
                </div>
              </EstelaCard>

              {/* Mobile: Newsletter after article */}
              <div className="mt-8 lg:hidden">
                <SidebarNewsletter />
              </div>
            </div>

            {/* RIGHT — Sidebar (desktop only) */}
            <div className="hidden lg:block">
              <div className="sticky top-[100px] space-y-5 max-h-[calc(100vh-140px)] overflow-y-auto scrollbar-thin pb-4">
                <ArticleSidebarCTA postSlug={post.slug} />
                <AdPlaceholder />
                <SidebarNewsletter />
                <SidebarPopularPosts currentSlug={post.slug} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile TOC FAB */}
      <div className="lg:hidden">
        <ArticleTOC items={tocItems} />
      </div>

      {/* Mobile sticky booking bar */}
      <MobileStickyBooking postSlug={post.slug} />

      {/* AdSense #2 — In-feed before related */}
      <section className="py-6 bg-background border-t border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <AdPlaceholder variant="horizontal" />
        </div>
      </section>

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="py-10 md:py-16 bg-secondary/30 border-t border-border">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-8">
              También te puede interesar
            </h2>
            {/* Desktop: grid */}
            <div className="hidden md:grid md:grid-cols-3 gap-6">
              {related.slice(0, 3).map((r) => (
                <RelatedCard key={r.slug} post={r} />
              ))}
            </div>
            {/* Mobile: horizontal scroll */}
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory md:hidden -mx-4 px-4">
              {related.map((r) => (
                <div key={r.slug} className="min-w-[280px] snap-start">
                  <RelatedCard post={r} />
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link to="/blog">
                <Button variant="outline" size="lg">
                  Explorar todo el blog →
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}
    </PageLayout>
  );
};

export default BlogArticle;
