import { Platform } from 'react-native'

function readEnv(key: string): string {
  if (typeof process === 'undefined' || !process.env[key]) return ''
  return String(process.env[key]).trim()
}

export type GoogleOAuthPublicConfig = {
  webClientId: string
  iosClientId: string
  androidClientId: string
}

export function getGoogleOAuthPublicConfig(): GoogleOAuthPublicConfig {
  return {
    webClientId: readEnv('EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID'),
    iosClientId: readEnv('EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID'),
    androidClientId: readEnv('EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID'),
  }
}

/** Native Google sign-in needs the platform client id plus the Web client id (used in the token audience). */
export function isGoogleOAuthConfigured(): boolean {
  const c = getGoogleOAuthPublicConfig()
  if (!c.webClientId) return false
  if (Platform.OS === 'ios') return Boolean(c.iosClientId)
  if (Platform.OS === 'android') return Boolean(c.androidClientId)
  return Boolean(c.webClientId)
}

export function getFacebookAppId(): string {
  return readEnv('EXPO_PUBLIC_FACEBOOK_APP_ID')
}

export function isFacebookOAuthConfigured(): boolean {
  return Boolean(getFacebookAppId())
}
