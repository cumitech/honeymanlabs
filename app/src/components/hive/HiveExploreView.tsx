import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { RingCaptionRail, type RingCaptionRailItem } from '../shared/RingCaptionRail'
import { StoryCard } from './StoryCard'
import { fontFamily, useTheme } from '../../theme'
import type { FeedPost } from '../../models/views/hive.model'
import { EDUCATION_LAB_PAGE_HORIZONTAL_PAD, SCROLL_END_SPACER_HEIGHT } from '../../constants/layout'

type HiveExploreViewProps = {
  beekeeperRailItems: RingCaptionRailItem[]
  feedPosts: FeedPost[]
}

/** Education tab: featured beekeepers rail + community feed. */
export function HiveExploreView({ beekeeperRailItems, feedPosts }: HiveExploreViewProps) {
  const { theme } = useTheme()

  return (
    <View style={styles.page}>
      <View style={styles.pad}>
        <RingCaptionRail title="Featured beekeepers" itemMinWidth={78} items={beekeeperRailItems} />
        <Text style={[styles.feedHeading, { color: theme.text.primary }]}>Community</Text>
        {feedPosts.map(post => (
          <StoryCard key={post.id} variant="feed" post={post} />
        ))}
      </View>
      <View style={{ height: SCROLL_END_SPACER_HEIGHT }} />
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    paddingBottom: 24,
  },
  pad: {
    paddingHorizontal: EDUCATION_LAB_PAGE_HORIZONTAL_PAD,
    paddingTop: 0,
  },
  feedHeading: {
    fontFamily: fontFamily.sansBold,
    fontSize: 17,
    marginTop: 22,
    marginBottom: 12,
  },
})
