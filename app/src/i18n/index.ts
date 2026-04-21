import type { LangType } from '../models/common/language.model'

const i18n = {
  changeLanguage: (langKey: LangType, cb?: () => void) => {
    void langKey
    cb?.()
  },
}

export default i18n
