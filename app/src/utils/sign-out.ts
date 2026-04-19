import { store } from '../store'
import { clearCredentials } from '../store/slices/session-slice'
import { clearRefreshToken } from './refresh-token-storage'

export async function signOut(): Promise<void> {
  await clearRefreshToken()
  store.dispatch(clearCredentials())
}
