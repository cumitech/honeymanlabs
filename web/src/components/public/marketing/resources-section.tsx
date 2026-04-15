import Link from "next/link";
import type { ReactNode } from "react";

import { ArticleCard, type PublicArticleCardData } from "@/components/public/article/article-card";
import { homeMarketingBand } from "@/config/home-marketing-band";
import { cn } from "@/lib/utils";

export type ResourcesSectionProps = {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  articles: PublicArticleCardData[];
  columns?: 2 | 3;
  showViewAllOnDesktop?: boolean;
  showViewAllOnMobile?: boolean;
  className?: string;
};

export function ResourcesSection({
  id,
  eyebrow,
  title,
  subtitle,
  articles,
  columns = 3,
  showViewAllOnDesktop = true,
  showViewAllOnMobile = true,
  className,
}: ResourcesSectionProps) {
  const headingId = id ? `${id}-heading` : "resources-heading";

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn(homeMarketingBand.bg, className)}
    >
      <div className="mx-auto max-w-7xl px-8 py-24">
      <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          {eyebrow ? (
            <span className="font-accent mb-4 block text-xs font-black uppercase tracking-[0.3em] text-[#9C3F00]">
              {eyebrow}
            </span>
          ) : null}
          <h2
            id={headingId}
            className="mb-2 text-4xl font-bold text-[#312E27] md:text-5xl [font-family:var(--font-display)]"
          >
            {title}
          </h2>
          {subtitle ? <p className="max-w-xl text-[#5c4a38]">{subtitle}</p> : null}
        </div>
        {showViewAllOnDesktop ? (
          <Link
            href="/blog-posts"
            className="hidden font-accent text-xs font-black uppercase tracking-[0.2em] text-[var(--primary)] transition-colors hover:text-[var(--secondary)] md:block"
          >
            View All Articles
          </Link>
        ) : null}
      </div>

      <div
        className={cn(
          "grid grid-cols-1 gap-12",
          columns === 2 ? "md:grid-cols-2" : "md:grid-cols-3",
        )}
      >
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {showViewAllOnMobile ? (
        <div className="mt-10 md:hidden">
          <Link
            href="/blog-posts"
            className="inline-flex font-accent text-xs font-black uppercase tracking-[0.2em] text-[var(--primary)] transition-colors hover:text-[var(--secondary)]"
          >
            View All Articles
          </Link>
        </div>
      ) : null}
      </div>
    </section>
  );
}
