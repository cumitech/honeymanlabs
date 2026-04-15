import { Dna, FlaskConical, GraduationCap, ShoppingBasket, type LucideIcon } from "lucide-react";

/** Same shape as hero product cards: title + accent · meta (mirrors price · meta). */
export type AuthorityPillar = {
  title: string;
  /** Bold segment before the middle dot (like product price). */
  accent: string;
  /** Segment after the dot (like product meta line). */
  meta: string;
  /** Longer description (optional; for reference / future use). */
  body: string;
  icon: LucideIcon;
  /** Destination when the pillar card is activated. */
  href: string;
};

export const AUTHORITY_PILLARS: AuthorityPillar[] = [
  {
    icon: ShoppingBasket,
    title: "Products",
    accent: "Single-origin",
    meta: "Adamaoua highlands · Coastal forests",
    body: "Ethically sourced, single-origin honey from the Adamaoua highlands to the coastal forests.",
    href: "/products",
  },
  {
    icon: FlaskConical,
    title: "Consultancy & QA",
    accent: "0% adulteration",
    meta: "Trace-to-hive transparency",
    body: "Verification processes guaranteeing 0% adulteration and 100% trace-to-hive transparency.",
    href: "/contact",
  },
  {
    icon: GraduationCap,
    title: "Education",
    accent: "Field programs",
    meta: "Sustainable techniques · Biodiversity",
    body: "Empowering local beekeepers with modern, sustainable techniques to increase biodiversity.",
    href: "/education",
  },
  {
    icon: Dna,
    title: "Research",
    accent: "Lab partnerships",
    meta: "African varieties · Medicinal mapping",
    body: "Mapping the unique medicinal properties of African honey varieties with regional labs.",
    href: "/honey-testing-lab",
  },
];
