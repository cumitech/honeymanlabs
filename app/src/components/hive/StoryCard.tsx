import React from 'react'
import { type StyleProp, type ViewStyle } from 'react-native'
import type { FeedPost, HiveStoryArticle } from '../../models/views/hive.model'
import StoryCardFeed from './StoryCardFeed'
import StoryCardCompact from './StoryCardCompact'

export type StoryCardProps =
  | { variant: 'feed'; post: FeedPost; wrapStyle?: StyleProp<ViewStyle> }
  | { variant: 'compact'; article: HiveStoryArticle; width: number }

export function StoryCard(props: StoryCardProps) {
  if (props.variant === 'feed') {
    return <StoryCardFeed post={props.post} wrapStyle={props.wrapStyle} />
  }
  return <StoryCardCompact article={props.article} width={props.width} />
}
