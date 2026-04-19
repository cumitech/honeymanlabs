import { SHOP_GRID_GAP, SHOP_GRID_HORIZONTAL_PADDING } from '../../constants'

export function shopProductCardWidth(screenWidth: number): number {
  return (screenWidth - SHOP_GRID_HORIZONTAL_PADDING * 2 - SHOP_GRID_GAP) / 2
}

export function chunkPairs<T>(items: T[]): T[][] {
  const rows: T[][] = []
  for (let i = 0; i < items.length; i += 2) {
    rows.push(items.slice(i, i + 2))
  }
  return rows
}
