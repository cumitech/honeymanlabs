import type { ImageSourcePropType } from 'react-native'

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
  /** WGS84 for map markers */
  latitude: number
  longitude: number
  status: 'Stable' | 'Monitoring' | 'At risk'
  image: ImageSourcePropType
}

export const MOCK_APIARIES: ApiaryListItem[] = [
  {
    id: '1',
    title: 'Provence Highlands',
    subtitle: 'Lavender Fields Apiary',
    coordsLabel: '43.94°N, 5.33°E',
    latitude: 43.94,
    longitude: 5.33,
    status: 'Stable',
    image: require('../assets/honey-8490746_1280.jpg'),
  },
  {
    id: '2',
    title: 'Ozark Ridge',
    subtitle: 'Wildflower Ridge Yards',
    coordsLabel: '36.12°N, 93.21°W',
    latitude: 36.12,
    longitude: -93.21,
    status: 'Stable',
    image: require('../assets/ibrahim-ozdemir-rRDHlkSyoxY-unsplash 1.png'),
  },
  {
    id: '3',
    title: 'Sierra Bloom',
    subtitle: 'Almond Pollination Block',
    coordsLabel: '37.02°N, 119.42°W',
    latitude: 37.02,
    longitude: -119.42,
    status: 'Monitoring',
    image: require('../assets/honeycombs-4.png'),
  },
]

/** Fit all apiary points with padding (used as `initialRegion` / `animateToRegion` base). */
export function regionForApiaries(
  items: Pick<ApiaryListItem, 'latitude' | 'longitude'>[],
  pad = 1.45,
): ApiaryMapRegion {
  if (items.length === 0) {
    return { latitude: 43.94, longitude: 5.33, latitudeDelta: 0.35, longitudeDelta: 0.35 }
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
