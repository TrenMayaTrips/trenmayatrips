import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Clock, User, ArrowRight, Search } from "lucide-react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { blogPosts, blogCategories } from "@/data/blog";
import heroBlog from "@/assets/hero-blog.jpg";

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    let results = blogPosts;
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
    return results;
  }, [selectedCategory, searchQuery]);

  const featuredPosts = blogPosts.filter((p) => p.featured);

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative pt-24 md:pt-32 pb-12 md:pb-16 min-h-[340px] md:min-h-[420px] flex items-center">
        <img src={heroBlog} alt="Plaza colonial en Yucatán" className="absolute inset-0 w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <p className="text-gold font-medium tracking-[0.3em] uppercase text-xs mb-3">
            Blog
          </p>
          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Historias del Mundo Maya
          </h1>
          <p className="mt-4 text-white/80 text-base md:text-lg max-w-2xl mx-auto">
            Guías, descubrimientos y relatos para inspirar tu próxima aventura
            por el Tren Maya.
          </p>
        </div>
      </section>

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
        </div>
      </section>

      {/* Featured Posts (only when no filter active) */}
      {!selectedCategory && !searchQuery && (
        <section className="py-10 md:py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8">
              Artículos Destacados
            </h2>
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
                      className="block group rounded-xl overflow-hidden border border-border bg-card hover:shadow-lg transition-all"
                    >
                      <div className="bg-gradient-to-br from-primary/20 to-jade-light/30 p-8 min-h-[180px] flex flex-col justify-end">
                        <span className="text-xs font-medium bg-accent/90 text-accent-foreground px-3 py-1 rounded-full w-fit mb-3">
                          {category?.emoji} {category?.label}
                        </span>
                        <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                      </div>
                      <div className="p-6">
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <User size={12} /> {post.author}
                            </span>
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
          </div>
        </section>
      )}

      {/* All Posts Grid */}
      <section className="py-10 md:py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
              {selectedCategory
                ? blogCategories.find((c) => c.slug === selectedCategory)
                    ?.label
                : searchQuery
                  ? "Resultados"
                  : "Todos los Artículos"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {filtered.length} artículo{filtered.length !== 1 ? "s" : ""}
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground mb-2">
                No se encontraron artículos.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSearchQuery("");
                }}
                className="text-primary font-medium underline underline-offset-4"
              >
                Ver todos los artículos
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
                      <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-6 min-h-[120px] flex flex-col justify-end">
                        <span className="text-xs font-medium text-muted-foreground mb-2">
                          {category?.emoji} {category?.label}
                        </span>
                        <h3 className="font-heading text-lg font-bold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                      </div>
                      <div className="p-5">
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>{post.author}</span>
                          <span>·</span>
                          <span>{post.readTime} min lectura</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 bg-secondary text-foreground text-[10px] rounded-full"
                            >
                              {tag}
                            </span>
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

      {/* Newsletter CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-primary to-jade-light">
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
            <button className="px-6 py-3 bg-accent text-accent-foreground font-semibold text-sm rounded-lg hover:bg-gold-light transition-colors">
              Suscribirse
            </button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Blog;
