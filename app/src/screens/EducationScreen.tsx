import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { FadeInMount } from '../components/layout/FadeInMount'
import { ScreenShell } from '../components/layout/ScreenShell'
import { ScreenHoneyCombLayoutStyle } from '../styles/screen-honey-comb-layout.style'
import { DrawerSearchHeader, TabPrimaryFab } from '../components/shared'
import { useArticles } from '../hooks/articles/articles.hook'
import { useBeekeepers } from '../hooks/beekeepers/beekeepers.hook'
import { useTheme } from '../theme'
import { lightHaptic } from '../utils'
import { hiveLabSurfaceWashColors } from '../constants/surface-wash'
import { HiveExploreView } from '../components/hive/HiveExploreView'

export function EducationScreen() {
  const { theme, mode } = useTheme()
  const { articles: feedPosts } = useArticles()
  const { beekeepers: featuredBeekeepers } = useBeekeepers()
  const wash = hiveLabSurfaceWashColors(mode, theme.bg.surface)

  const beekeeperRailItems = React.useMemo(
    () =>
      featuredBeekeepers.map(b => ({
        id: b.id,
        caption: b.name,
        accessibilityLabel: `${b.name} profile`,
        onPress: () => lightHaptic(),
        renderDiscContent: () => (
          <Image source={b.avatar} style={StyleSheet.absoluteFillObject} resizeMode="cover" />
        ),
      })),
    [featuredBeekeepers],
  )

  return (
    <View style={styles.root}>
      <ScreenShell
        scroll
        padded={false}
        scrollContentInsetAdjustmentIOS="never"
        safeAreaEdges={['left', 'right', 'bottom']}
        screenHoneycombTopLeftStyle={ScreenHoneyCombLayoutStyle.topLeft}
        screenHoneycombBottomRightStyle={ScreenHoneyCombLayoutStyle.bottomRight}
        screenHoneycombCenterStyle={ScreenHoneyCombLayoutStyle.center}
      >
        <LinearGradient
          colors={[...wash]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.45 }}
          style={styles.wash}
        >
          <FadeInMount>
            <DrawerSearchHeader searchPlaceholder="Search The Hive…" hapticOnMenuPress={false} />
            <HiveExploreView beekeeperRailItems={beekeeperRailItems} feedPosts={feedPosts} />
          </FadeInMount>
        </LinearGradient>
      </ScreenShell>
      <TabPrimaryFab
        icon="plus"
        iconSize={30}
        accessibilityLabel="Create post"
        onPress={() => lightHaptic()}
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
})
