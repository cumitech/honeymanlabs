import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { setLanguage } from '../../../store/slices/language-slice'
import i18n from '../../../i18n'
import type { LangType } from '../../../models/common/language.model'

export const SUPPORTED_LANGUAGES: Record<LangType, string> = {
  en: '🇬🇧 English',
  fr: '🇫🇷 French',
}

export function useLanguage() {
  const dispatch = useAppDispatch()
  const langKey = useAppSelector(state => state.language.langKey)

  const changeLanguage = (next: LangType) => {
    dispatch(setLanguage(next))
    i18n.changeLanguage(next, () => {})
  }

  return {
    langKey,
    changeLanguage,
  }
}
