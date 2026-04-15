import Image from "next/image";
import Link from "next/link";

import type { ResourceArticle } from "@/content/home";

type ArticleCardProps = {
  article: ResourceArticle;
};

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link
      href={article.href}
      className="group block cursor-pointer space-y-6 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
        <Image
          src={article.imageSrc}
          alt={article.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="space-y-3">
        <span className="font-accent text-xs font-black uppercase tracking-widest text-[var(--secondary)]">
          {article.tag}
        </span>
        <h3 className="text-2xl font-bold leading-tight text-[#312E27] transition-colors [font-family:var(--font-display)] group-hover:text-[var(--primary)] md:text-3xl">
          {article.title}
        </h3>
        <p className="line-clamp-3 text-sm text-foreground/70">{article.excerpt}</p>
      </div>
    </Link>
  );
}
