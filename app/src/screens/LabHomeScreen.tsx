import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { FadeInMount } from '../components/layout/FadeInMount'
import { ScreenShell } from '../components/layout/ScreenShell'
import { tabScreenHoneycomb } from '../components/layout/tabScreenHoneycombLayout'
import { LabDiscoveryHeader } from '../components/lab/LabDiscoveryHeader'
import { LabFeaturedBatchesRow } from '../components/lab/LabFeaturedBatchesRow'
import { LabRecentTestCard } from '../components/lab/LabRecentTestCard'
import { LabScanFab } from '../components/lab/LabScanFab'
import { LAB_RECENT_TESTS } from '../data/lab-batches'
import { fontFamily, useTheme } from '../theme'

export function LabHomeScreen() {
  const { theme, mode } = useTheme()
  const wash =
    mode === 'dark'
      ? (['rgba(255, 184, 0, 0.12)', 'rgba(255, 107, 0, 0.06)', theme.bg.surface] as const)
      : (['rgba(255, 220, 170, 0.35)', 'rgba(255, 200, 210, 0.22)', theme.bg.surface] as const)

  return (
    <View style={styles.root}>
      <ScreenShell
        scroll
        padded={false}
        scrollContentInsetAdjustmentIOS="never"
        safeAreaEdges={['left', 'right', 'bottom']}
        pageHoneycombTopLeftStyle={tabScreenHoneycomb.topLeft}
        pageHoneycombBottomRightStyle={tabScreenHoneycomb.bottomRight}
        pageHoneycombCenterStyle={tabScreenHoneycomb.center}
      >
        <LinearGradient
          colors={[...wash]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.45 }}
          style={styles.wash}
        >
          <FadeInMount>
            <View style={styles.page}>
              <LabDiscoveryHeader />
              <View style={styles.pad}>
                <LabFeaturedBatchesRow tests={LAB_RECENT_TESTS} />
                <Text style={[styles.feedHeading, { color: theme.text.primary }]}>Lab results</Text>
                {LAB_RECENT_TESTS.map(t => (
                  <LabRecentTestCard key={t.id} test={t} />
                ))}
              </View>
              <View style={styles.scrollEndSpacer} />
            </View>
          </FadeInMount>
        </LinearGradient>
      </ScreenShell>
      <LabScanFab />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  wash: {
    flexGrow: 1,
  },
  page: {
    paddingBottom: 24,
  },
  pad: {
    paddingHorizontal: 18,
    paddingTop: 8,
  },
  feedHeading: {
    fontFamily: fontFamily.sansBold,
    fontSize: 17,
    marginTop: 22,
    marginBottom: 12,
  },
  scrollEndSpacer: {
    height: 100,
  },
})
