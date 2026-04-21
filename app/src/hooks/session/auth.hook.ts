import { useCallback, useMemo } from 'react'
import { fetchSessionProfile, type AuthTokens } from '../../api/auth'
import { useAppSelector } from '../../store/hooks'
import type { SessionUser } from '../../store/slices/session-slice'
import { eraseStoredRefreshToken, persistRefreshToken } from '../../utils'
import {
  applyAccessTokenInStore,
  clearSessionCredentialsInStore,
  setSessionUserInStore,
} from './auth-session.store'

export function useAuth() {
  const accessToken = useAppSelector(s => s.session.accessToken)
  const user = useAppSelector(s => s.session.user)
  const isSignedIn = useMemo(() => Boolean(accessToken), [accessToken])

  const signIn = useCallback(async (tokens: AuthTokens, onSuccess: () => void) => {
    await persistRefreshToken(tokens.refreshToken)
    applyAccessTokenInStore(tokens.accessToken)
    try {
      const profile = await fetchSessionProfile()
      setSessionUserInStore(profile)
    } catch {
      // Profile is optional right after sign-in.
    }
    onSuccess()
  }, [])

  const signOut = useCallback(async () => {
    await eraseStoredRefreshToken()
    clearSessionCredentialsInStore()
  }, [])

  return {
    accessToken,
    user,
    isSignedIn,
    signIn,
    signOut,
  } satisfies {
    accessToken: string | null
    user: SessionUser | null
    isSignedIn: boolean
    signIn: (tokens: AuthTokens, onSuccess: () => void) => Promise<void>
    signOut: () => Promise<void>
  }
}
