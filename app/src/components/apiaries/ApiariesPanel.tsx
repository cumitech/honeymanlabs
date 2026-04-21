import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import type MapView from 'react-native-maps'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { regionForApiaries, type ApiaryListItem } from '../../models/views/apiary-view.model'
import { fontFamily, useTheme } from '../../theme'
import { lightHaptic } from '../../utils'
import { SCROLL_END_SPACER_HEIGHT } from '../../constants/layout'
import { ApiariesMapBlock } from './ApiariesMapBlock'
import { ApiaryListCard } from './ApiaryListCard'

type ApiariesPanelProps = {
  items: ApiaryListItem[]
}

export function ApiariesPanel({ items }: ApiariesPanelProps) {
  const { theme, mode } = useTheme()
  const mapRef = React.useRef<MapView | null>(null)
  const regionRef = React.useRef(regionForApiaries([]))

  React.useEffect(() => {
    regionRef.current = regionForApiaries(items)
  }, [items])

  const accent = theme.palette.primary

  const zoomBy = (factor: number) => {
    lightHaptic()
    const r = regionRef.current
    const next = {
      ...r,
      latitudeDelta: Math.max(0.004, r.latitudeDelta * factor),
      longitudeDelta: Math.max(0.004, r.longitudeDelta * factor),
    }
    regionRef.current = next
    mapRef.current?.animateToRegion(next, 220)
  }

  return (
    <>
      <View style={styles.mapBody}>
        <ApiariesMapBlock
          items={items}
          mapRef={mapRef}
          onRegionSnapshot={snap => {
            regionRef.current = snap
          }}
        />

        <View style={styles.mapOverlay} pointerEvents="box-none">
          <View
            style={[
              styles.mapSearchPill,
              {
                backgroundColor:
                  mode === 'light' ? 'rgba(255, 255, 255, 0.92)' : 'rgba(253, 246, 234, 0.14)',
                borderColor: theme.border,
              },
            ]}
          >
            <Text style={[styles.mapSearchText, { color: theme.text.primary }]}>Search…</Text>
            <MaterialCommunityIcons name="magnify" size={20} color={accent} />
          </View>

          <View style={styles.mapControls}>
            <Pressable
              style={[
                styles.ctrlBtn,
                { backgroundColor: theme.bg.surface, borderColor: theme.border },
              ]}
              onPress={() => lightHaptic()}
            >
              <MaterialCommunityIcons name="filter-variant" size={22} color={theme.text.primary} />
            </Pressable>
            <Pressable
              style={[
                styles.ctrlBtn,
                { backgroundColor: theme.bg.surface, borderColor: theme.border },
              ]}
              onPress={() => zoomBy(0.62)}
            >
              <MaterialCommunityIcons name="plus" size={22} color={theme.text.primary} />
            </Pressable>
            <Pressable
              style={[
                styles.ctrlBtn,
                { backgroundColor: theme.bg.surface, borderColor: theme.border },
              ]}
              onPress={() => zoomBy(1.55)}
            >
              <MaterialCommunityIcons name="minus" size={22} color={theme.text.primary} />
            </Pressable>
          </View>
        </View>
      </View>

      <View style={[styles.listSection, { backgroundColor: theme.bg.surface }]}>
        <Text style={[styles.sectionTitle, { color: theme.palette.primary }]}>
          Registered Apiaries
        </Text>
        {items.map(item => (
          <ApiaryListCard key={item.id} item={item} />
        ))}
        <View style={styles.listEndSpacer} />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  mapBody: {
    height: 220,
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  mapOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-start',
  },
  mapSearchPill: {
    position: 'absolute',
    top: 10,
    left: 12,
    width: '58%',
    maxWidth: 220,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
  },
  mapSearchText: {
    fontFamily: fontFamily.sansRegular,
    fontSize: 14,
    flex: 1,
  },
  mapControls: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    gap: 8,
    alignItems: 'center',
  },
  ctrlBtn: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
  },
  listSection: {
    paddingHorizontal: 18,
    paddingTop: 22,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontFamily: fontFamily.displaySemiBold,
    fontSize: 22,
    letterSpacing: 0.2,
    marginBottom: 14,
  },
  listEndSpacer: {
    height: SCROLL_END_SPACER_HEIGHT,
  },
})
