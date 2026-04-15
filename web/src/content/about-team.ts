export type AboutTeamMember = {
  id: string;
  name: string;
  role: string;
  imageSrc: string;
  imageAlt: string;
  imageClassName?: string;
  stagger?: boolean;
};

export const ABOUT_TEAM: AboutTeamMember[] = [
  {
    id: "1",
    name: "Dr. Amadou Bello",
    role: "Chief Science Officer",
    imageSrc: "/images/photo-1549269459-ba9e31874ef2.jpg",
    imageAlt: "Dr. Amadou Bello in a field beekeeping setting",
  },
  {
    id: "2",
    name: "Sarah Njikam",
    role: "CEO & Ethnobotanist",
    imageSrc: "/images/photo-1590334280707-9d5e0f60a539.jpg",
    imageAlt: "Sarah Njikam with honey and comb quality samples",
    stagger: true,
  },
  {
    id: "3",
    name: "Emmanuel T.",
    role: "Director of Community",
    imageSrc: "/images/premium_photo-1664273586606-d7c9804729c2.jpg",
    imageAlt: "Emmanuel T. presenting curated premium honey",
  },
  {
    id: "4",
    name: "Lydia M.",
    role: "Creative Strategy",
    imageSrc: "/images/photo-1549269459-ba9e31874ef2.jpg",
    imageAlt: "Lydia M. in a beekeeping field portrait",
    stagger: true,
  },
];
