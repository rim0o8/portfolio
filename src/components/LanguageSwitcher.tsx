'use client'

import { useTranslation } from 'react-i18next'

export function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const languages = [
    { code: 'ja', label: '日本語' },
    { code: 'en', label: 'English' }
  ]

  const nextLanguage = languages.find(lang => lang.code !== i18n.language)

  return (
    <button
      type="button"
      className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
      onClick={() => nextLanguage && i18n.changeLanguage(nextLanguage.code)}
    >
      {nextLanguage?.label}
    </button>
  )
}