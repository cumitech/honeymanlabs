/** Normalize user input and stored order codes for substring search. */
export function normalizeOrderLookup(s: string): string {
  return s.toLowerCase().replace(/#/g, '').replace(/[\s-]/g, '')
}

export function orderMatchesLookup(orderCode: string, rawQuery: string): boolean {
  const q = normalizeOrderLookup(rawQuery)
  if (!q) return true
  const code = normalizeOrderLookup(orderCode)
  return code.includes(q) || q.includes(code)
}
