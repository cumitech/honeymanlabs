import type { ContentLanguage } from './content-language'

export const PRODUCT_TYPES = [
  'HONEY',
  'HONEY_PRODUCTS',
  'FARM_PRODUCTS',
  'LAB_SUPPLIES',
  'OTHER',
] as const

export type ProductType = (typeof PRODUCT_TYPES)[number]

export const DEFAULT_PRODUCT_TYPE: ProductType = 'HONEY'

export function parseProductType(value: string): ProductType {
  return PRODUCT_TYPES.includes(value as ProductType)
    ? (value as ProductType)
    : DEFAULT_PRODUCT_TYPE
}

export const PRODUCT_TYPE_LABELS: Record<ProductType, string> = {
  HONEY: 'Honey (liquid)',
  HONEY_PRODUCTS: 'Honey products (spreads, creams, …)',
  FARM_PRODUCTS: 'Farm & beekeeping wear / gear',
  LAB_SUPPLIES: 'Lab supplies & consumables',
  OTHER: 'Other',
}

export const APPAREL_SIZES = ['S', 'M', 'L', 'XL', 'XXL'] as const

export type ApparelSize = (typeof APPAREL_SIZES)[number]

export type ProductSize = {
  weight_grams: number | null
  liters: number | null
}

export function showsLitersField(type: ProductType): boolean {
  return type === 'HONEY' || type === 'HONEY_PRODUCTS' || type === 'OTHER'
}

export function showsWeightField(type: ProductType): boolean {
  return type !== 'FARM_PRODUCTS'
}

export function showsApparelSizeField(type: ProductType): boolean {
  return type === 'FARM_PRODUCTS'
}

export type Product = {
  id: string
  lang: ContentLanguage
  name: string
  slug: string
  description: string
  price: number
  category: string
  stock_quantity: number
  origin_region: string
  featured_image: string
  product_type: ProductType
  weight_grams: number | null
  liters: number | null
  apparel_size: ApparelSize | null
  createdAt?: string
  updatedAt?: string
}
