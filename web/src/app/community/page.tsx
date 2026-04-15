import type { Metadata } from "next";

import { CommunityPage as CommunityView } from "@/components/public/community/community-page";

export const metadata: Metadata = {
  title: "Community · Honeyman",
  description:
    "Partner benefits, field workshops, and stories from beekeepers building traceable honey with Honeyman.",
};

export default function CommunityPage() {
  return (
    <main className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[20rem] opacity-[0.08]"
        style={{
          backgroundImage: "url('/images/honeycombs-3v1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="relative z-10">
        <CommunityView />
      </div>
    </main>
  );
}
