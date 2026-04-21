import React from 'react'
import { Platform, StyleSheet, UIManager } from 'react-native'
import MapViewImpl, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { ASSET_BEE_LOGO } from '../../constants'
import { regionForApiaries } from '../../models/views/apiary-view.model'
import { MapUnavailableNotice } from './apiaries-map-block.fallback'
import type { ApiariesMapBlockProps } from './apiaries-map-block.types'

export type { ApiariesMapBlockProps } from './apiaries-map-block.types'

function hasNativeViewManager(name: string): boolean {
  if (typeof UIManager.hasViewManagerConfig === 'function') {
    return UIManager.hasViewManagerConfig(name)
  }
  return UIManager.getViewManagerConfig?.(name) != null
}

function canUseReactNativeMaps(useGoogleMaps: boolean): boolean {
  if (Platform.OS === 'android') return hasNativeViewManager('AIRMap')
  return useGoogleMaps ? hasNativeViewManager('AIRGoogleMap') : hasNativeViewManager('AIRMap')
}

export function ApiariesMapBlock({ items, mapRef, onRegionSnapshot }: ApiariesMapBlockProps) {
  const initialRegion = React.useMemo(() => regionForApiaries(items), [items])
  const useGoogleMaps =
    typeof process !== 'undefined' && Boolean(process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY)

  if (!canUseReactNativeMaps(useGoogleMaps)) {
    return <MapUnavailableNotice message="Map is unavailable right now." />
  }

  return (
    <MapViewImpl
      ref={mapRef}
      style={StyleSheet.absoluteFillObject}
      provider={useGoogleMaps ? PROVIDER_GOOGLE : undefined}
      initialRegion={initialRegion}
      onRegionChangeComplete={onRegionSnapshot}
      showsUserLocation={false}
      showsMyLocationButton={false}
      rotateEnabled={false}
      pitchEnabled={false}
      mapType="standard"
    >
      {items.map(item => (
        <Marker
          key={item.id}
          coordinate={{ latitude: item.latitude, longitude: item.longitude }}
          title={item.title}
          description={item.subtitle}
          image={ASSET_BEE_LOGO}
          tracksViewChanges={false}
        />
      ))}
    </MapViewImpl>
  )
}
