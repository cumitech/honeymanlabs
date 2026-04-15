export type CommunityBenefit = {
  id: string;
  title: string;
  description: string;
};

export type CommunityEvent = {
  id: string;
  day: string;
  month: string;
  title: string;
  location: string;
  badge: string;
};

export const COMMUNITY_BENEFITS: CommunityBenefit[] = [
  {
    id: "fair-trade",
    title: "Fair trade guaranteed",
    description:
      "Access direct-to-consumer pipelines with transparent floor pricing—fewer opaque middle layers between hive and buyer.",
  },
  {
    id: "training",
    title: "Expert modern training",
    description:
      "Complimentary workshops on sustainable harvesting, hive management, and biosecurity aligned with our lab protocols.",
  },
  {
    id: "cert",
    title: "Premium certification",
    description:
      "We help partners navigate certification pathways so premium markets can trust your story and your batch data.",
  },
];

export const COMMUNITY_EVENTS: CommunityEvent[] = [
  {
    id: "queen-rearing",
    day: "12",
    month: "OCT",
    title: "Modern queen rearing techniques",
    location: "Regional hub, Yaoundé",
    badge: "15 slots left",
  },
  {
    id: "organic-cert",
    day: "28",
    month: "OCT",
    title: "Organic certification fundamentals",
    location: "Community center, Bamenda",
    badge: "Free entry",
  },
];
