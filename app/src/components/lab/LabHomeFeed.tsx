import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { RingCaptionRail, type RingCaptionRailItem } from '../shared/RingCaptionRail'
import { LabRecentTestCard } from './LabRecentTestCard'
import { fontFamily, useTheme } from '../../theme'
import type { LabRecentTest } from '../../models/views/lab-feed.model'
import { EDUCATION_LAB_PAGE_HORIZONTAL_PAD, SCROLL_END_SPACER_HEIGHT } from '../../constants/layout'

type LabHomeFeedProps = {
  batchRailItems: RingCaptionRailItem[]
  recentTests: LabRecentTest[]
}

export function LabHomeFeed({ batchRailItems, recentTests }: LabHomeFeedProps) {
  const { theme } = useTheme()

  return (
    <View style={styles.page}>
      <View style={styles.pad}>
        <RingCaptionRail title="Recent batches" itemMinWidth={72} items={batchRailItems} />
        <Text style={[styles.feedHeading, { color: theme.text.primary }]}>Lab results</Text>
        {recentTests.map(t => (
          <LabRecentTestCard key={t.id} test={t} />
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
