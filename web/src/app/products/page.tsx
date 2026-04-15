import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Shop · Honeyman",
  description:
    "Browse Honeyman honey products, beekeeping tools, and lab-support essentials with clear product details and pricing.",
  alternates: {
    canonical: "/shop",
  },
};

export default function ProductsPage() {
  redirect("/shop");
}
