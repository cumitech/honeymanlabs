import type { ImageSourcePropType } from 'react-native'
import type { Beekeeper } from '../domain/beekeeper.model'
import { toRemoteImageSource } from '../../utils'

export type FeaturedBeekeeper = {
  id: string
  name: string
  initial: string
  avatar: ImageSourcePropType
}

export const emptyFeaturedBeekeeper: FeaturedBeekeeper = {
  id: '',
  name: '',
  initial: '',
  avatar: { uri: '' },
}

type BeekeeperWithImage = Beekeeper & {
  image?: string | null
  image_url?: string | null
  avatar?: string | null
  profile_image?: string | null
}

export function toFeaturedBeekeeper(beekeeper: BeekeeperWithImage): FeaturedBeekeeper {
  const name = beekeeper.name || 'Beekeeper'
  return {
    id: beekeeper.id,
    name,
    initial: name.charAt(0).toUpperCase(),
    avatar: toRemoteImageSource(
      beekeeper.avatar ?? beekeeper.profile_image ?? beekeeper.image_url ?? beekeeper.image,
    ),
  }
}
