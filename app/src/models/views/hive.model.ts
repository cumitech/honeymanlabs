import type { ImageSourcePropType } from 'react-native'

export type HiveStoryArticle = {
  id: string
  title: string
  image: ImageSourcePropType
}

export type FeedPost = {
  id: string
  cardTitle: string
  hashtags: string[]
  authorHandle: string
  authorInitial: string
  likesLabel: string
  commentsLabel: string
  image: ImageSourcePropType
}

export type HiveFeedPost = FeedPost

export const emptyHiveFeedPost: HiveFeedPost = {
  id: '',
  cardTitle: '',
  hashtags: [],
  authorHandle: '',
  authorInitial: '',
  likesLabel: '',
  commentsLabel: '',
  image: { uri: '' },
}
