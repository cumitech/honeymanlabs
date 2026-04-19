import AsyncStorage from '@react-native-async-storage/async-storage'
import { Platform } from 'react-native'

import { REFRESH_TOKEN_STORAGE_KEY } from '../constants/storage'

let preferAsyncStorage = Platform.OS === 'web'

function loadSecureStore():
  | typeof import('expo-secure-store')
  | null {
  if (preferAsyncStorage) return null
  try {
    return require('expo-secure-store') as typeof import('expo-secure-store')
  } catch {
    preferAsyncStorage = true
    return null
  }
}

export async function saveRefreshToken(token: string): Promise<void> {
  const SecureStore = loadSecureStore()
  if (!SecureStore) {
    await AsyncStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, token)
    return
  }
  try {
    await SecureStore.setItemAsync(REFRESH_TOKEN_STORAGE_KEY, token)
  } catch {
    preferAsyncStorage = true
    await AsyncStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, token)
  }
}

export async function getRefreshToken(): Promise<string | null> {
  const SecureStore = loadSecureStore()
  if (!SecureStore) {
    return AsyncStorage.getItem(REFRESH_TOKEN_STORAGE_KEY)
  }
  try {
    return await SecureStore.getItemAsync(REFRESH_TOKEN_STORAGE_KEY)
  } catch {
    preferAsyncStorage = true
    return AsyncStorage.getItem(REFRESH_TOKEN_STORAGE_KEY)
  }
}

export async function clearRefreshToken(): Promise<void> {
  const SecureStore = loadSecureStore()
  if (!SecureStore) {
    await AsyncStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY)
    return
  }
  try {
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_STORAGE_KEY)
  } catch {
    preferAsyncStorage = true
    await AsyncStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY)
  }
}
