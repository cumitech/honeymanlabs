import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";

import { FooterNewsletter } from "@/components/public/layout/footer-newsletter";
import { HoneycombBg } from "@/components/public/layout/honeycomb-bg";
import { brandLogoBoxClassName } from "@/config/brand-logo";
import { footerAccentImage } from "@/config/home-section-media";
import { cn } from "@/lib/utils";

const goldHeading = "font-display text-lg text-[#B8860B] dark:text-[#D4AF37]";
const linkClass =
  "text-sm text-foreground/75 transition-colors hover:text-foreground dark:text-stone-300 dark:hover:text-[#F5E6C8]";

const footerColumns = [
  {
    title: "About",
    links: [
      { href: "/shop", label: "Products" },
      { href: "/about", label: "About us" },
      { href: "/education", label: "FAQ & guides" },
    ],
  },
  {
    title: "Services",
    links: [
      { href: "/honey-testing-lab", label: "Testing lab" },
      { href: "/beekeeping-tools", label: "Beekeeping tools" },
      { href: "/shop", label: "Store" },
    ],
  },
  {
    title: "Help",
    links: [
      { href: "/contact", label: "Contact & returns" },
      { href: "/community", label: "Community" },
      { href: "/contact", label: "Support" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/contact", label: "Terms of service" },
      { href: "/contact", label: "Privacy" },
      { href: "/contact", label: "Wholesale" },
    ],
  },
] as const;

const social = [
  { href: "https://www.youtube.com", label: "YouTube", Icon: Youtube },
  { href: "https://www.instagram.com", label: "Instagram", Icon: Instagram },
  { href: "https://www.linkedin.com", label: "LinkedIn", Icon: Linkedin },
  { href: "https://www.facebook.com", label: "Facebook", Icon: Facebook },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "relative mt-20 overflow-hidden border-t border-[#815100]/15",
        "bg-[#FDF9F3] text-foreground",
        "dark:border-[#D4AF37]/20 dark:bg-[#0a0a0a] dark:text-stone-200",
      )}
    >
      <HoneycombBg />

      <div className="relative z-[1]">
        <section
          className={cn(
            "border-b border-[#815100]/12 px-6 py-10 md:px-8 md:py-12",
            "dark:border-[#D4AF37]/15",
          )}
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-lg">
              <h2 className={cn("mb-2 text-2xl font-semibold tracking-tight md:text-3xl", goldHeading)}>
                Subscribe to our newsletter
              </h2>
              <p className="text-sm text-muted-foreground dark:text-stone-400">
                Batch releases, lab notes, and field stories—no spam, unsubscribe anytime.
              </p>
            </div>
            <FooterNewsletter />
          </div>
        </section>

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-14 md:gap-10 md:px-8 md:py-16 lg:grid-cols-12">
          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <p className={cn("mb-4 text-[11px] font-semibold uppercase tracking-[0.2em]", goldHeading)}>
                  {col.title}
                </p>
                <ul className="space-y-2.5">
                  {col.links.map((item) => (
                    <li key={`${col.title}-${item.href}-${item.label}`}>
                      <Link href={item.href} className={linkClass}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="relative flex min-h-[14rem] items-end justify-end lg:col-span-4">
            <div className="pointer-events-none absolute -right-4 bottom-0 w-[min(100%,20rem)] lg:-right-8 lg:w-[22rem]">
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src={footerAccentImage.src}
                  alt={footerAccentImage.alt}
                  fill
                  className="object-contain object-bottom"
                  sizes="(max-width: 1024px) 280px, 360px"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="relative mx-auto max-w-7xl border-t border-[#815100]/10 px-6 py-10 dark:border-[#D4AF37]/15 md:px-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
              <Link
                href="/"
                className="inline-flex items-center gap-3 outline-none ring-offset-[#FDF9F3] focus-visible:ring-2 focus-visible:ring-[#D4AF37] dark:ring-offset-[#0a0a0a]"
                aria-label="Honeyman home"
              >
                <div className={cn("relative shrink-0", brandLogoBoxClassName)}>
                  <Image src="/logo.svg" alt="" fill className="object-contain" />
                </div>
                <span className={cn("font-display text-xl tracking-wide", goldHeading)}>Honeyman</span>
              </Link>
              <div className="flex flex-wrap gap-2">
                {social.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={cn(
                      "inline-flex size-10 items-center justify-center rounded-lg border transition-colors",
                      "border-[#815100]/30 bg-[#815100]/5 text-[#815100] hover:bg-[#815100]/15",
                      "dark:border-[#D4AF37]/40 dark:bg-[#D4AF37]/10 dark:text-[#D4AF37] dark:hover:bg-[#D4AF37]/20",
                    )}
                  >
                    <Icon className="size-[18px]" aria-hidden />
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-2 text-sm text-muted-foreground dark:text-stone-400">
              <p className="flex items-start gap-2">
                <Mail className="mt-0.5 size-4 shrink-0 text-[#B8860B] dark:text-[#D4AF37]" aria-hidden />
                <a href="mailto:hello@honeymanlabs.com" className="underline-offset-4 hover:underline">
                  hello@honeymanlabs.com
                </a>
              </p>
              <p className="flex items-start gap-2">
                <Phone className="mt-0.5 size-4 shrink-0 text-[#B8860B] dark:text-[#D4AF37]" aria-hidden />
                <span>+237 (placeholder)</span>
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-[#B8860B] dark:text-[#D4AF37]" aria-hidden />
                <span>Ngaoundéré, Adamaoua · Cameroon</span>
              </p>
            </div>
          </div>

          <p className="mt-10 text-center text-xs text-muted-foreground dark:text-stone-500">
            © {year} Honeyman. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
