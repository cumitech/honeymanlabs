import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { FadeInMount } from '../components/layout/FadeInMount'
import { ScreenShell } from '../components/layout/ScreenShell'
import { tabScreenHoneycomb } from '../components/layout/tabScreenHoneycombLayout'
import {
  DrawerSearchHeader,
  HiveStoryCard,
  RingCaptionRail,
  TabPrimaryFab,
} from '../components/shared'
import { HIVE_FEATURED_BEEKEEPERS, HIVE_FEED_POSTS } from '../data/hive-feed'
import { fontFamily, useTheme } from '../theme'
import { fireLightImpact } from '../utils/safe-haptics'

export function EducationScreen() {
  const { theme, mode } = useTheme()
  const wash =
    mode === 'dark'
      ? (['rgba(255, 184, 0, 0.12)', 'rgba(255, 107, 0, 0.06)', theme.bg.surface] as const)
      : (['rgba(255, 220, 170, 0.35)', 'rgba(255, 200, 210, 0.22)', theme.bg.surface] as const)

  const beekeeperRailItems = React.useMemo(
    () =>
      HIVE_FEATURED_BEEKEEPERS.map(b => ({
        id: b.id,
        caption: b.name,
        accessibilityLabel: `${b.name} profile`,
        onPress: () => fireLightImpact(),
        renderDiscContent: () => (
          <Image source={b.avatar} style={StyleSheet.absoluteFillObject} resizeMode="cover" />
        ),
      })),
    [],
  )

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
              <DrawerSearchHeader searchPlaceholder="Search The Hive…" hapticOnMenuPress={false} />
              <View style={styles.pad}>
                <RingCaptionRail
                  title="Featured beekeepers"
                  itemMinWidth={78}
                  items={beekeeperRailItems}
                />
                <Text style={[styles.feedHeading, { color: theme.text.primary }]}>Community</Text>
                {HIVE_FEED_POSTS.map(post => (
                  <HiveStoryCard key={post.id} variant="feed" post={post} />
                ))}
              </View>
              <View style={styles.scrollEndSpacer} />
            </View>
          </FadeInMount>
        </LinearGradient>
      </ScreenShell>
      <TabPrimaryFab
        icon="plus"
        iconSize={30}
        accessibilityLabel="Create post"
        onPress={() => fireLightImpact()}
      />
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
    paddingTop: 0,
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
