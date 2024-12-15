'use client'

import { useTranslation } from 'react-i18next'

export function LanguageSwitcher() {
  const { i18n } = useTranslation()

  return (
    <div className="flex gap-2">
      <button
        type="button"
        className={`px-3 py-1 rounded ${i18n.language === 'ja' ? 'bg-primary text-white' : 'bg-gray-200'}`}
        onClick={() => i18n.changeLanguage('ja')}
      >
        日本語
      </button>
      <button
        type="button"
        className={`px-3 py-1 rounded ${i18n.language === 'en' ? 'bg-primary text-white' : 'bg-gray-200'}`}
        onClick={() => i18n.changeLanguage('en')}
      >
        English
      </button>
    </div>
  )
} 