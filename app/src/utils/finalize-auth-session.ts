import { fetchSessionProfile, type AuthTokens } from '../api'
import { saveRefreshToken } from './refresh-token-storage'
import type { AppDispatch } from '../store'
import { applyAccessToken, setUserProfile } from '../store/slices/session-slice'

export async function finalizeAuthSession(
  dispatch: AppDispatch,
  tokens: AuthTokens,
  onSuccess: () => void,
) {
  await saveRefreshToken(tokens.refreshToken)
  dispatch(applyAccessToken({ accessToken: tokens.accessToken }))
  try {
    const profile = await fetchSessionProfile()
    dispatch(setUserProfile(profile))
  } catch {
    /* profile optional */
  }
  onSuccess()
}
