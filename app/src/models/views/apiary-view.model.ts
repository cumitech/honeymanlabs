import type { ImageSourcePropType } from 'react-native'
import type { Apiary } from '../domain/apiary.model'
import { toRemoteImageSource } from '../../utils'

export type ApiaryMapRegion = {
  latitude: number
  longitude: number
  latitudeDelta: number
  longitudeDelta: number
}

export type ApiaryListItem = {
  id: string
  title: string
  subtitle: string
  coordsLabel: string
  latitude: number
  longitude: number
  status: 'Stable' | 'Monitoring' | 'At risk'
  image: ImageSourcePropType
}

export const emptyApiaryListItem: ApiaryListItem = {
  id: '',
  title: '',
  subtitle: '',
  coordsLabel: '',
  latitude: 0,
  longitude: 0,
  status: 'Stable',
  image: { uri: '' },
}

type ApiaryWithImage = Apiary & {
  image?: string | null
  image_url?: string | null
  featured_image?: string | null
}

export function toApiaryListItem(apiary: ApiaryWithImage): ApiaryListItem {
  return {
    id: apiary.id,
    title: apiary.name,
    subtitle: apiary.region || 'Apiary',
    coordsLabel: `${apiary.latitude.toFixed(2)}°, ${apiary.longitude.toFixed(2)}°`,
    latitude: apiary.latitude,
    longitude: apiary.longitude,
    status: apiary.number_of_hives < 20 ? 'Monitoring' : 'Stable',
    image: toRemoteImageSource(apiary.image_url ?? apiary.image ?? apiary.featured_image),
  }
}

export function regionForApiaries(
  items: Pick<ApiaryListItem, 'latitude' | 'longitude'>[],
  pad = 1.45,
): ApiaryMapRegion {
  if (items.length === 0) {
    return { latitude: 6.52, longitude: 3.37, latitudeDelta: 0.35, longitudeDelta: 0.35 }
  }
  const latitudes = items.map(i => i.latitude)
  const longitudes = items.map(i => i.longitude)
  const minLat = Math.min(...latitudes)
  const maxLat = Math.max(...latitudes)
  const minLng = Math.min(...longitudes)
  const maxLng = Math.max(...longitudes)
  const midLat = (minLat + maxLat) / 2
  const midLng = (minLng + maxLng) / 2
  let latDelta = (maxLat - minLat) * pad
  let lngDelta = (maxLng - minLng) * pad
  if (latDelta < 0.12) latDelta = 0.12
  if (lngDelta < 0.12) lngDelta = 0.12
  return {
    latitude: midLat,
    longitude: midLng,
    latitudeDelta: latDelta,
    longitudeDelta: lngDelta,
  }
}
