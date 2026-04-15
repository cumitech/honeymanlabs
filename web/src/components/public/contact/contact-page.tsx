import Image from "next/image";
import Link from "next/link";
import {
  Clock3,
  FlaskConical,
  Headphones,
  HeartHandshake,
  Hexagon,
  Mail,
  MapPin,
  Phone,
  Store,
  Thermometer,
} from "lucide-react";

import { ContactForm } from "@/components/public/contact/contact-form";
import { PageHero } from "@/components/public/layout/page-hero";
import { publicImages } from "@/config/public-media";
import { cn } from "@/lib/utils";

const honeyGlow =
  "shadow-[0_24px_72px_-28px_rgba(255,140,0,0.28),0_0_0_1px_rgba(129,81,0,0.06)]";

const ghostBorder = "border border-[var(--foreground)]/[0.08]";

const INQUIRY_TYPES = [
  {
    icon: Store,
    title: "Wholesale",
    description: "Export & Bulk Orders",
    href: "/products",
  },
  {
    icon: FlaskConical,
    title: "Lab Testing",
    description: "Purity Certification",
    href: "/honey-testing-lab",
  },
  {
    icon: HeartHandshake,
    title: "Partnership",
    description: "Beekeeping Collective",
    href: "#contact-form",
  },
  {
    icon: Headphones,
    title: "Support",
    description: "Customer Care",
    href: "#contact-form",
  },
] as const;

const RESPONSE_STANDARDS = [
  { title: "General inquiries", value: "within 48 hours" },
  { title: "Wholesale and partnerships", value: "within 24 hours" },
  { title: "Active order support", value: "same business day" },
] as const;

export function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-7xl bg-[#FDF9F3] dark:bg-[#14100d]">
      <PageHero
        eyebrow="Contact"
        headingId="contact-hero-heading"
        title="Reach the team"
        description="Wholesale, lab partnerships, or a question about an order—use the form or email directly. We reply in French or English, usually within two working days."
        imageSrc={publicImages.beekeeperField.src}
        imageAlt={publicImages.beekeeperField.alt}
        imagePriority
        cta={{ href: "#contact-form", label: "Send a message" }}
        ctaSecondary={{ href: "mailto:hello@honeymanlabs.com", label: "Email us" }}
      />

      <div className="px-6 py-12 md:px-10 md:py-16">
      <section className="mb-12 grid grid-cols-1 gap-4 md:mb-16 md:grid-cols-3">
        {RESPONSE_STANDARDS.map((item) => (
          <article
            key={item.title}
            className="rounded-2xl border border-border bg-card px-5 py-4 shadow-sm"
          >
            <div className="flex items-center gap-2 text-primary">
              <Clock3 className="h-4 w-4" />
              <p className="text-xs font-bold uppercase tracking-widest">{item.title}</p>
            </div>
            <p className="mt-2 font-display text-xl text-foreground">{item.value}</p>
          </article>
        ))}
      </section>

      <div className="grid min-w-0 grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
        {/* Left column — 5 / 12 */}
        <div className="min-w-0 space-y-8 lg:col-span-5">
          <div
            className={cn(
              "relative overflow-hidden rounded-xl border-none bg-[var(--surface-container-low)] p-8 md:p-10",
              honeyGlow,
            )}
          >
            <div className="pointer-events-none absolute top-0 right-0 p-8 opacity-[0.06]" aria-hidden>
              <Hexagon className="h-32 w-32 text-primary" strokeWidth={1} />
            </div>
            <h3 className="relative z-10 mb-8 font-display text-3xl font-bold text-primary">
              Our Roots
            </h3>
            <div className="relative z-10 space-y-8">
              <div className="flex items-start gap-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/15">
                  <MapPin className="h-5 w-5 text-primary" aria-hidden />
                </div>
                <div>
                  <h4 className="font-accent mb-1 text-[10px] uppercase tracking-[0.2em] text-[#9C3F00]/70">
                    Ngaoundéré HQ
                  </h4>
                  <p className="font-medium text-foreground">
                    BP 450, Adamaoua Region
                    <br />
                    Cameroon, Central Africa
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/15">
                  <Mail className="h-5 w-5 text-primary" aria-hidden />
                </div>
                <div>
                  <h4 className="font-accent mb-1 text-[10px] uppercase tracking-[0.2em] text-[#9C3F00]/70">
                    Inquiries
                  </h4>
                  <p className="font-medium text-foreground">
                    <a href="mailto:hello@honeymanlabs.com" className="hover:text-primary hover:underline">
                      hello@honeymanlabs.com
                    </a>
                    <br />
                    <a
                      href="mailto:partners@honeymanlabs.com"
                      className="hover:text-primary hover:underline"
                    >
                      partners@honeymanlabs.com
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/15">
                  <Phone className="h-5 w-5 text-primary" aria-hidden />
                </div>
                <div>
                  <h4 className="font-accent mb-1 text-[10px] uppercase tracking-[0.2em] text-[#9C3F00]/70">
                    Direct Line
                  </h4>
                  <p className="font-medium text-foreground">
                    +237 6XX XXX XXX
                    <br />
                    Mon - Fri, 8:00 - 17:00 WAT
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {INQUIRY_TYPES.map(({ icon: Icon, title, description, href }) => (
              <Link
                key={title}
                href={href}
                className={cn(
                  "group rounded-xl bg-[var(--surface-container-highest)] p-6 transition-colors",
                  ghostBorder,
                  "hover:bg-primary/10",
                )}
              >
                <Icon
                  className="mb-3 block h-7 w-7 text-primary transition-transform group-hover:scale-110"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <h5 className="text-sm font-bold text-foreground">{title}</h5>
                <p className="mt-1 text-xs text-muted-foreground">{description}</p>
              </Link>
            ))}
          </div>
        </div>

        <div
          className={cn(
            "min-w-0 w-full self-stretch rounded-xl bg-[var(--surface-container)] p-8 md:p-10 lg:col-span-7",
            honeyGlow,
          )}
        >
          <ContactForm />
        </div>
      </div>

      {/* Location */}
      <section className="mt-20 md:mt-24" aria-labelledby="location-heading">
        <div
          className={cn(
            "grid grid-cols-1 overflow-hidden rounded-xl bg-[var(--surface-container-low)] lg:grid-cols-2",
            honeyGlow,
          )}
        >
          <div className="flex flex-col justify-center p-10 md:p-12">
            <h2
              id="location-heading"
              className="mb-6 font-display text-3xl font-bold italic text-primary md:text-4xl"
            >
              Deep in the Adamaoua Highlands
            </h2>
            <p className="mb-8 leading-relaxed text-muted-foreground">
              Extraction and packing run from our Adamaoua site. If you are visiting for procurement or
              audit, email dates in advance—we block time for walk-throughs and paperwork review.
            </p>
            <div className="flex flex-wrap gap-3">
              <div
                className={cn(
                  "flex items-center gap-2 rounded-full border border-[var(--foreground)]/[0.08] bg-[var(--surface-container-highest)]/90 px-4 py-2",
                )}
              >
                <span className="font-sans text-xs font-medium text-muted-foreground">
                  Site visits by appointment
                </span>
              </div>
              <div
                className={cn(
                  "flex items-center gap-2 rounded-full border border-[var(--foreground)]/[0.08] bg-[var(--surface-container-highest)]/90 px-4 py-2",
                )}
              >
                <Thermometer className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                <span className="font-sans text-xs font-medium text-muted-foreground">
                  Highlands climate—plan for cool nights
                </span>
              </div>
            </div>
          </div>
          <div className="group relative h-[min(400px,50vh)] min-h-[280px] lg:min-h-full lg:h-auto">
            <Image
              src={publicImages.beekeeperField.src}
              alt={publicImages.beekeeperField.alt}
              fill
              className="object-cover transition duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[var(--foreground)]/35 via-transparent to-primary/15"
              aria-hidden
            />
            <div className="pointer-events-none absolute bottom-6 left-6 z-[1] flex items-center gap-3 rounded-full bg-[var(--surface)]/90 px-4 py-2.5 shadow-md ring-1 ring-[var(--foreground)]/[0.06]">
              <MapPin className="h-5 w-5 shrink-0 text-primary" aria-hidden />
              <span className="text-xs font-medium text-foreground">Adamaoua Region</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16 md:mt-20" aria-labelledby="contact-faq-heading">
        <div className="rounded-2xl border border-border bg-card p-8 md:p-10">
          <h2 id="contact-faq-heading" className="font-display text-3xl text-foreground md:text-4xl">
            Before you send a request
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <details className="rounded-xl border border-border bg-background p-4">
              <summary className="cursor-pointer font-medium text-foreground">
                Can you handle mixed wholesale orders?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Yes. We can structure combined lots across product lines and include consolidated quality
                documents per shipment.
              </p>
            </details>
            <details className="rounded-xl border border-border bg-background p-4">
              <summary className="cursor-pointer font-medium text-foreground">
                Do you provide lab certificates with shipments?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Yes. Lab verification data is shared with each qualifying batch and tied to traceability
                IDs when requested.
              </p>
            </details>
            <details className="rounded-xl border border-border bg-background p-4">
              <summary className="cursor-pointer font-medium text-foreground">
                Which language can I use for support?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                We handle support in English and French. If you prefer one language, mention it in your
                first message.
              </p>
            </details>
            <details className="rounded-xl border border-border bg-background p-4">
              <summary className="cursor-pointer font-medium text-foreground">
                How fast can a partnership intake start?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Most partnership reviews begin within one business day after your initial form submission.
              </p>
            </details>
          </div>
        </div>
      </section>
      </div>
    </main>
  );
}
