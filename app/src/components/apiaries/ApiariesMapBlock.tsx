import React from 'react'
import { Platform, StyleSheet, Text, UIManager, View } from 'react-native'
import type MapView from 'react-native-maps'
import { ASSET_BEE_LOGO } from '../../constants'
import type { ApiaryListItem, ApiaryMapRegion } from '../../data/apiaries'
import { regionForApiaries } from '../../data/apiaries'
import { fontFamily, useTheme } from '../../theme'

export type ApiariesMapBlockProps = {
  items: ApiaryListItem[]
  mapRef: React.RefObject<MapView | null>
  onRegionSnapshot: (region: ApiaryMapRegion) => void
}

function hasNativeViewManager(name: string): boolean {
  if (typeof UIManager.hasViewManagerConfig === 'function') {
    return UIManager.hasViewManagerConfig(name)
  }
  return UIManager.getViewManagerConfig?.(name) != null
}

/** Matches react-native-maps native names (`AIRMap` / `AIRGoogleMap` on iOS). */
function canUseReactNativeMaps(useGoogleMaps: boolean): boolean {
  if (Platform.OS === 'web') return false
  if (Platform.OS === 'android') return hasNativeViewManager('AIRMap')
  return useGoogleMaps ? hasNativeViewManager('AIRGoogleMap') : hasNativeViewManager('AIRMap')
}

function MapUnavailableNotice({ message }: { message: string }) {
  const { theme } = useTheme()
  return (
    <View style={[styles.fallback, { backgroundColor: theme.bg.muted }]} accessibilityLabel="Map unavailable">
      <Text style={[styles.fallbackText, { color: theme.text.muted }]}>{message}</Text>
    </View>
  )
}

export function ApiariesMapBlock({ items, mapRef, onRegionSnapshot }: ApiariesMapBlockProps) {
  const initialRegion = React.useMemo(() => regionForApiaries(items), [items])
  const useGoogleMaps =
    typeof process !== 'undefined' && Boolean(process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY)

  if (Platform.OS === 'web') {
    return (
      <MapUnavailableNotice message="Open the iOS or Android app for the live Google Map with apiary pins." />
    )
  }

  if (!canUseReactNativeMaps(useGoogleMaps)) {
    return (
      <MapUnavailableNotice message="Map native module is missing. Run a dev build after installing maps: npx expo prebuild --clean, then npx expo run:android (or run:ios)." />
    )
  }

  const {
    default: MapViewImpl,
    Marker,
    PROVIDER_GOOGLE,
  } = require('react-native-maps') as typeof import('react-native-maps')

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

const styles = StyleSheet.create({
  fallback: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  fallbackText: {
    fontFamily: fontFamily.sansRegular,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
})
