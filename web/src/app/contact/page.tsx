import type { Metadata } from "next";

import { ContactPage as ContactView } from "@/components/public/contact/contact-page";

export const metadata: Metadata = {
  title: "Contact · Honeyman",
  description:
    "Reach our team in the Adamaoua Highlands — wholesale, lab partnerships, beekeeping collectives, or customer care.",
};

export default function ContactPage() {
  return <ContactView />;
}
