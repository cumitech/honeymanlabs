import Image from "next/image";
import Link from "next/link";

export default function PublicHomePage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-16 pt-14">
      <section className="relative overflow-hidden">
        <div
          className="absolute -top-28 -right-44 h-[520px] w-[520px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at center, rgba(255,184,0,0.35), rgba(255,107,0,0.12) 45%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-36 -left-56 h-[480px] w-[480px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at center, rgba(129,81,0,0.22), rgba(255,107,0,0.08) 48%, transparent 72%)",
          }}
        />

        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <div
              className={[
                "inline-flex items-center gap-3 rounded-full",
                "bg-[rgba(255,165,0,0.12)] px-4 py-2",
              ].join(" ")}
            >
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-[var(--primary)] shadow-[0_0_22px_rgba(255,165,0,0.55)]" />
              <span className="font-accent text-[0.95rem] text-[var(--accent)]">
                CERTIFIED PURE
              </span>
            </div>

            <h1 className="mt-6 text-4xl md:text-5xl font-bold leading-tight">
              <span
                className="bg-clip-text text-transparent bg-[linear-gradient(120deg,#FFB800_0%,#FF6B00_55%,#D93A00_100%)]"
                style={{ WebkitTextFillColor: "transparent" }}
              >
                Premium honey with enterprise traceability.
              </span>
            </h1>

            <p className="mt-5 text-base md:text-lg text-foreground/75 max-w-prose">
              Honeyman Labs blends artisan authenticity with verified quality
              systems, so every jar can tell its story with confidence.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/honey-testing-lab"
                className={[
                  "inline-flex items-center justify-center",
                  "rounded-xl px-5 py-3 text-sm font-semibold",
                  "bg-[linear-gradient(120deg,#FFB800_0%,#FF6B00_55%,#D93A00_100%)]",
                  "text-[#0B0B0A]",
                  "shadow-[0_20px_55px_-35px_rgba(255,107,0,0.9)]",
                  "hover:brightness-110 transition-all duration-200",
                ].join(" ")}
              >
                Explore Traceability
              </Link>

              <Link
                href="/products"
                className={[
                  "inline-flex items-center justify-center",
                  "rounded-xl px-5 py-3 text-sm font-semibold",
                  "bg-[var(--surface-container-low)]",
                  "text-foreground",
                  "shadow-[0_22px_65px_-55px_rgba(129,81,0,0.55)]",
                  "hover:bg-[var(--surface-container)] transition-colors",
                ].join(" ")}
              >
                Verified Quality
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl bg-[var(--surface-container-low)]/70 backdrop-blur-xl p-6 md:p-8 shadow-[0_55px_140px_-120px_rgba(255,165,0,0.8)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-accent text-xs text-[var(--accent)]">
                    VERIFICATION STATUS
                  </div>
                  <div className="mt-2 text-sm text-foreground/75">
                    Live batch checks with full traceability metadata.
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-[rgba(255,165,0,0.12)] px-3 py-2">
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-[var(--primary)]" />
                  <span className="font-accent text-[0.9rem] text-[var(--accent)]">
                    LIVE
                  </span>
                </div>
              </div>

              <div className="mt-6 relative mx-auto h-[220px] w-[220px] md:h-[260px] md:w-[260px]">
                <Image
                  src="/logo.svg"
                  alt="Honeyman Labs logo"
                  fill
                  className="object-contain drop-shadow-[0_26px_60px_rgba(255,107,0,0.25)]"
                  priority
                />
              </div>

              <div className="mt-2 text-center text-xs text-foreground/65">
                Warm editorial identity, engineered for clarity.
              </div>
            </div>

            <div
              className="hidden md:block absolute -top-8 -left-8 h-24 w-24 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(255,184,0,0.45), rgba(255,107,0,0.10) 55%, transparent 70%)",
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

