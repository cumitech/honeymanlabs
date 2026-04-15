export type CameroonRegionCode =
  | "AD"
  | "CE"
  | "EA"
  | "FN"
  | "LT"
  | "NO"
  | "NW"
  | "WE"
  | "SU"
  | "SW";

export const CAMEROON_REGIONS = [
  { code: "AD", name: "Adamawa", capital: "Ngaoundere" },
  { code: "CE", name: "Centre", capital: "Yaounde" },
  { code: "EA", name: "East", capital: "Bertoua" },
  { code: "FN", name: "Far North", capital: "Maroua" },
  { code: "LT", name: "Littoral", capital: "Douala" },
  { code: "NO", name: "North", capital: "Garoua" },
  { code: "NW", name: "North-West", capital: "Bamenda" },
  { code: "WE", name: "West", capital: "Bafoussam" },
  { code: "SU", name: "South", capital: "Ebolowa" },
  { code: "SW", name: "South-West", capital: "Buea" },
] as const;

export const CAMEROON_DIVISIONS_BY_REGION: Readonly<Record<CameroonRegionCode, readonly string[]>> = {
  AD: ["Djerem", "Faro et Deo", "Mayo Banyo", "Mbere", "Vina"],
  CE: [
    "Haute Sanaga",
    "Lekie",
    "Mbam et Inoubou",
    "Mbam et Kim",
    "Mefou et Afamba",
    "Mefou et Akono",
    "Mfoundi",
    "Nyong et Kelle",
    "Nyong et Mfoumou",
    "Nyong et So'o",
  ],
  EA: ["Boumba et Ngoko", "Haut Nyong", "Kadey", "Lom et Djerem"],
  FN: ["Diamare", "Logone et Chari", "Mayo Danay", "Mayo Kani", "Mayo Sava", "Mayo Tsanaga"],
  LT: ["Moungo", "Nkam", "Sanaga Maritime", "Wouri"],
  NO: ["Benoue", "Faro", "Mayo Louti", "Mayo Rey"],
  NW: ["Boyo", "Bui", "Donga Mantung", "Menchum", "Mezam", "Momo", "Ngoketunjia"],
  WE: ["Bamboutos", "Haut Nkam", "Hauts Plateaux", "Koung Khi", "Menoua", "Mifi", "Nde", "Noun"],
  SU: ["Dja et Lobo", "Mvila", "Ocean", "Vallee du Ntem"],
  SW: ["Fako", "Kupe Manenguba", "Lebialem", "Manyu", "Meme", "Ndian"],
};

export const CAMEROON_SUBDIVISIONS_BY_DIVISION: Readonly<Record<string, readonly string[]>> = {
  Vina: ["Ngaoundere 1", "Ngaoundere 2", "Ngaoundere 3", "Belel", "Martap", "Nganha"],
  "Mayo Banyo": ["Banyo", "Bankim", "Mayo Darle"],
  Mbere: ["Meiganga", "Dir", "Djohong", "Ngaoui"],
  "Mefou et Afamba": ["Mfou", "Awae", "Soa", "Esse"],
  Mfoundi: ["Yaounde 1", "Yaounde 2", "Yaounde 3", "Yaounde 4", "Yaounde 5", "Yaounde 6", "Yaounde 7"],
  Wouri: ["Douala 1", "Douala 2", "Douala 3", "Douala 4", "Douala 5"],
  Mezam: ["Bamenda 1", "Bamenda 2", "Bamenda 3", "Bali", "Tubah"],
  Fako: ["Buea", "Limbe 1", "Limbe 2", "Limbe 3", "Tiko", "Muyuka", "Idenau"],
  Meme: ["Kumba 1", "Kumba 2", "Kumba 3", "Mbonge"],
  Mvila: ["Ebolowa 1", "Ebolowa 2", "Biwong Bulu", "Mengisa"],
  Ocean: ["Kribi 1", "Kribi 2", "Akom 2", "Lokoundje"],
  Djerem: ["Tibati", "Ngaoundal"],
  "Haut Nyong": ["Abong Mbang", "Messamena", "Lomie", "Nguelemendouka"],
  "Logone et Chari": ["Kousseri", "Makary", "Fotokol", "Blangoua"],
};

export const CAMEROON_TOWNS_BY_SUBDIVISION: Readonly<Record<string, readonly string[]>> = {
  "Ngaoundere 1": ["Dang", "Sabongari", "Baladji 2"],
  "Ngaoundere 2": ["Ndelbe", "Mbideng"],
  "Ngaoundere 3": ["Beka Hossere", "Mardock"],
  Banyo: ["Banyo", "Mayo Oulo Village"],
  Bankim: ["Bankim", "Songkolong"],
  Meiganga: ["Meiganga", "Badjer", "Garga Sarali"],
  Mfou: ["Mfou", "Nkoldongo", "Nkolafamba"],
  Soa: ["Soa", "Ebang", "Nkolfoulou"],
  "Douala 1": ["Akwa", "Bonanjo", "Bonapriso"],
  "Douala 2": ["New Bell", "Nkololoun"],
  "Douala 3": ["Logbaba", "Ndogpassi"],
  "Douala 5": ["Bonamoussadi", "Makepe", "Kotto"],
  "Bamenda 1": ["Commercial Avenue", "Mankon", "Nkwen"],
  "Bamenda 2": ["Mile 3", "Ntamulung", "Alakuma"],
  Buea: ["Great Soppo", "Molyko", "Muea", "Bokwango"],
  "Limbe 1": ["Clerks Quarter", "Down Beach"],
  Tiko: ["Tiko Town", "Mutengene", "Holforth"],
  Muyuka: ["Muyuka", "Bafia", "Munyenge"],
  "Kumba 1": ["Fiango", "Njuki", "Kumba Town"],
  "Kribi 1": ["Kribi Centre", "Londji", "Mpalla"],
  "Yaounde 6": ["Biyem Assi", "Etoug Ebe"],
  Kousseri: ["Kousseri", "Hilie Alifa"],
};

export function getDivisionsByRegion(regionCode: CameroonRegionCode): readonly string[] {
  return CAMEROON_DIVISIONS_BY_REGION[regionCode] ?? [];
}

export function getSubdivisionsByDivision(division: string): readonly string[] {
  return CAMEROON_SUBDIVISIONS_BY_DIVISION[division] ?? [];
}

export function getTownsBySubdivision(subdivision: string): readonly string[] {
  return CAMEROON_TOWNS_BY_SUBDIVISION[subdivision] ?? [];
}

