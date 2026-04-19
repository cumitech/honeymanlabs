import type { ImageSourcePropType } from 'react-native'
import { HIVE_COMMUNITY_STORIES } from './hive-feed'

export type HiveArticle = {
  id: string
  title: string
  image: ImageSourcePropType
}

export const HIVE_ARTICLES: HiveArticle[] = HIVE_COMMUNITY_STORIES.map(s => ({
  id: s.id,
  title: s.cardTitle,
  image: s.image,
}))
