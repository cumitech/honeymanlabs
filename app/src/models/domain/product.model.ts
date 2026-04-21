import type { ContentLanguage } from '../common/content-language.model'

export const PRODUCT_TYPES = ['HONEY', 'HONEY_DERIVED', 'BEEKEEPING_SUPPLY', 'OTHER']

export type ProductType = (typeof PRODUCT_TYPES)[number]

export const DEFAULT_PRODUCT_TYPE: ProductType = 'HONEY'

export function parseProductType(value: string): ProductType {
  return PRODUCT_TYPES.includes(value as ProductType)
    ? (value as ProductType)
    : DEFAULT_PRODUCT_TYPE
}

export const PRODUCT_TYPE_LABELS: Record<ProductType, string> = {
  HONEY: 'Honey',
  HONEY_DERIVED: 'Honey derived',
  BEEKEEPING_SUPPLY: 'Farm & beekeeping wear / gear',
  OTHER: 'Other',
}

export const APPAREL_SIZES = ['S', 'M', 'L', 'XL', 'XXL']

export type ApparelSize = (typeof APPAREL_SIZES)[number]

export type ProductSize = {
  measurement_value: number
  net_grams: number | null
  net_milliliters: number | null
}

export function showsLitersField(type: ProductType): boolean {
  return type === 'HONEY' || type === 'HONEY_DERIVED' || type === 'OTHER'
}

export function showsWeightField(type: ProductType): boolean {
  return type === 'HONEY' || type === 'HONEY_DERIVED'
}

export function showsApparelSizeField(type: ProductType): boolean {
  return type === 'BEEKEEPING_SUPPLY'
}

export type Product = {
  id: string
  lang: ContentLanguage
  name: string
  slug: string
  description: string
  price: number
  category_id: string
  sub_category_id: string | null
  stock_quantity: number
  origin_region: string
  featured_image: string
  featuredImage?: string | null
  image?: string | null
  image_url?: string | null
  images?: Array<{ image_url?: string | null; url?: string | null; image?: string | null }>
  measurement_type: 'MASS' | 'VOLUME' | 'COUNT'
  measurement_unit: 'GRAM' | 'KILOGRAM' | 'MILLILITER' | 'LITER' | 'UNIT'
  measurement_value: number
  net_grams: number | null
  net_milliliters: number | null
  attributes: Record<string, unknown> | null
  apparel_size: ApparelSize | null
  category_code?: ProductType
  createdAt?: string
  updatedAt?: string
}

export const emptyProduct: Product = {
  id: '',
  lang: 'en',
  name: '',
  slug: '',
  description: '',
  price: 0,
  category_id: '',
  sub_category_id: null,
  stock_quantity: 0,
  origin_region: '',
  featured_image: '',
  measurement_type: 'MASS',
  measurement_unit: 'GRAM',
  measurement_value: 0,
  net_grams: null,
  net_milliliters: null,
  attributes: null,
  apparel_size: null,
  category_code: DEFAULT_PRODUCT_TYPE,
}

type ProductWriteOmit = 'id' | 'createdAt' | 'updatedAt'

export type ProductCreateBody = Omit<Product, ProductWriteOmit>
export type ProductUpdateBody = Partial<Omit<Product, ProductWriteOmit>>
