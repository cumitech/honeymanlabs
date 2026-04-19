import type { ImageSourcePropType } from 'react-native'
import {
  AVATAR_BEEKEEPER_1,
  AVATAR_BEEKEEPER_2,
  AVATAR_BEEKEEPER_3,
  AVATAR_BEEKEEPER_4,
  CONTENT_IMAGE_HONEY_JAR,
  CONTENT_IMAGE_IBRAHIM_APIARY,
} from '../constants'

export type HiveCommunityStory = {
  id: string
  cardTitle: string
  hashtags: string[]
  authorHandle: string
  authorInitial: string
  likesLabel: string
  commentsLabel: string
  image: ImageSourcePropType
}

export const HIVE_COMMUNITY_STORIES: HiveCommunityStory[] = [
  {
    id: '1',
    cardTitle: 'Morning Ritual: Acacia Honey on Sourdough.',
    hashtags: ['#HoneyManRecipes', '#SlowMorning'],
    authorHandle: 'Chef_Leo',
    authorInitial: 'L',
    likesLabel: '1.2k Likes',
    commentsLabel: '84 Comments',
    image: CONTENT_IMAGE_HONEY_JAR,
  },
  {
    id: '2',
    cardTitle: 'Hive Notes: What wildflower tells you about the season.',
    hashtags: ['#TheHive', '#Beekeeping'],
    authorHandle: 'Ozark_Apiaries',
    authorInitial: 'O',
    likesLabel: '892 Likes',
    commentsLabel: '41 Comments',
    image: CONTENT_IMAGE_IBRAHIM_APIARY,
  },
  {
    id: '3',
    cardTitle: 'Jar spotlight: our reserve pot for gifting season.',
    hashtags: ['#HoneyManStore', '#GiftIdeas'],
    authorHandle: 'HoneyMan_Team',
    authorInitial: 'H',
    likesLabel: '2.4k Likes',
    commentsLabel: '126 Comments',
    image: CONTENT_IMAGE_HONEY_JAR,
  },
]

export type HiveFeedPost = HiveCommunityStory
export const HIVE_FEED_POSTS: HiveFeedPost[] = HIVE_COMMUNITY_STORIES

export type HiveFeaturedBeekeeper = {
  id: string
  name: string
  initial: string
  avatar: ImageSourcePropType
}

export const HIVE_FEATURED_BEEKEEPERS: HiveFeaturedBeekeeper[] = [
  { id: '1', name: 'Beatrice K.', initial: 'B', avatar: AVATAR_BEEKEEPER_1 },
  { id: '2', name: 'Arthur M.', initial: 'A', avatar: AVATAR_BEEKEEPER_2 },
  { id: '3', name: 'Sophia L.', initial: 'S', avatar: AVATAR_BEEKEEPER_3 },
  { id: '4', name: 'Leo R.', initial: 'L', avatar: AVATAR_BEEKEEPER_4 },
]
