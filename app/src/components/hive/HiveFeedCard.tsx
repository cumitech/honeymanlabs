import React from 'react'
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import type { HiveFeedPost } from '../../data/hive-feed'
import { fontFamily, useTheme } from '../../theme'
import { tokens } from '../../theme/tokens'
import { fireLightImpact } from '../../utils/safe-haptics'

type Props = { post: HiveFeedPost }

const R = 20

export function HiveFeedCard({ post }: Props) {
  const { theme, mode } = useTheme()
  const footerBg = theme.bg.card
  const metaColor = theme.text.muted
  const tags = post.hashtags.join('  ')

  return (
    <Pressable
      onPress={fireLightImpact}
      accessibilityRole="button"
      accessibilityLabel={`Story: ${post.cardTitle}`}
      style={[styles.cardWrap, tokens.shadow.md]}
    >
      <View style={[styles.card, { backgroundColor: theme.bg.card, borderColor: theme.border }]}>
        <View style={styles.heroClip}>
          <ImageBackground
            source={post.image}
            style={styles.hero}
            imageStyle={styles.heroImage}
            resizeMode="cover"
          >
            <LinearGradient
              colors={['transparent', 'rgba(27, 18, 0, 0.12)', 'rgba(27, 18, 0, 0.62)']}
              locations={[0, 0.45, 1]}
              style={StyleSheet.absoluteFill}
            />
            <View style={styles.heroTextBlock}>
              <Text style={[styles.heroTitle, { color: theme.media.foreground }]} numberOfLines={3}>
                {post.cardTitle}
              </Text>
              <Text
                style={[styles.heroTags, { color: theme.media.foregroundMuted }]}
                numberOfLines={2}
              >
                {tags}
              </Text>
            </View>
          </ImageBackground>
        </View>

        <View style={[styles.footer, { backgroundColor: footerBg }]}>
          <View style={styles.footerLeft}>
            <View style={[styles.avatar, { backgroundColor: theme.bg.muted }]}>
              <Text style={[styles.avatarLetter, { color: theme.text.primary }]}>
                {post.authorInitial}
              </Text>
            </View>
            <Text style={[styles.handle, { color: theme.text.primary }]} numberOfLines={1}>
              {post.authorHandle}
            </Text>
          </View>
          <View style={styles.footerRight}>
            <View style={styles.stat}>
              <MaterialCommunityIcons name="heart-outline" size={18} color={metaColor} />
              <Text style={[styles.statText, { color: metaColor }]}>{post.likesLabel}</Text>
            </View>
            <View style={styles.stat}>
              <MaterialCommunityIcons name="comment-outline" size={18} color={metaColor} />
              <Text style={[styles.statText, { color: metaColor }]}>{post.commentsLabel}</Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  )
}

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
    minHeight: 208,
    justifyContent: 'flex-end',
  },
  heroImage: {
    borderTopLeftRadius: R,
    borderTopRightRadius: R,
  },
  heroTextBlock: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 40,
  },
  heroTitle: {
    fontFamily: fontFamily.displayBold,
    fontSize: 21,
    lineHeight: 27,
    textShadowColor: 'rgba(27, 18, 0, 0.45)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },
  heroTags: {
    fontFamily: fontFamily.sansMedium,
    fontSize: 13,
    marginTop: 6,
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
    gap: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLetter: {
    fontFamily: fontFamily.displaySemiBold,
    fontSize: 18,
  },
  handle: {
    fontFamily: fontFamily.sansBold,
    fontSize: 14,
    flex: 1,
  },
  footerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
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
