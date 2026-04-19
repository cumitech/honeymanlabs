import type { ImageSourcePropType } from 'react-native'
import { CONTENT_IMAGE_HONEY_JAR, CONTENT_IMAGE_IBRAHIM_APIARY } from '../constants'

export type LabFeedHeroVariant = 'sunrise' | 'amber' | 'meadow'

export type LabRecentTest = {
  id: string
  variety: string
  batchCode: string
  dateLabel: string
  cardTitle?: string
  hashtags?: string[]
  origin?: string
  status?: string
  heroVariant?: LabFeedHeroVariant
  heroImage?: ImageSourcePropType
}

export const LAB_RECENT_TESTS: LabRecentTest[] = [
  {
    id: '1',
    variety: 'Wildflower',
    batchCode: '882',
    dateLabel: 'Oct 14, 2023',
    cardTitle: 'Morning Ritual: Wildflower Reserve',
    hashtags: ['#HoneyManLab', '#WildflowerReserve'],
    origin: 'Ozark Apiaries',
    status: 'Certified',
    heroVariant: 'sunrise',
    heroImage: CONTENT_IMAGE_HONEY_JAR,
  },
  {
    id: '2',
    variety: 'Lavender',
    batchCode: '771',
    dateLabel: 'Oct 10, 2023',
    cardTitle: 'Lavender Infusion: Lab trace',
    hashtags: ['#PurityScan', '#LavenderHoney'],
    origin: 'Hill Country Co-op',
    status: 'Verified',
    heroVariant: 'amber',
    heroImage: CONTENT_IMAGE_IBRAHIM_APIARY,
  },
  {
    id: '3',
    variety: 'Acacia',
    batchCode: '665',
    dateLabel: 'Sep 28, 2023',
    cardTitle: 'Acacia & Gold: Bright finish',
    hashtags: ['#Batch665', '#HoneyManRecipes'],
    origin: 'Heartland Honey Co.',
    status: 'Certified',
    heroVariant: 'meadow',
    heroImage: CONTENT_IMAGE_HONEY_JAR,
  },
]

export type FlavorProfile = {
  floral: number
  fruity: number
  spicy: number
  woody: number
  earthy: number
}

export type LabBatchDetail = {
  batchId: string
  displayBatch: string
  flavor: FlavorProfile
  pollenPct: number
  moisturePct: number
  enzymeLabel: string
  enzymePct: number
}

const BATCH_DETAILS: Record<string, LabBatchDetail> = {
  '7721': {
    batchId: '7721',
    displayBatch: 'Batch #7721 Results',
    flavor: { floral: 0.92, fruity: 0.78, spicy: 0.35, woody: 0.55, earthy: 0.7 },
    pollenPct: 98,
    moisturePct: 17,
    enzymeLabel: 'High',
    enzymePct: 0.88,
  },
  '882': {
    batchId: '882',
    displayBatch: 'Batch #882 Results',
    flavor: { floral: 0.85, fruity: 0.72, spicy: 0.4, woody: 0.5, earthy: 0.68 },
    pollenPct: 96,
    moisturePct: 18,
    enzymeLabel: 'High',
    enzymePct: 0.82,
  },
  '771': {
    batchId: '771',
    displayBatch: 'Batch #771 Results',
    flavor: { floral: 0.88, fruity: 0.65, spicy: 0.42, woody: 0.48, earthy: 0.62 },
    pollenPct: 94,
    moisturePct: 17,
    enzymeLabel: 'High',
    enzymePct: 0.8,
  },
  '665': {
    batchId: '665',
    displayBatch: 'Batch #665 Results',
    flavor: { floral: 0.7, fruity: 0.55, spicy: 0.38, woody: 0.62, earthy: 0.58 },
    pollenPct: 91,
    moisturePct: 18,
    enzymeLabel: 'Moderate',
    enzymePct: 0.65,
  },
}

const DEFAULT_DETAIL: LabBatchDetail = {
  batchId: 'unknown',
  displayBatch: 'Batch Results',
  flavor: { floral: 0.75, fruity: 0.7, spicy: 0.4, woody: 0.5, earthy: 0.6 },
  pollenPct: 92,
  moisturePct: 18,
  enzymeLabel: 'High',
  enzymePct: 0.78,
}

export function normalizeBatchKey(raw: string): string {
  return raw.replace(/^#/, '').trim()
}

export function getLabBatchDetail(batchId: string): LabBatchDetail {
  const key = normalizeBatchKey(batchId)
  const found = BATCH_DETAILS[key]
  if (found) return found
  return {
    ...DEFAULT_DETAIL,
    batchId: key,
    displayBatch: `Batch #${key} Results`,
  }
}

export function parseBatchIdFromQr(data: string): string | null {
  const trimmed = data.trim()
  if (!trimmed) return null

  const direct = trimmed.match(/(?:batch|#)\s*(\d{3,5})/i)
  if (direct) return direct[1]

  const hashOnly = trimmed.match(/^#?(\d{3,5})$/)
  if (hashOnly) return hashOnly[1]

  try {
    const u = new URL(trimmed)
    const q =
      u.searchParams.get('batch') ?? u.searchParams.get('id') ?? u.searchParams.get('batchId')
    if (q) return normalizeBatchKey(q)
  } catch {}

  if (/^\d{3,5}$/.test(trimmed)) return trimmed

  const anyDigits = trimmed.match(/(\d{3,5})/)
  if (anyDigits) return anyDigits[1]

  return null
}
