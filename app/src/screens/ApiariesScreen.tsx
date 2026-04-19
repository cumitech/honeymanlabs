import React from 'react'
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import type MapView from 'react-native-maps'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import type { DrawerNavigationProp } from '@react-navigation/drawer'
import { ASSET_BEE_LOGO } from '../constants'
import { APP_HEADER_TO_BODY_GAP } from '../constants/layout'
import { MOCK_APIARIES, regionForApiaries } from '../data/apiaries'
import type { RootDrawerParamList } from '../types'
import { fontFamily, useTheme } from '../theme'
import { fireLightImpact } from '../utils/safe-haptics'
import { TabPrimaryFab } from '../components/shared'
import { ApiariesMapBlock } from '../components/apiaries/ApiariesMapBlock'
import { ApiaryListCard } from '../components/apiaries/ApiaryListCard'
import { FadeInMount } from '../components/layout/FadeInMount'
import { ScreenShell } from '../components/layout/ScreenShell'
import { tabScreenHoneycomb } from '../components/layout/tabScreenHoneycombLayout'

type DrawerNav = DrawerNavigationProp<RootDrawerParamList>

export function ApiariesScreen() {
  const { theme, mode } = useTheme()
  const insets = useSafeAreaInsets()
  const navigation = useNavigation<DrawerNav>()
  const mapRef = React.useRef<MapView | null>(null)
  const regionRef = React.useRef(regionForApiaries(MOCK_APIARIES))

  const onChrome = theme.media.foreground
  const accent = theme.palette.primary

  const zoomBy = (factor: number) => {
    fireLightImpact()
    const r = regionRef.current
    const next = {
      ...r,
      latitudeDelta: Math.max(0.004, r.latitudeDelta * factor),
      longitudeDelta: Math.max(0.004, r.longitudeDelta * factor),
    }
    regionRef.current = next
    mapRef.current?.animateToRegion(next, 220)
  }

  const mapChrome = (
    <>
      <View style={[styles.topBar, { paddingTop: Math.max(insets.top, 10) }]}>
        <Pressable
          onPress={() => {
            fireLightImpact()
            navigation.navigate('Main')
          }}
          style={({ pressed }) => [styles.backHit, pressed && { opacity: 0.75 }]}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Text style={[styles.backLabel, { color: onChrome }]}>Back</Text>
        </Pressable>
        <View style={styles.brandRow}>
          <Image source={ASSET_BEE_LOGO} style={styles.beeLogo} resizeMode="contain" />
          <Text style={[styles.wordmark, { color: accent }]}>HoneyMan</Text>
        </View>
        <View style={styles.topBarSpacer} />
        <View style={styles.topBarActions}>
          <Pressable onPress={() => fireLightImpact()} hitSlop={8} accessibilityLabel="Search">
            <MaterialCommunityIcons name="magnify" size={24} color={accent} />
          </Pressable>
          <Pressable onPress={() => fireLightImpact()} hitSlop={8} accessibilityLabel="Account">
            <MaterialCommunityIcons name="account-circle-outline" size={24} color={accent} />
          </Pressable>
          <Pressable
            onPress={() => {
              fireLightImpact()
              navigation.openDrawer()
            }}
            hitSlop={8}
            accessibilityLabel="Open menu"
          >
            <MaterialCommunityIcons name="menu" size={24} color={accent} />
          </Pressable>
        </View>
      </View>

      <View style={styles.mapBody}>
        <ApiariesMapBlock
          items={MOCK_APIARIES}
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
                backgroundColor: mode === 'light' ? 'rgba(255, 255, 255, 0.92)' : 'rgba(253, 246, 234, 0.14)',
                borderColor: theme.border,
              },
            ]}
          >
            <Text style={[styles.mapSearchText, { color: theme.text.primary }]}>Search…</Text>
            <MaterialCommunityIcons name="magnify" size={20} color={accent} />
          </View>

          <View style={styles.mapControls}>
            <Pressable
              style={[styles.ctrlBtn, { backgroundColor: theme.bg.surface, borderColor: theme.border }]}
              onPress={() => fireLightImpact()}
            >
              <MaterialCommunityIcons name="filter-variant" size={22} color={theme.text.primary} />
            </Pressable>
            <Pressable
              style={[styles.ctrlBtn, { backgroundColor: theme.bg.surface, borderColor: theme.border }]}
              onPress={() => zoomBy(0.62)}
            >
              <MaterialCommunityIcons name="plus" size={22} color={theme.text.primary} />
            </Pressable>
            <Pressable
              style={[styles.ctrlBtn, { backgroundColor: theme.bg.surface, borderColor: theme.border }]}
              onPress={() => zoomBy(1.55)}
            >
              <MaterialCommunityIcons name="minus" size={22} color={theme.text.primary} />
            </Pressable>
          </View>
        </View>
      </View>
    </>
  )

  return (
    <View style={styles.root}>
      <ScreenShell
        scroll={false}
        padded={false}
        safeAreaEdges={['left', 'right', 'bottom']}
        pageHoneycombTopLeftStyle={tabScreenHoneycomb.topLeft}
        pageHoneycombBottomRightStyle={tabScreenHoneycomb.bottomRight}
        pageHoneycombCenterStyle={tabScreenHoneycomb.center}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          bounces={Platform.OS === 'ios'}
        >
          <FadeInMount>
            {mapChrome}

            <View style={[styles.listSection, { backgroundColor: theme.bg.surface }]}>
              <Text style={[styles.sectionTitle, { color: theme.palette.primary }]}>
                Registered Apiaries
              </Text>
              {MOCK_APIARIES.map(item => (
                <ApiaryListCard key={item.id} item={item} />
              ))}
              <View style={styles.listEndSpacer} />
            </View>
          </FadeInMount>
        </ScrollView>
      </ScreenShell>
      <TabPrimaryFab
        icon="plus"
        iconSize={30}
        borderRadius={16}
        accessibilityLabel="Add apiary"
        onPress={() => fireLightImpact()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingBottom: APP_HEADER_TO_BODY_GAP,
    gap: 8,
    backgroundColor: 'transparent',
  },
  backHit: {
    paddingVertical: 6,
    paddingHorizontal: 4,
    minWidth: 52,
  },
  backLabel: {
    fontFamily: fontFamily.sansMedium,
    fontSize: 15,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginLeft: 2,
    flexShrink: 0,
  },
  topBarSpacer: {
    flex: 1,
    minWidth: 0,
  },
  beeLogo: {
    width: 26,
    height: 26,
  },
  wordmark: {
    fontFamily: fontFamily.displaySemiBold,
    fontSize: 20,
    letterSpacing: 0.2,
  },
  topBarActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flexShrink: 0,
    justifyContent: 'flex-end',
  },
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
    height: 100,
  },
})
