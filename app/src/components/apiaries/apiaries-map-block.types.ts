import type { RefObject } from 'react'
import type MapView from 'react-native-maps'
import type { ApiaryListItem, ApiaryMapRegion } from '../../models/views/apiary-view.model'

export type ApiariesMapBlockProps = {
  items: ApiaryListItem[]
  mapRef: RefObject<MapView | null>
  onRegionSnapshot: (region: ApiaryMapRegion) => void
}
