export const MEASUREMENT_TYPES = ["MASS", "VOLUME", "COUNT"] as const;
export type MeasurementTypeValue = (typeof MEASUREMENT_TYPES)[number];

export const MEASUREMENT_UNITS = ["GRAM", "KILOGRAM", "MILLILITER", "LITER", "UNIT"] as const;
export type MeasurementUnitValue = (typeof MEASUREMENT_UNITS)[number];

export const APPAREL_SIZES = ["S", "M", "L", "XL", "XXL"] as const;
export type ApparelSizeValue = (typeof APPAREL_SIZES)[number];

export function isMeasurementType(value: unknown): value is MeasurementTypeValue {
  return typeof value === "string" && (MEASUREMENT_TYPES as readonly string[]).includes(value);
}

export function isMeasurementUnit(value: unknown): value is MeasurementUnitValue {
  return typeof value === "string" && (MEASUREMENT_UNITS as readonly string[]).includes(value);
}

export function isApparelSize(value: unknown): value is ApparelSizeValue {
  return typeof value === "string" && (APPAREL_SIZES as readonly string[]).includes(value);
}
