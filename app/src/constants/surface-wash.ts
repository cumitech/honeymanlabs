/** Top-of-screen wash used on Hive (Education) and Lab home scroll surfaces. */
export function hiveLabSurfaceWashColors(
  mode: 'light' | 'dark',
  surfaceBg: string,
): readonly [string, string, string] {
  if (mode === 'dark') {
    return ['rgba(255, 184, 0, 0.12)', 'rgba(255, 107, 0, 0.06)', surfaceBg]
  }
  return ['rgba(255, 220, 170, 0.35)', 'rgba(255, 200, 210, 0.22)', surfaceBg]
}
