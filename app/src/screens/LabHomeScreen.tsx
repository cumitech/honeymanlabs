import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { FadeInMount } from '../components/layout/FadeInMount'
import { ScreenShell } from '../components/layout/ScreenShell'
import { tabScreenHoneycomb } from '../components/layout/tabScreenHoneycombLayout'
import { LabRecentTestCard } from '../components/lab/LabRecentTestCard'
import { DrawerSearchHeader, RingCaptionRail, TabPrimaryFab } from '../components/shared'
import { LAB_RECENT_TESTS } from '../data/lab-batches'
import type { LabStackParamList } from '../types'
import { fontFamily, useTheme } from '../theme'
import { fireLightImpact } from '../utils/safe-haptics'

export function LabHomeScreen() {
  const { theme, mode } = useTheme()
  const navigation = useNavigation<NativeStackNavigationProp<LabStackParamList>>()
  const wash =
    mode === 'dark'
      ? (['rgba(255, 184, 0, 0.12)', 'rgba(255, 107, 0, 0.06)', theme.bg.surface] as const)
      : (['rgba(255, 220, 170, 0.35)', 'rgba(255, 200, 210, 0.22)', theme.bg.surface] as const)

  const batchRailItems = React.useMemo(
    () =>
      LAB_RECENT_TESTS.map(t => {
        const initial = t.variety.charAt(0).toUpperCase()
        return {
          id: t.id,
          caption: `#${t.batchCode}`,
          accessibilityLabel: `Open batch ${t.batchCode}`,
          discBackgroundColor: theme.bg.card,
          onPress: () => {
            fireLightImpact()
            navigation.navigate('LabBatchDetail', { batchId: t.batchCode })
          },
          renderDiscContent: () => (
            <Text style={[railStyles.initial, { color: theme.text.primary }]}>{initial}</Text>
          ),
        }
      }),
    [navigation, theme.bg.card, theme.text.primary],
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
              <DrawerSearchHeader searchPlaceholder="Search batches, codes…" />
              <View style={styles.pad}>
                <RingCaptionRail title="Recent batches" itemMinWidth={72} items={batchRailItems} />
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
      <TabPrimaryFab
        icon="qrcode-scan"
        iconSize={28}
        accessibilityLabel="Scan QR code"
        onPress={() => {
          fireLightImpact()
          navigation.navigate('LabQrScanner')
        }}
      />
    </View>
  )
}

const railStyles = StyleSheet.create({
  initial: {
    fontFamily: fontFamily.displaySemiBold,
    fontSize: 22,
  },
})

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
