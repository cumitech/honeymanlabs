import { BenefitsSection } from "@/components/public/community/benefits-section";
import { CommunityHero } from "@/components/public/community/hero";
import { PartnerForm } from "@/components/public/community/partner-form";
import { StoriesSection } from "@/components/public/community/stories-section";
import { WorkshopsSection } from "@/components/public/community/workshops-section";

export function CommunityPage() {
  return (
    <main className="flex-1 bg-[#FDF9F3] dark:bg-[#14100d]">
      <CommunityHero />
      <BenefitsSection />
      <StoriesSection />
      <WorkshopsSection />
      <PartnerForm />
    </main>
  );
}
