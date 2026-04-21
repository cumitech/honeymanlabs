import AsyncStorage from '@react-native-async-storage/async-storage'
import Constants from 'expo-constants'
import * as Haptics from 'expo-haptics'
import * as SecureStore from 'expo-secure-store'
import { Platform } from 'react-native'

import { buildUrl } from '../api/core/build-url'
import { REFRESH_TOKEN_STORAGE_KEY } from '../constants/storage'
import { PRODUCT_GRID_GAP, PRODUCT_GRID_HORIZONTAL_PADDING } from '../constants/layout'
import type { UserRole } from '../models/domain/user.model'
import type { SessionUser } from '../store/slices/session-slice'

const DEFAULT_REMOTE_IMAGE =
  'https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&w=1200&q=80'

function resolveApiPathForImage(path: string): string {
  return buildUrl(path)
}

function normalizeRemoteImageUrl(raw?: string | null): string | null {
  if (!raw) return null
  const value = raw.trim()
  if (!value) return null
  if (/^https?:\/\//i.test(value)) {
    try {
      const parsed = new URL(value)
      if (
        Platform.OS === 'android' &&
        (parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1')
      ) {
        parsed.hostname = '10.0.2.2'
      }
      if (
        parsed.protocol === 'http:' &&
        !['localhost', '127.0.0.1', '10.0.2.2'].includes(parsed.hostname)
      ) {
        parsed.protocol = 'https:'
      }
      return encodeURI(parsed.toString())
    } catch {
      return encodeURI(value)
    }
  }
  if (value.startsWith('//')) return `https:${value}`
  if (value.startsWith('/')) return resolveApiPathForImage(value)
  return resolveApiPathForImage(`/${value}`)
}

export function toRemoteImageSource(raw?: string | null, fallback = DEFAULT_REMOTE_IMAGE) {
  return { uri: normalizeRemoteImageUrl(raw) ?? encodeURI(fallback) }
}

function ignorePromiseRejection(p: Promise<unknown>) {
  void p.catch(() => {})
}

export function selectionHaptic() {
  ignorePromiseRejection(Haptics.selectionAsync())
}

export function lightHaptic() {
  ignorePromiseRejection(Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light))
}

export function warningHaptic() {
  ignorePromiseRejection(Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning))
}

export function normalizeOrderLookup(s: string): string {
  return s.toLowerCase().replace(/#/g, '').replace(/[\s-]/g, '')
}

export function orderMatchesLookup(orderCode: string, rawQuery: string): boolean {
  const q = normalizeOrderLookup(rawQuery)
  if (!q) return true
  const code = normalizeOrderLookup(orderCode)
  return code.includes(q) || q.includes(code)
}

function emailLocalPart(raw?: string | null): string | null {
  const e = raw?.trim()
  if (!e?.includes('@')) return null
  return e.split('@')[0]?.trim() ?? null
}

export function initialsFromName(first?: string, last?: string): string {
  const a = first?.trim()?.[0]
  const b = last?.trim()?.[0]
  if (a && b) return `${a}${b}`.toUpperCase()
  if (a) return a.toUpperCase()
  return '?'
}

export function usernameFromEmail(email?: string): string {
  const local = emailLocalPart(email)
  return local ?? '—'
}

export function homeSalutation(): 'Good morning' | 'Good afternoon' | 'Good evening' {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

export function homeGreetingDisplayName(input: {
  firstname?: string | null
  lastname?: string | null
  email?: string | null
}): string {
  const first = input.firstname?.trim()
  if (first) return first
  const last = input.lastname?.trim()
  if (last) return last
  const local = emailLocalPart(input.email)
  if (local) return local.charAt(0).toUpperCase() + local.slice(1)
  return 'there'
}

export function splitDisplayName(raw: string): { firstname: string; lastname: string } {
  const t = raw.trim().replace(/\s+/g, ' ')
  if (!t) return { firstname: '', lastname: '' }
  const i = t.indexOf(' ')
  if (i === -1) return { firstname: t, lastname: 'Member' }
  const rest = t.slice(i + 1).trim()
  return { firstname: t.slice(0, i), lastname: rest || 'Member' }
}

export function userHasRole(user: SessionUser | null, role: UserRole): boolean {
  return user?.roles.includes(role) ?? false
}

export function userHasAnyRole(user: SessionUser | null, roles: UserRole[]): boolean {
  if (!user) return false
  return roles.some(r => user.roles.includes(r))
}

export function userHasPermission(user: SessionUser | null, permission: string): boolean {
  return user?.permissions.includes(permission) ?? false
}

export type AuthClientContextPayload = {
  clientKind: 'web' | 'ios' | 'android'
  deviceLabel?: string
}

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

export function productCardWidthForGrid(screenWidth: number): number {
  return (screenWidth - PRODUCT_GRID_HORIZONTAL_PADDING * 2 - PRODUCT_GRID_GAP) / 2
}

export function chunkPairs<T>(items: T[]): T[][] {
  const rows: T[][] = []
  for (let i = 0; i < items.length; i += 2) {
    rows.push(items.slice(i, i + 2))
  }
  return rows
}

let preferAsyncStorageForRefreshToken = Platform.OS === 'web'

function useSecureStoreForRefreshToken(): boolean {
  return !preferAsyncStorageForRefreshToken
}

export async function persistRefreshToken(token: string): Promise<void> {
  if (!useSecureStoreForRefreshToken()) {
    await AsyncStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, token)
    return
  }
  try {
    await SecureStore.setItemAsync(REFRESH_TOKEN_STORAGE_KEY, token)
  } catch {
    preferAsyncStorageForRefreshToken = true
    await AsyncStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, token)
  }
}

export async function readStoredRefreshToken(): Promise<string | null> {
  if (!useSecureStoreForRefreshToken()) {
    return AsyncStorage.getItem(REFRESH_TOKEN_STORAGE_KEY)
  }
  try {
    return await SecureStore.getItemAsync(REFRESH_TOKEN_STORAGE_KEY)
  } catch {
    preferAsyncStorageForRefreshToken = true
    return AsyncStorage.getItem(REFRESH_TOKEN_STORAGE_KEY)
  }
}

export async function eraseStoredRefreshToken(): Promise<void> {
  if (!useSecureStoreForRefreshToken()) {
    await AsyncStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY)
    return
  }
  try {
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_STORAGE_KEY)
  } catch {
    preferAsyncStorageForRefreshToken = true
    await AsyncStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY)
  }
}
