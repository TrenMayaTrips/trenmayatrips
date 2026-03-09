import { Link } from "react-router-dom";
import { Linkedin, Twitter, Globe, ArrowRight } from "lucide-react";
import { type AuthorProfile } from "@/data/authors";

interface AuthorBoxProps {
  author: AuthorProfile;
}

const AuthorBox = ({ author }: AuthorBoxProps) => {
  const socialLinks = [
    { url: author.linkedin, icon: Linkedin, label: "LinkedIn" },
    { url: author.twitter, icon: Twitter, label: "X / Twitter" },
    { url: author.website, icon: Globe, label: "Sitio web" },
  ].filter((l) => l.url);

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    jobTitle: author.role,
    description: author.bio,
    ...(socialLinks.length > 0 && {
      sameAs: socialLinks.map((l) => l.url),
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <div className="mt-8 rounded-lg border-l-4 border-accent bg-card border border-border p-6">
        <div className="flex gap-4">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 text-lg font-bold font-heading">
            {author.initials}
          </div>

          <div className="min-w-0 space-y-2">
            <div>
              <p className="font-heading font-bold text-foreground">{author.name}</p>
              <p className="text-sm text-muted-foreground">{author.role}</p>
            </div>

            {author.bio && (
              <p className="text-sm text-muted-foreground leading-relaxed">
                {author.bio}
              </p>
            )}

            <div className="flex items-center gap-3 pt-1">
              {socialLinks.map(({ url, icon: Icon, label }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
              <Link
                to={`/blog?autor=${encodeURIComponent(author.name)}`}
                className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline ml-auto"
              >
                Ver artículos de {author.name.split(" ")[0]} <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthorBox;
