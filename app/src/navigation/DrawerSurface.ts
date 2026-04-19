import type { ThemeMode } from '../theme/tokens'

export const drawerHoneyGradientStops = {
  light: {
    colors: ['#FFF9F3', '#FDF6EA', '#F4E2C2', '#E8CFA0'] as const,
    locations: [0, 0.35, 0.68, 1] as const,
    start: { x: 0, y: 0 } as const,
    end: { x: 0.85, y: 1 } as const,
  },
  dark: {
    colors: ['#0B0907', '#141008', '#1C150C', '#261C10'] as const,
    locations: [0, 0.38, 0.72, 1] as const,
    start: { x: 0, y: 0 } as const,
    end: { x: 0.9, y: 1 } as const,
  },
} as const

export function drawerHoneyGradientFor(mode: ThemeMode) {
  return mode === 'dark' ? drawerHoneyGradientStops.dark : drawerHoneyGradientStops.light
}

export function drawerPanelChromeColor(mode: ThemeMode): string {
  return drawerHoneyGradientFor(mode).colors[0]
}
