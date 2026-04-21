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

const defaultLabBatchDetail: LabBatchDetail = {
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
  return {
    ...defaultLabBatchDetail,
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
  } catch {
    // Ignore: value is not a valid URL.
  }
  if (/^\d{3,5}$/.test(trimmed)) return trimmed
  const anyDigits = trimmed.match(/(\d{3,5})/)
  if (anyDigits) return anyDigits[1]
  return null
}
