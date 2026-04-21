import React from 'react'
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import type { LabFeedHeroVariant, LabRecentTest } from '../../models/views/lab-feed.model'
import type { LabStackParamList } from '../../types'
import { fontFamily, useTheme, type SemanticTheme } from '../../theme'
import { lightHaptic } from '../../utils'

type LabRecentTestCardProps = { test: LabRecentTest }

function heroColors(
  variant: LabFeedHeroVariant | undefined,
  mode: 'light' | 'dark',
  p: SemanticTheme['palette'],
): readonly [string, string, string] {
  const v = variant ?? 'amber'
  if (mode === 'dark') {
    if (v === 'sunrise') {
      return ['rgba(75, 48, 28, 0.95)', 'rgba(95, 58, 32, 0.92)', 'rgba(40, 26, 16, 0.98)']
    }
    if (v === 'meadow') {
      return ['rgba(42, 52, 36, 0.95)', 'rgba(52, 62, 44, 0.92)', 'rgba(28, 34, 26, 0.98)']
    }
    return ['rgba(72, 52, 28, 0.95)', 'rgba(92, 64, 24, 0.9)', 'rgba(38, 28, 16, 0.98)']
  }
  if (v === 'sunrise') return [p.surfaceContainer, 'rgba(255, 165, 0, 0.55)', p.muted]
  if (v === 'meadow') return [p.muted, 'rgba(45, 159, 91, 0.22)', p.surfaceContainer]
  return [p.surfaceContainer, p.primary, p.muted]
}

export function LabRecentTestCard({ test }: LabRecentTestCardProps) {
  const { theme, mode } = useTheme()
  const { palette } = theme
  const navigation = useNavigation<NativeStackNavigationProp<LabStackParamList>>()
  const overlayTitle = test.cardTitle ?? `${test.variety} · Batch #${test.batchCode}`
  const tags = test.hashtags ?? [`#HoneyManLab`, `#Batch${test.batchCode}`]
  const origin = test.origin ?? 'HoneyMan'
  const status = test.status ?? 'Verified'
  const initial = test.variety.charAt(0).toUpperCase()

  const viewResults = () => {
    lightHaptic()
    navigation.navigate('LabBatchDetail', { batchId: test.batchCode })
  }

  const footerBg = theme.bg.card
  const metaColor = theme.text.muted

  return (
    <Pressable
      onPress={viewResults}
      accessibilityRole="button"
      accessibilityLabel={`Open lab results for batch ${test.batchCode}`}
      style={styles.cardWrap}
    >
      <View style={[styles.card, { backgroundColor: theme.bg.card, borderColor: theme.border }]}>
        <View style={styles.heroClip}>
          {test.heroImage ? (
            <ImageBackground
              source={test.heroImage}
              style={styles.heroImageBg}
              imageStyle={styles.heroPhoto}
              resizeMode="cover"
            >
              <LinearGradient
                colors={['transparent', 'rgba(27, 18, 0, 0.12)', 'rgba(27, 18, 0, 0.62)']}
                locations={[0, 0.45, 1]}
                style={StyleSheet.absoluteFill}
              />
              <View style={[styles.heroTextBlock, styles.heroTextOnImage]}>
                <Text
                  style={[styles.heroTitle, { color: theme.media.foreground }]}
                  numberOfLines={2}
                >
                  {overlayTitle}
                </Text>
                <Text
                  style={[styles.heroTags, { color: theme.media.foregroundMuted }]}
                  numberOfLines={1}
                >
                  {tags.join('  ')}
                </Text>
              </View>
            </ImageBackground>
          ) : (
            <LinearGradient
              colors={[...heroColors(test.heroVariant, mode, palette)]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.hero}
            >
              <LinearGradient
                colors={['transparent', 'rgba(27, 18, 0, 0.52)']}
                style={styles.heroScrim}
                start={{ x: 0.5, y: 0.35 }}
                end={{ x: 0.5, y: 1 }}
              >
                <View style={styles.heroTextBlock}>
                  <Text
                    style={[styles.heroTitle, { color: theme.media.foreground }]}
                    numberOfLines={2}
                  >
                    {overlayTitle}
                  </Text>
                  <Text
                    style={[styles.heroTags, { color: theme.media.foregroundMuted }]}
                    numberOfLines={1}
                  >
                    {tags.join('  ')}
                  </Text>
                </View>
              </LinearGradient>
            </LinearGradient>
          )}
        </View>

        <View style={[styles.footer, { backgroundColor: footerBg }]}>
          <View style={styles.footerLeft}>
            <View style={[styles.avatar, { backgroundColor: theme.bg.muted }]}>
              <Text style={[styles.avatarLetter, { color: theme.text.primary }]}>{initial}</Text>
            </View>
            <View style={styles.footerMeta}>
              <Text style={[styles.origin, { color: theme.text.primary }]} numberOfLines={1}>
                {origin}
              </Text>
              <Text style={[styles.subtle, { color: metaColor }]} numberOfLines={1}>
                {test.variety} honey
              </Text>
            </View>
          </View>
          <View style={styles.footerRight}>
            <View style={styles.stat}>
              <MaterialCommunityIcons name="shield-check-outline" size={18} color={metaColor} />
              <Text style={[styles.statText, { color: metaColor }]}>{status}</Text>
            </View>
            <View style={styles.stat}>
              <MaterialCommunityIcons name="calendar-outline" size={18} color={metaColor} />
              <Text style={[styles.statText, { color: metaColor }]}>{test.dateLabel}</Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  )
}

const R = 20

const styles = StyleSheet.create({
  cardWrap: {
    marginBottom: 18,
    borderRadius: R,
  },
  card: {
    borderRadius: R,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },
  heroClip: {
    borderTopLeftRadius: R,
    borderTopRightRadius: R,
    overflow: 'hidden',
  },
  hero: {
    minHeight: 196,
    justifyContent: 'flex-end',
  },
  heroImageBg: {
    minHeight: 208,
    justifyContent: 'flex-end',
  },
  heroPhoto: {
    borderTopLeftRadius: R,
    borderTopRightRadius: R,
  },
  heroScrim: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 48,
  },
  heroTextBlock: {
    gap: 6,
  },
  heroTextOnImage: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 40,
  },
  heroTitle: {
    fontFamily: fontFamily.displayBold,
    fontSize: 22,
    lineHeight: 28,
  },
  heroTags: {
    fontFamily: fontFamily.sansMedium,
    fontSize: 13,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 12,
  },
  footerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    minWidth: 0,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  avatarLetter: {
    fontFamily: fontFamily.displaySemiBold,
    fontSize: 18,
  },
  footerMeta: {
    flex: 1,
    minWidth: 0,
  },
  origin: {
    fontFamily: fontFamily.sansBold,
    fontSize: 14,
  },
  subtle: {
    fontFamily: fontFamily.sansRegular,
    fontSize: 12,
    marginTop: 2,
  },
  footerRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontFamily: fontFamily.sansMedium,
    fontSize: 12,
  },
})
