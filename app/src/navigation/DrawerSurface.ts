import type { ThemeMode } from '../theme/tokens'

type HoneyGradientStop = {
  colors: readonly [string, string, string, string]
  locations: readonly [number, number, number, number]
  start: { x: number; y: number }
  end: { x: number; y: number }
}

export const drawerHoneyGradientStops: Record<ThemeMode, HoneyGradientStop> = {
  light: {
    colors: ['#FFF9F3', '#FDF6EA', '#F4E2C2', '#E8CFA0'],
    locations: [0, 0.35, 0.68, 1],
    start: { x: 0, y: 0 },
    end: { x: 0.85, y: 1 },
  },
  dark: {
    colors: ['#0B0907', '#141008', '#1C150C', '#261C10'],
    locations: [0, 0.38, 0.72, 1],
    start: { x: 0, y: 0 },
    end: { x: 0.9, y: 1 },
  },
}

export function drawerHoneyGradientFor(mode: ThemeMode) {
  return mode === 'dark' ? drawerHoneyGradientStops.dark : drawerHoneyGradientStops.light
}

export function drawerPanelChromeColor(mode: ThemeMode): string {
  return drawerHoneyGradientFor(mode).colors[0]
}
