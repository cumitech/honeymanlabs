import React from 'react'
import { Image, type ImageStyle, StyleSheet, View } from 'react-native'
import {
  ASSET_HONEYCOMB_BOTTOM_RIGHT,
  ASSET_HONEYCOMB_CENTER,
  ASSET_HONEYCOMB_TOP_LEFT,
  PAGE_HONEYCOMB_CORNER_BLEED,
} from '../../constants'
import { useTheme } from '../../theme'

export type PageHoneycombImageStyle = ImageStyle

type PageHoneycombBackdropProps = {
  topLeftImageStyle?: PageHoneycombImageStyle
  bottomRightImageStyle?: PageHoneycombImageStyle
  centerImageStyle?: PageHoneycombImageStyle
  /** When true, the large center decoration is not drawn (avoids overlap on dense forms). */
  omitCenter?: boolean
}

export function PageHoneycombBackdrop({
  topLeftImageStyle,
  bottomRightImageStyle,
  centerImageStyle,
  omitCenter = false,
}: PageHoneycombBackdropProps) {
  const { theme } = useTheme()
  const cornerOpacity = theme.mode === 'dark' ? 0.055 : 0.075
  const cornerSecondaryOpacity = theme.mode === 'dark' ? 0.050 : 0.065
  const centerOpacity = theme.mode === 'dark' ? 0.035 : 0.050

  return (
    <View pointerEvents="none" style={styles.clip}>
      <Image
        source={ASSET_HONEYCOMB_TOP_LEFT}
        style={[topLeftImageStyle ?? styles.cornerTopLeft, { opacity: cornerOpacity }]}
        resizeMode="contain"
      />
      <Image
        source={ASSET_HONEYCOMB_BOTTOM_RIGHT}
        style={[
          bottomRightImageStyle ?? styles.cornerBottomRight,
          { opacity: cornerSecondaryOpacity },
        ]}
        resizeMode="contain"
      />
      {!omitCenter ? (
        <Image
          source={ASSET_HONEYCOMB_CENTER}
          style={[centerImageStyle ?? styles.center, { opacity: centerOpacity }]}
          resizeMode="contain"
        />
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  clip: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    overflow: 'visible',
  },
  cornerTopLeft: {
    position: 'absolute',
    top: -PAGE_HONEYCOMB_CORNER_BLEED,
    left: -PAGE_HONEYCOMB_CORNER_BLEED,
    width: '52%',
    maxWidth: 216,
    height: 260,
  },
  cornerBottomRight: {
    position: 'absolute',
    bottom: -PAGE_HONEYCOMB_CORNER_BLEED,
    right: -PAGE_HONEYCOMB_CORNER_BLEED,
    width: '56%',
    maxWidth: 232,
    height: 280,
  },
  center: {
    position: 'absolute',
    top: '18%',
    left: '6%',
    width: '88%',
    maxWidth: 400,
    height: 340,
  },
})
