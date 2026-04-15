export function toNumber(value: number | string | null | undefined): number | null {
  if (value === null || value === undefined || value === "") return null;
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : null;
}

export function formatLiters(value: number): string {
  if (!Number.isFinite(value)) return "—";
  return `${new Intl.NumberFormat("en", { maximumFractionDigits: 3 }).format(value)} L`;
}

export function formatKgFromGrams(grams: number): string {
  const kg = grams / 1000;
  if (!Number.isFinite(kg)) return "—";
  return `${new Intl.NumberFormat("en", { maximumFractionDigits: 3 }).format(kg)} kg`;
}
