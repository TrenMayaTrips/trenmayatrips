import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description?: string;
  image?: string;
  canonical?: string;
  type?: "website" | "article";
  jsonLd?: Record<string, unknown>;
}

const SEOHead = ({ title, description, image, canonical, type = "website", jsonLd }: SEOHeadProps) => {
  useEffect(() => {
    // Title
    document.title = title;

    // Helper to set/create meta tags
    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    if (description) {
      setMeta("name", "description", description);
      setMeta("property", "og:description", description);
      setMeta("name", "twitter:description", description);
    }

    setMeta("property", "og:title", title);
    setMeta("property", "og:type", type);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:card", image ? "summary_large_image" : "summary");

    if (image) {
      setMeta("property", "og:image", image);
      setMeta("name", "twitter:image", image);
    }

    const url = canonical || window.location.href;
    setMeta("property", "og:url", url);

    // Canonical link
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", url);

    // JSON-LD
    let scriptEl = document.getElementById("seo-jsonld") as HTMLScriptElement | null;
    const ldData = jsonLd || {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Tren Maya Trips",
      url: "https://trenmayatrips.lovable.app",
      description: "Circuitos turísticos por la ruta del Tren Maya en el sureste de México.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Cancún",
        addressRegion: "Quintana Roo",
        addressCountry: "MX",
      },
    };

    if (!scriptEl) {
      scriptEl = document.createElement("script");
      scriptEl.id = "seo-jsonld";
      scriptEl.type = "application/ld+json";
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = JSON.stringify(ldData);

    return () => {
      // Cleanup JSON-LD on unmount
      const el = document.getElementById("seo-jsonld");
      if (el) el.remove();
    };
  }, [title, description, image, canonical, type, jsonLd]);

  return null;
};

export default SEOHead;
