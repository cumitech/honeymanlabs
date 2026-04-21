import React from 'react'
import { Platform, ScrollView, StyleSheet, View } from 'react-native'
import { SafeAreaView, type Edge } from 'react-native-safe-area-context'
import { useTheme } from '../../theme'
import { ScreenHoneycombBackdrop, type ScreenHoneycombImageStyle } from './ScreenHoneycombBackdrop'

type ScreenShellProps = {
  children: React.ReactNode
  scroll?: boolean
  padded?: boolean
  scrollContentInsetAdjustmentIOS?: 'automatic' | 'never' | 'scrollableAxes' | 'always'
  safeAreaEdges?: readonly Edge[]
  screenHoneycombBackground?: boolean
  screenHoneycombTopLeftStyle?: ScreenHoneycombImageStyle
  screenHoneycombBottomRightStyle?: ScreenHoneycombImageStyle
  screenHoneycombCenterStyle?: ScreenHoneycombImageStyle
  screenHoneycombOmitCenter?: boolean
}

const DEFAULT_SAFE_AREA_EDGES: readonly Edge[] = ['top', 'right', 'left', 'bottom']

export function ScreenShell({
  children,
  scroll = false,
  padded = true,
  scrollContentInsetAdjustmentIOS,
  safeAreaEdges = DEFAULT_SAFE_AREA_EDGES,
  screenHoneycombBackground = true,
  screenHoneycombTopLeftStyle,
  screenHoneycombBottomRightStyle,
  screenHoneycombCenterStyle,
  screenHoneycombOmitCenter = false,
}: ScreenShellProps) {
  const { theme } = useTheme()
  const iosInsetBehavior = scrollContentInsetAdjustmentIOS ?? 'automatic'
  const content = scroll ? (
    <ScrollView
      contentContainerStyle={[styles.content, padded && styles.padded]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
      alwaysBounceVertical={Platform.OS === 'ios'}
      bounces={Platform.OS === 'ios'}
      {...(Platform.OS === 'ios' ? { contentInsetAdjustmentBehavior: iosInsetBehavior } : {})}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.content, padded && styles.padded]}>{children}</View>
  )

  return (
    <View style={[styles.outer, { backgroundColor: theme.bg.surface }]}>
      {screenHoneycombBackground ? (
        <View style={styles.backdropHost} pointerEvents="none">
          <ScreenHoneycombBackdrop
            topLeftImageStyle={screenHoneycombTopLeftStyle}
            bottomRightImageStyle={screenHoneycombBottomRightStyle}
            centerImageStyle={screenHoneycombCenterStyle}
            omitCenter={screenHoneycombOmitCenter}
          />
        </View>
      ) : null}
      <SafeAreaView className="flex-1" style={styles.safeContent} edges={safeAreaEdges}>
        {content}
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    overflow: 'visible',
  },
  backdropHost: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    overflow: 'visible',
  },
  safeContent: { flex: 1, overflow: 'visible', backgroundColor: 'transparent' },
  content: { flexGrow: 1 },
  padded: { padding: 16, paddingBottom: 28 },
})
