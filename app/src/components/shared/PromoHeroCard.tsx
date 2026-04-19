import React from 'react'
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
  type LayoutChangeEvent,
  type NativeSyntheticEvent,
  type NativeScrollEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { CATALOG_HERO_JAR_IMAGE } from '../../data/catalog'
import { fontFamily, useTheme } from '../../theme'
import { fireLightImpact } from '../../utils/safe-haptics'

export type PromoHeroCardProps = {
  title: string
  eyebrow?: string
  subtitle?: string
  ctaLabel: string
  onCtaPress: () => void
  ctaAccessibilityLabel?: string
  /** Single hero image (used when `imageSlides` is not set or has one item). */
  imageSource?: ImageSourcePropType
  /**
   * Product (or catalog) images for the hero carousel. When more than one entry,
   * the image area becomes a horizontal slider with dots under the image.
   */
  imageSlides?: ImageSourcePropType[]
  style?: StyleProp<ViewStyle>
}

export function PromoHeroCard({
  title,
  eyebrow,
  subtitle,
  ctaLabel,
  onCtaPress,
  ctaAccessibilityLabel,
  imageSource = CATALOG_HERO_JAR_IMAGE,
  imageSlides,
  style,
}: PromoHeroCardProps) {
  const { theme } = useTheme()
  const { palette, mode } = theme

  const slides = React.useMemo(() => {
    if (imageSlides && imageSlides.length > 0) return imageSlides
    return [imageSource]
  }, [imageSlides, imageSource])

  const showSlider = slides.length > 1
  const [slideIndex, setSlideIndex] = React.useState(0)
  const [imageColW, setImageColW] = React.useState(0)

  const onImageColLayout = React.useCallback((e: LayoutChangeEvent) => {
    const w = Math.round(e.nativeEvent.layout.width)
    if (w > 0) setImageColW(w)
  }, [])

  const onScrollMomentumEnd = React.useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const w = e.nativeEvent.layoutMeasurement.width
      if (w <= 0) return
      const x = e.nativeEvent.contentOffset.x
      setSlideIndex(Math.min(slides.length - 1, Math.max(0, Math.round(x / w))))
    },
    [slides.length],
  )

  const heroColors =
    mode === 'dark'
      ? (['rgba(255, 184, 0, 0.38)', 'rgba(255, 107, 0, 0.28)', 'rgba(129, 81, 0, 0.55)'] as const)
      : ([palette.surfaceContainer, 'rgba(255, 165, 0, 0.42)', palette.muted] as const)

  const onPress = () => {
    fireLightImpact()
    onCtaPress()
  }

  const slideW = imageColW > 0 ? imageColW : undefined

  return (
    <View style={[styles.wrap, style]}>
      <LinearGradient
        colors={[...heroColors]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={[styles.card, { borderColor: theme.border }]}
      >
        <View style={styles.row}>
          <View style={styles.copy}>
            {eyebrow ? (
              <Text style={[styles.eyebrow, { color: theme.text.muted }]}>{eyebrow}</Text>
            ) : null}
            <View style={styles.headlineBlock}>
              <Text style={[styles.title, { color: theme.text.primary }]}>{title}</Text>
              {subtitle ? (
                <Text style={[styles.subtitle, { color: theme.text.muted }]}>{subtitle}</Text>
              ) : null}
            </View>
            <Pressable
              onPress={onPress}
              style={[
                styles.cta,
                {
                  borderColor: theme.border,
                  backgroundColor: theme.bg.muted,
                },
              ]}
              accessibilityRole="button"
              accessibilityLabel={ctaAccessibilityLabel ?? ctaLabel}
            >
              <Text style={[styles.ctaLabel, { color: theme.text.primary }]}>{ctaLabel}</Text>
            </Pressable>
          </View>

          <View style={styles.imageCol} onLayout={onImageColLayout}>
            {showSlider && slideW ? (
              <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                decelerationRate="fast"
                onMomentumScrollEnd={onScrollMomentumEnd}
                accessibilityLabel="Featured product images"
                style={{ width: slideW }}
              >
                {slides.map((src, i) => (
                  <View key={i} style={[styles.slidePage, { width: slideW }]}>
                    <Image source={src} style={styles.jar} resizeMode="contain" />
                  </View>
                ))}
              </ScrollView>
            ) : (
              <Image source={slides[0]} style={styles.jar} resizeMode="contain" />
            )}

            {showSlider && slideW ? (
              <View style={styles.dotsUnderImage}>
                {slides.map((_, i) => (
                  <View
                    key={i}
                    style={[
                      styles.dot,
                      {
                        backgroundColor: i === slideIndex ? theme.palette.primary : theme.border,
                        width: i === slideIndex ? 8 : 6,
                        opacity: i === slideIndex ? 1 : 0.55,
                      },
                    ]}
                  />
                ))}
              </View>
            ) : null}
          </View>
        </View>
      </LinearGradient>
    </View>
  )
}

const CARD_PAD_V = 18
const CARD_PAD_H = 16
const COPY_STACK = 12
const HEADLINE_TITLE_SUB_GAP = 6
const ROW_MIN_H = 156

const styles = StyleSheet.create({
  wrap: {},
  card: {
    borderRadius: 22,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
    paddingVertical: CARD_PAD_V,
    paddingHorizontal: CARD_PAD_H,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: ROW_MIN_H,
  },
  copy: {
    flex: 1,
    paddingRight: 8,
    gap: COPY_STACK,
  },
  headlineBlock: {
    gap: HEADLINE_TITLE_SUB_GAP,
  },
  eyebrow: {
    fontFamily: fontFamily.sansMedium,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0.3,
  },
  title: {
    fontFamily: fontFamily.displaySemiBold,
    fontSize: 24,
    lineHeight: 30,
  },
  subtitle: {
    fontFamily: fontFamily.sansRegular,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.15,
  },
  cta: {
    alignSelf: 'flex-start',
    paddingHorizontal: 22,
    paddingVertical: 11,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
  },
  ctaLabel: {
    fontFamily: fontFamily.sansBold,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.2,
  },
  imageCol: {
    width: '36%',
    maxWidth: 130,
    minHeight: 140,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  slidePage: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  jar: {
    width: '100%',
    height: 150,
  },
  dotsUnderImage: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
    width: '100%',
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
})
