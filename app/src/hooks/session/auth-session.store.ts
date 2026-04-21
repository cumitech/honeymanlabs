import { store } from '../../store'
import {
  applyAccessToken,
  clearCredentials,
  setUserProfile,
  type SessionUser,
} from '../../store/slices/session-slice'

export function applyAccessTokenInStore(accessToken: string): void {
  store.dispatch(applyAccessToken({ accessToken }))
}

export function clearSessionCredentialsInStore(): void {
  store.dispatch(clearCredentials())
}

export function setSessionUserInStore(user: SessionUser): void {
  store.dispatch(setUserProfile(user))
}
