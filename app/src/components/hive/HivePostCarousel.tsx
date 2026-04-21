import React from 'react'
import { ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import { StoryCard } from './StoryCard'
import { fontFamily, useTheme } from '../../theme'
import {
  FEATURED_COLLECTION_HORIZONTAL_PADDING,
  LANDING_HIVE_CARD_MAX_WIDTH,
  LANDING_HIVE_CARD_WIDTH_FRACTION,
} from '../../constants/layout'
import type { FeedPost } from '../../models/views/hive.model'

type HivePostCarouselProps = {
  posts: FeedPost[]
}

/** Horizontal strip of hive feed cards on the home landing tab. */
export function HivePostCarousel({ posts }: HivePostCarouselProps) {
  const { theme } = useTheme()
  const { width } = useWindowDimensions()
  const cardWidth = Math.min(
    LANDING_HIVE_CARD_MAX_WIDTH,
    Math.round(width * LANDING_HIVE_CARD_WIDTH_FRACTION),
  )

  return (
    <View style={styles.section}>
      <Text style={[styles.title, { color: theme.text.primary }]}>From The Hive</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {posts.map((post, index) => (
          <View key={post.id} style={[styles.cardWrap, { width: cardWidth }]}>
            <StoryCard
              variant="feed"
              post={post}
              wrapStyle={{
                marginBottom: 0,
                marginRight: index === posts.length - 1 ? 0 : 12,
              }}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  section: {
    marginTop: 26,
    paddingBottom: 4,
  },
  title: {
    fontFamily: fontFamily.displaySemiBold,
    fontSize: 20,
    marginBottom: 14,
    paddingHorizontal: FEATURED_COLLECTION_HORIZONTAL_PADDING,
  },
  scrollContent: {
    paddingLeft: FEATURED_COLLECTION_HORIZONTAL_PADDING,
    paddingRight: FEATURED_COLLECTION_HORIZONTAL_PADDING - 4,
  },
  cardWrap: {
    alignSelf: 'flex-start',
  },
})
