import React from 'react'
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import type { HiveArticle } from '../../data/hive-articles'
import type { HiveFeedPost } from '../../data/hive-feed'
import { fontFamily, useTheme } from '../../theme'
import { tokens } from '../../theme/tokens'
import { fireLightImpact } from '../../utils/safe-haptics'

const FEED_RADIUS = 20

export type HiveStoryCardProps =
  | { variant: 'feed'; post: HiveFeedPost; wrapStyle?: StyleProp<ViewStyle> }
  | { variant: 'compact'; article: HiveArticle; width: number }

export function HiveStoryCard(props: HiveStoryCardProps) {
  if (props.variant === 'feed') {
    return <HiveStoryCardFeed post={props.post} wrapStyle={props.wrapStyle} />
  }
  return <HiveStoryCardCompact article={props.article} width={props.width} />
}

function HiveStoryCardFeed({
  post,
  wrapStyle,
}: {
  post: HiveFeedPost
  wrapStyle?: StyleProp<ViewStyle>
}) {
  const { theme } = useTheme()
  const footerBg = theme.bg.card
  const metaColor = theme.text.muted
  const tags = post.hashtags.join('  ')

  return (
    <Pressable
      onPress={fireLightImpact}
      accessibilityRole="button"
      accessibilityLabel={`Story: ${post.cardTitle}`}
      style={[feedStyles.cardWrap, tokens.shadow.md, wrapStyle]}
    >
      <View style={[feedStyles.card, { backgroundColor: theme.bg.card, borderColor: theme.border }]}>
        <View style={feedStyles.heroClip}>
          <ImageBackground
            source={post.image}
            style={feedStyles.hero}
            imageStyle={feedStyles.heroImage}
            resizeMode="cover"
          >
            <LinearGradient
              colors={['transparent', 'rgba(27, 18, 0, 0.12)', 'rgba(27, 18, 0, 0.62)']}
              locations={[0, 0.45, 1]}
              style={StyleSheet.absoluteFill}
            />
            <View style={feedStyles.heroTextBlock}>
              <Text style={[feedStyles.heroTitle, { color: theme.media.foreground }]} numberOfLines={3}>
                {post.cardTitle}
              </Text>
              <Text
                style={[feedStyles.heroTags, { color: theme.media.foregroundMuted }]}
                numberOfLines={2}
              >
                {tags}
              </Text>
            </View>
          </ImageBackground>
        </View>

        <View style={[feedStyles.footer, { backgroundColor: footerBg }]}>
          <View style={feedStyles.footerLeft}>
            <View style={[feedStyles.avatar, { backgroundColor: theme.bg.muted }]}>
              <Text style={[feedStyles.avatarLetter, { color: theme.text.primary }]}>
                {post.authorInitial}
              </Text>
            </View>
            <Text style={[feedStyles.handle, { color: theme.text.primary }]} numberOfLines={1}>
              {post.authorHandle}
            </Text>
          </View>
          <View style={feedStyles.footerRight}>
            <View style={feedStyles.stat}>
              <MaterialCommunityIcons name="heart-outline" size={18} color={metaColor} />
              <Text style={[feedStyles.statText, { color: metaColor }]}>{post.likesLabel}</Text>
            </View>
            <View style={feedStyles.stat}>
              <MaterialCommunityIcons name="comment-outline" size={18} color={metaColor} />
              <Text style={[feedStyles.statText, { color: metaColor }]}>{post.commentsLabel}</Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  )
}

function HiveStoryCardCompact({ article, width }: { article: HiveArticle; width: number }) {
  const { theme } = useTheme()
  const navigation = useNavigation()
  const cardBg = theme.bg.card

  const readMore = () => {
    fireLightImpact()
    navigation.navigate('Education' as never)
  }

  return (
    <View style={[compactStyles.hiveCard, { width, backgroundColor: cardBg, borderColor: theme.border }]}>
      <Image source={article.image} style={compactStyles.hiveImage} resizeMode="cover" />
      <View style={compactStyles.hiveBody}>
        <Text style={[compactStyles.hiveTitle, { color: theme.text.primary }]} numberOfLines={2}>
          {article.title}
        </Text>
        <Pressable
          onPressIn={fireLightImpact}
          onPress={readMore}
          accessibilityRole="button"
          accessibilityLabel="Read more"
        >
          <Text style={[compactStyles.hiveLink, { color: theme.palette.accent }]}>Read More &gt;</Text>
        </Pressable>
      </View>
    </View>
  )
}

const feedStyles = StyleSheet.create({
  cardWrap: {
    marginBottom: 18,
    borderRadius: FEED_RADIUS,
  },
  card: {
    borderRadius: FEED_RADIUS,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },
  heroClip: {
    borderTopLeftRadius: FEED_RADIUS,
    borderTopRightRadius: FEED_RADIUS,
    overflow: 'hidden',
  },
  hero: {
    minHeight: 208,
    justifyContent: 'flex-end',
  },
  heroImage: {
    borderTopLeftRadius: FEED_RADIUS,
    borderTopRightRadius: FEED_RADIUS,
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
    textShadowColor: 'rgba(27, 18, 0, 0.22)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 10,
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

const compactStyles = StyleSheet.create({
  hiveCard: {
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    marginRight: 12,
    overflow: 'hidden',
    shadowColor: '#1B1200',
    shadowOpacity: 0.04,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  hiveImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: 'transparent',
  },
  hiveBody: {
    padding: 14,
    gap: 10,
  },
  hiveTitle: {
    fontFamily: fontFamily.displaySemiBold,
    fontSize: 16,
    lineHeight: 21,
  },
  hiveLink: {
    fontFamily: fontFamily.sansMedium,
    fontSize: 14,
  },
})
