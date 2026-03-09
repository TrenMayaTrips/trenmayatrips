import { useState, useMemo, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Clock, User, ArrowRight, Search, ChevronDown, X, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { blogPosts, blogCategories } from "@/data/blog";
import heroBlog from "@/assets/hero-blog.jpg";
import ParallaxHero from "@/components/layout/ParallaxHero";
import GrecaDivider from "@/components/maya/GrecaDivider";
import MayaPattern from "@/components/maya/MayaPattern";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type SortOption = "recent" | "oldest" | "popular";

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("recent");
  const allArticlesRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Calculate popular tags (top 10 most used)
  const popularTags = useMemo(() => {
    const tagCount: Record<string, number> = {};
    blogPosts.forEach((post) => {
      post.tags.forEach((tag) => {
        tagCount[tag] = (tagCount[tag] || 0) + 1;
      });
    });
    return Object.entries(tagCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([tag]) => tag);
  }, []);

  const featuredPosts = blogPosts
    .filter((p) => p.featured)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  
  const nonFeaturedPosts = blogPosts.filter((p) => !p.featured);

  const filtered = useMemo(() => {
    let results = [...nonFeaturedPosts];
    
    if (selectedCategory) {
      results = results.filter((p) => p.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      results = results.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    
    // Filter by tag
    if (selectedTag) {
      results = results.filter((p) => 
        p.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase())
      );
    }
    
    // Sort results
    switch (sortBy) {
      case "recent":
        results.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
        break;
      case "oldest":
        results.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());
        break;
      case "popular":
        // Using readTime as proxy for popularity (longer articles = more engaged readers)
        results.sort((a, b) => b.readTime - a.readTime);
        break;
    }
    
    return results;
  }, [selectedCategory, searchQuery, nonFeaturedPosts, sortBy, selectedTag]);

  const scrollToAllArticles = () => {
    allArticlesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleTagClick = (tag: string, e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setSelectedTag(tag);
    scrollToAllArticles();
  };

  const clearAllFilters = () => {
    setSelectedCategory(null);
    setSelectedTag(null);
    setSearchQuery("");
  };
  
  const sortLabels: Record<SortOption, string> = {
    recent: "Más recientes",
    oldest: "Más antiguos",
    popular: "Más leídos",
  };

  return (
    <PageLayout>
      {/* Hero */}
      <ParallaxHero imageSrc={heroBlog} imageAlt="Plaza colonial en Yucatán">
        <p className="text-gold font-medium tracking-[0.3em] uppercase text-xs mb-3">Blog</p>
        <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
          Historias del Mundo Maya
        </h1>
        <p className="mt-4 text-white/80 text-base md:text-lg max-w-2xl mx-auto">
          Guías, descubrimientos y relatos para inspirar tu próxima aventura por el Tren Maya.
        </p>
      </ParallaxHero>

      <GrecaDivider variant="jade" size="md" />

      {/* Search & Categories */}
      <section className="bg-background sticky top-16 md:top-20 z-30 border-b border-border">
        <div className="container mx-auto px-4 py-4 md:py-6">
          {/* Search */}
          <div className="relative mb-4">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              placeholder="Buscar artículos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === null
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground hover:bg-muted"
              }`}
            >
              Todos
            </button>
            {blogCategories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === cat.slug
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground hover:bg-muted"
                }`}
              >
                {cat.emoji} {cat.label}
              </button>
            ))}
          </div>

          {/* Popular Tags */}
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2 mb-2">
              <Tag size={14} className="text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground">Tags populares:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all duration-200 cursor-pointer ${
                    selectedTag === tag
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary/70 text-foreground hover:bg-primary hover:text-primary-foreground"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Active Tag Filter Chip */}
          {selectedTag && (
            <div className="mt-3 flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Filtrando por:</span>
              <button
                onClick={() => setSelectedTag(null)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors"
              >
                {selectedTag}
                <X size={12} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Featured Posts (only when no filter active) */}
      {!selectedCategory && !searchQuery && !selectedTag && (
        <section className="py-10 md:py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                Artículos destacados
              </h2>
              <button
                onClick={scrollToAllArticles}
                className="hidden md:flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Ver todos <ArrowRight size={16} />
              </button>
            </div>

            {/* Mobile Carousel */}
            {isMobile ? (
              <Carousel
                opts={{ align: "start", loop: true }}
                className="w-full"
              >
                <CarouselContent className="-ml-4">
                  {featuredPosts.slice(0, 2).map((post) => {
                    const category = blogCategories.find(
                      (c) => c.slug === post.category
                    );
                    return (
                      <CarouselItem key={post.slug} className="pl-4 basis-[90%]">
                        <Link
                          to={`/blog/${post.slug}`}
                          className="block group rounded-xl overflow-hidden border-2 border-gold/30 bg-card hover:shadow-lg transition-all"
                        >
                          <div className="relative min-h-[200px] overflow-hidden">
                            <img
                              src={post.image}
                              alt={post.title}
                              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                            <div className="relative z-10 p-6 flex flex-col justify-end min-h-[200px]">
                              <p className="text-sm text-white/90 font-medium mb-2">
                                {formatDate(post.publishedAt)}
                              </p>
                              <span className="text-xs font-medium bg-gold/90 text-obsidian px-3 py-1 rounded-full w-fit mb-3">
                                ⭐ {category?.label}
                              </span>
                              <h3 className="font-heading text-lg font-bold text-white leading-tight">
                                {post.title}
                              </h3>
                            </div>
                          </div>
                          <div className="p-4">
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                              {post.excerpt}
                            </p>
                            <div className="flex items-center flex-wrap gap-x-1.5 gap-y-1 text-[13px] text-muted-foreground">
                              <span>{post.author}</span>
                              <span>·</span>
                              <span>{formatDate(post.publishedAt)}</span>
                              <span>·</span>
                              <span>{post.readTime} min lectura</span>
                            </div>
                          </div>
                        </Link>
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
                {/* Dots indicator */}
                <div className="flex justify-center gap-2 mt-4">
                  {featuredPosts.slice(0, 2).map((_, idx) => (
                    <div
                      key={idx}
                      className="w-2 h-2 rounded-full bg-primary/30"
                    />
                  ))}
                </div>
              </Carousel>
            ) : (
              /* Desktop Grid */
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {featuredPosts.slice(0, 2).map((post, i) => {
                  const category = blogCategories.find(
                    (c) => c.slug === post.category
                  );
                  return (
                    <motion.div
                      key={post.slug}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Link
                        to={`/blog/${post.slug}`}
                        className="block group rounded-xl overflow-hidden border-2 border-gold/30 bg-card hover:shadow-lg transition-all"
                      >
                        <div className="relative min-h-[180px] overflow-hidden">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                          <div className="relative z-10 p-8 flex flex-col justify-end min-h-[180px]">
                            <p className="text-sm text-white/90 font-medium mb-2">
                              {formatDate(post.publishedAt)}
                            </p>
                            <span className="text-xs font-medium bg-gold/90 text-obsidian px-3 py-1 rounded-full w-fit mb-3">
                              ⭐ Destacado · {category?.label}
                            </span>
                            <h3 className="font-heading text-xl md:text-2xl font-bold text-white leading-tight group-hover:text-gold transition-colors">
                              {post.title}
                            </h3>
                          </div>
                        </div>
                        <div className="p-6">
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center flex-wrap gap-x-1.5 gap-y-1 text-[13px] text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <User size={12} /> {post.author}
                              </span>
                              <span>·</span>
                              <span>{formatDate(post.publishedAt)}</span>
                              <span>·</span>
                              <span className="flex items-center gap-1">
                                <Clock size={12} /> {post.readTime} min
                              </span>
                            </div>
                            <ArrowRight
                              size={16}
                              className="text-primary group-hover:translate-x-1 transition-transform"
                            />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* Mobile "Ver todos" link */}
            {isMobile && (
              <button
                onClick={scrollToAllArticles}
                className="flex items-center gap-1 text-sm font-medium text-primary mx-auto mt-6"
              >
                Ver todos los artículos <ArrowRight size={16} />
              </button>
            )}
          </div>
        </section>
      )}

      {/* All Posts Grid */}
      <section ref={allArticlesRef} className="py-10 md:py-16 bg-secondary/30 scroll-mt-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
              {selectedCategory
                ? blogCategories.find((c) => c.slug === selectedCategory)
                    ?.label
                : searchQuery
                  ? "Resultados"
                  : "Todos los artículos"}
            </h2>
            <div className="flex items-center gap-3">
              <p className="text-[13px] text-muted-foreground">
                {filtered.length} artículo{filtered.length !== 1 ? "s" : ""}
              </p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary text-[13px] font-medium text-foreground hover:bg-muted transition-colors">
                    {sortLabels[sortBy]}
                    <ChevronDown size={14} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSortBy("recent")}>
                    Más recientes
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("popular")}>
                    Más leídos
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("oldest")}>
                    Más antiguos
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16">
              {selectedTag ? (
                <>
                  <p className="text-lg text-muted-foreground mb-2">
                    No hay artículos con el tag "{selectedTag}".
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Prueba con otra búsqueda.
                  </p>
                </>
              ) : (
                <p className="text-lg text-muted-foreground mb-4">
                  No se encontraron artículos.
                </p>
              )}
              <button
                onClick={clearAllFilters}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors"
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post, i) => {
                const category = blogCategories.find(
                  (c) => c.slug === post.category
                );
                return (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link
                      to={`/blog/${post.slug}`}
                      className="block group rounded-xl overflow-hidden border border-border bg-card hover:shadow-lg transition-all h-full"
                    >
                      <div className="relative min-h-[160px] overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          loading="lazy"
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        <div className="relative z-10 p-6 flex flex-col justify-end min-h-[160px]">
                          <span className="text-xs font-medium text-white/80 mb-2">
                            {category?.emoji} {category?.label}
                          </span>
                          <h3 className="font-heading text-lg font-bold text-white leading-snug group-hover:text-gold transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                        </div>
                      </div>
                      <div className="p-5">
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center flex-wrap gap-x-1.5 gap-y-1 text-[13px] text-muted-foreground">
                          <span>{post.author}</span>
                          <span>·</span>
                          <span>{formatDate(post.publishedAt)}</span>
                          <span>·</span>
                          <span>{post.readTime} min lectura</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {post.tags.slice(0, 3).map((tag) => (
                            <button
                              key={tag}
                              onClick={(e) => handleTagClick(tag, e)}
                              className={`px-2 py-0.5 text-[10px] rounded-full transition-all duration-200 cursor-pointer ${
                                selectedTag === tag
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground"
                              }`}
                            >
                              {tag}
                            </button>
                          ))}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <GrecaDivider variant="gold" size="sm" />

      {/* Newsletter CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-primary to-jade-light relative">
        <MayaPattern variant="greca" opacity={0.05} />
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            No te pierdas ninguna historia
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            Suscríbete a nuestro newsletter y recibe las mejores guías, tips y
            relatos del Mundo Maya directamente en tu correo.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="tu@email.com"
              className="flex-1 px-4 py-3 rounded-lg text-foreground bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <Button variant="cta">Suscribirse</Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Blog;
