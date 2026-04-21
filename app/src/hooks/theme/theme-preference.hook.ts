import { useCallback } from 'react'
import { useAppDispatch } from '../../store/hooks'
import { setThemePreference, type ThemePreference } from '../../store/slices/ui-slice'

export function useThemePreferenceActions() {
  const dispatch = useAppDispatch()

  const setPreference = useCallback(
    (preference: ThemePreference) => {
      dispatch(setThemePreference(preference))
    },
    [dispatch],
  )

  const setDarkMode = useCallback(
    (dark: boolean) => {
      dispatch(setThemePreference(dark ? 'dark' : 'light'))
    },
    [dispatch],
  )

  return { setPreference, setDarkMode }
}
