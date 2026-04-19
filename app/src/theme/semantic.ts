import { tokens, type ThemeMode } from './tokens'

export function createSemanticTheme(mode: ThemeMode) {
  const palette = tokens.colors[mode]
  return {
    mode,
    palette,
    bg: {
      surface: palette.surface,
      card: palette.surfaceContainer,
      muted: palette.muted,
    },
    text: {
      primary: palette.foreground,
      muted: palette.mutedForeground,
      onPrimary: mode === 'light' ? '#1B1200' : '#0B0B0A',
    },
    media: {
      foreground: tokens.colors.light.surface,
      foregroundMuted: 'rgba(253, 246, 234, 0.92)',
    },
    status: {
      success: palette.success,
      warning: palette.warning,
      error: palette.error,
      info: palette.info,
    },
    border: palette.border,
    spacing: tokens.spacing,
    radius: tokens.radius,
    type: tokens.typography,
  }
}

export type SemanticTheme = ReturnType<typeof createSemanticTheme>
