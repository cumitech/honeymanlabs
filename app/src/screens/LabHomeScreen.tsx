import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { FadeInMount } from '../components/layout/FadeInMount'
import { ScreenShell } from '../components/layout/ScreenShell'
import { ScreenHoneyCombLayoutStyle } from '../styles/screen-honey-comb-layout.style'
import { DrawerSearchHeader, TabPrimaryFab } from '../components/shared'
import { useLabTests } from '../hooks/lab-tests/lab-tests.hook'
import type { LabStackParamList } from '../types'
import { fontFamily, useTheme } from '../theme'
import { lightHaptic } from '../utils'
import { hiveLabSurfaceWashColors } from '../constants/surface-wash'
import { LabHomeFeed } from '../components/lab/LabHomeFeed'

const railInitialText = StyleSheet.create({
  initial: {
    fontFamily: fontFamily.displaySemiBold,
    fontSize: 22,
  },
})

export function LabHomeScreen() {
  const { theme, mode } = useTheme()
  const navigation = useNavigation<NativeStackNavigationProp<LabStackParamList>>()
  const { labTests: recentTests } = useLabTests()
  const wash = hiveLabSurfaceWashColors(mode, theme.bg.surface)

  const batchRailItems = React.useMemo(
    () =>
      recentTests.map(t => {
        const initial = t.variety.charAt(0).toUpperCase()
        return {
          id: t.id,
          caption: `#${t.batchCode}`,
          accessibilityLabel: `Open batch ${t.batchCode}`,
          discBackgroundColor: theme.bg.card,
          onPress: () => {
            lightHaptic()
            navigation.navigate('LabBatchDetail', { batchId: t.batchCode })
          },
          renderDiscContent: () => (
            <Text style={[railInitialText.initial, { color: theme.text.primary }]}>{initial}</Text>
          ),
        }
      }),
    [navigation, recentTests, theme.bg.card, theme.text.primary],
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
            <DrawerSearchHeader searchPlaceholder="Search batches, codes…" />
            <LabHomeFeed batchRailItems={batchRailItems} recentTests={recentTests} />
          </FadeInMount>
        </LinearGradient>
      </ScreenShell>
      <TabPrimaryFab
        icon="qrcode-scan"
        iconSize={28}
        accessibilityLabel="Scan QR code"
        onPress={() => {
          lightHaptic()
          navigation.navigate('LabQrScanner')
        }}
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
