type MarketingPageProps = {
  title: string;
  description?: string;
};

/**
 * Calm, minimal placeholder for marketing routes until full content ships.
 */
export function MarketingPage({ title, description }: MarketingPageProps) {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-16 md:py-20">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
        {title}
      </h1>
      {description ? (
        <p className="mt-6 text-base leading-relaxed text-foreground/70">
          {description}
        </p>
      ) : null}
    </main>
  );
}
