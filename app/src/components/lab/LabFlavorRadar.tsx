import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Svg, { Line, Polygon } from 'react-native-svg'
import { LAB_FLAVOR_RADAR_CENTER_X, LAB_FLAVOR_RADAR_CENTER_Y } from '../../constants'
import type { FlavorProfile } from '../../data/lab-batches'
import { fontFamily, useTheme } from '../../theme'

const LABELS: (keyof FlavorProfile)[] = ['floral', 'fruity', 'spicy', 'woody', 'earthy']
const LABEL_DISPLAY: Record<keyof FlavorProfile, string> = {
  floral: 'Floral',
  fruity: 'Fruity',
  spicy: 'Spicy',
  woody: 'Woody',
  earthy: 'Earthy',
}

type LabFlavorRadarProps = { profile: FlavorProfile }

const CX = LAB_FLAVOR_RADAR_CENTER_X
const CY = LAB_FLAVOR_RADAR_CENTER_Y
const R = 62
const N = 5

function pointFor(index: number, radius: number) {
  const a = -Math.PI / 2 + (index * 2 * Math.PI) / N
  return { x: CX + radius * Math.cos(a), y: CY + radius * Math.sin(a) }
}

export function LabFlavorRadar({ profile }: LabFlavorRadarProps) {
  const { theme, mode } = useTheme()
  const values = LABELS.map(k => profile[k])
  const outer = LABELS.map((_, i) => pointFor(i, R))
  const outerPts = outer.map(p => `${p.x},${p.y}`).join(' ')
  const innerPts = LABELS.map((_, i) => {
    const v = values[i]
    const p = pointFor(i, R * v)
    return `${p.x},${p.y}`
  }).join(' ')

  const fillGold = mode === 'dark' ? 'rgba(255, 184, 0, 0.35)' : 'rgba(255, 165, 0, 0.38)'
  const strokeGold = theme.palette.primary

  return (
    <View style={styles.wrap}>
      <Text style={[styles.title, { color: theme.text.primary }]}>Flavor Profile</Text>
      <Svg width={200} height={190} viewBox="0 0 200 190">
        <Polygon points={outerPts} fill="none" stroke={theme.border} strokeWidth={1} />
        <Polygon
          points={LABELS.map((_, i) => pointFor(i, R * 0.55))
            .map(p => `${p.x},${p.y}`)
            .join(' ')}
          fill="none"
          stroke={theme.border}
          strokeWidth={1}
        />
        {LABELS.map((_, i) => {
          const p = pointFor(i, R)
          return (
            <Line key={i} x1={CX} y1={CY} x2={p.x} y2={p.y} stroke={theme.border} strokeWidth={1} />
          )
        })}
        <Polygon points={innerPts} fill={fillGold} stroke={strokeGold} strokeWidth={1.5} />
      </Svg>
      <View style={styles.legend}>
        {LABELS.map(k => (
          <Text key={k} style={[styles.legendItem, { color: theme.text.muted }]} numberOfLines={1}>
            {LABEL_DISPLAY[k]}
          </Text>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    marginVertical: 8,
  },
  title: {
    fontFamily: fontFamily.sansBold,
    fontSize: 15,
    marginBottom: 4,
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginTop: -8,
    paddingHorizontal: 8,
  },
  legendItem: {
    fontFamily: fontFamily.sansMedium,
    fontSize: 11,
  },
})
