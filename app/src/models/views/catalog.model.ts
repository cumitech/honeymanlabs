import type { Product } from '../domain/product.model'
import { toRemoteImageSource } from '../../utils'

export type CatalogProduct = {
  id: string
  title: string
  sizeLabel: string
  priceCfa: number
  imageUrl: string
  cardTitle: string
  cardDescription: string
}

export const emptyCatalogProduct: CatalogProduct = {
  id: '',
  title: '',
  sizeLabel: '',
  priceCfa: 0,
  imageUrl: '',
  cardTitle: '',
  cardDescription: '',
}

function sizeLabelFromProduct(product: Product): string {
  const value = Number(product.measurement_value ?? 0)
  if (!Number.isFinite(value) || value <= 0) return ''
  if (product.measurement_unit === 'GRAM') return `${Math.round(value)}g`
  if (product.measurement_unit === 'KILOGRAM') return `${value}kg`
  if (product.measurement_unit === 'MILLILITER') return `${Math.round(value)}ml`
  if (product.measurement_unit === 'LITER') return `${value}L`
  return `${Math.round(value)} unit`
}

function resolveProductImageUrl(product: Product): string | null {
  if (product.featured_image) return product.featured_image
  if (product.featuredImage) return product.featuredImage
  if (product.image_url) return product.image_url
  if (product.image) return product.image
  const firstImage = product.images?.[0]
  if (!firstImage) return null
  return firstImage.image_url ?? firstImage.url ?? firstImage.image ?? null
}

export function toCatalogProduct(product: Product): CatalogProduct {
  const resolvedImage = toRemoteImageSource(resolveProductImageUrl(product))
  return {
    id: product.id,
    title: product.name,
    sizeLabel: sizeLabelFromProduct(product),
    priceCfa: Number(product.price) || 0,
    imageUrl: typeof resolvedImage.uri === 'string' ? resolvedImage.uri : '',
    cardTitle: product.category_code ?? 'HoneyMan',
    cardDescription: product.description,
  }
}

export function formatProductTitleLine(product: CatalogProduct): string {
  return product.sizeLabel ? `${product.title}, ${product.sizeLabel}` : product.title
}

export function formatCatalogPriceCfa(amountCfa: number): string {
  const rounded = Math.round(amountCfa)
  try {
    const num = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(rounded)
    return `${num}\u00a0F\u00a0CFA`
  } catch {
    const withSpaces = rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    return `${withSpaces} F CFA`
  }
}
