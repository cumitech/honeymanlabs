import Constants from 'expo-constants'
import { Platform } from 'react-native'

export type AuthClientContextPayload = {
  clientKind: 'web' | 'ios' | 'android'
  deviceLabel?: string
}

/** Sent on login / register / social auth so the API can record last client and device. */
export function buildAuthClientContextBody(): AuthClientContextPayload {
  const clientKind: AuthClientContextPayload['clientKind'] =
    Platform.OS === 'web' ? 'web' : Platform.OS === 'ios' ? 'ios' : 'android'

  const name = Constants.deviceName
  const sys =
    Platform.OS === 'android'
      ? `Android ${String(Platform.Version)}`
      : Platform.OS === 'ios'
        ? `iOS ${String(Platform.Version)}`
        : 'web'
  const parts = [name, sys].filter(Boolean) as string[]
  const label = parts.join(' · ').slice(0, 255)
  return label.length > 0 ? { clientKind, deviceLabel: label } : { clientKind }
}
