import type { ImageSourcePropType } from 'react-native'
import { HOME_FEATURED_CATALOG_IDS } from '../constants'

export type CatalogProduct = {
  id: string
  title: string
  sizeLabel: string
  priceCfa: number
  image: ImageSourcePropType
  cardTitle: string
  cardDescription: string
}

export const CATALOG_PRODUCTS: CatalogProduct[] = [
  {
    id: '1',
    title: 'Wildflower Reserve Honey',
    sizeLabel: '500g',
    priceCfa: 27_000,
    image: require('../assets/12-oz-skep-glass-honey-jars-with-lids-case-of-12-lappesbeesupply__48006-removebg-preview.png'),
    cardTitle: 'Acacia & Gold',
    cardDescription: 'Bright, floral notes with a clean finish—perfect for tea and toast.',
  },
  {
    id: '2',
    title: 'Lavender Infused Honey',
    sizeLabel: '250g',
    priceCfa: 23_000,
    image: require('../assets/12-oz-hex-glass-jars-with-lids-case-of-12-lappesbeesupply__49004-removebg-preview.png'),
    cardTitle: 'Lavender Infusion',
    cardDescription: 'Soft lavender bouquet folded into slow-set creamed honey.',
  },
  {
    id: '3',
    title: 'Manuka Honey UMF 20+',
    sizeLabel: '340g',
    priceCfa: 72_000,
    image: require('../assets/8-oz-queenline-glass-honey-jars-with-lids-case-of-24-lappesbeesupply__36062-removebg-preview.png'),
    cardTitle: 'Manuka Reserve',
    cardDescription: 'Lab-verified potency for wellness rituals and mindful mornings.',
  },
  {
    id: '4',
    title: 'HoneyMan Tasting Flight Gift Set',
    sizeLabel: '',
    priceCfa: 51_000,
    image: require('../assets/15-oz-glass-honey-pot-jars-case-of-12-with-lids-lappesbeesupply__83280-removebg-preview.png'),
    cardTitle: 'Tasting Flight',
    cardDescription: 'Three curated jars in a keepsake box—gift-ready and memorable.',
  },
]

export function getFeaturedCatalogProducts(): CatalogProduct[] {
  return HOME_FEATURED_CATALOG_IDS.map(id => CATALOG_PRODUCTS.find(p => p.id === id)).filter(
    (p): p is CatalogProduct => p != null,
  )
}

export function formatShopProductTitleLine(product: CatalogProduct): string {
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

export const CATALOG_HERO_JAR_IMAGE = require('../assets/15-oz-glass-honey-pot-jars-case-of-12-with-lids-lappesbeesupply__83280-removebg-preview.png')
