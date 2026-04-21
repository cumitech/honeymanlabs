import { Platform } from 'react-native'

const fromEnv =
  typeof process !== 'undefined' && process.env.EXPO_PUBLIC_API_BASE_URL
    ? String(process.env.EXPO_PUBLIC_API_BASE_URL).trim()
    : ''

/**
 * Base URL including the `/api` prefix (your server is `http://localhost:5000` → use `…/api`).
 *
 * - **iOS simulator / most dev:** `http://localhost:5000/api` (same machine as Metro).
 * - **Android emulator:** `http://10.0.2.2:5000/api` — inside the emulator, `localhost` is the emulator itself, not your PC.
 * - **Physical device or production:** set `EXPO_PUBLIC_API_BASE_URL` (e.g. `http://192.168.1.x:5000/api`).
 */
export function getApiBaseUrl(): string {
  if (fromEnv) return fromEnv.replace(/\/$/, '')
  if (__DEV__) {
    return Platform.OS === 'android' ? 'http://10.0.2.2:5000/api' : 'http://localhost:5000/api'
  }
  return 'https://api.example.com/api'
}
