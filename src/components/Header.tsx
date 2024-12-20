'use client'

import { Globe } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from './LanguageSwitcher'

export function Header() {
  const { t } = useTranslation()

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="w-full border-b">
      <div className="container flex h-16 items-center justify-between px-4 mx-auto">
        <nav className="flex gap-6">
          <button
            type="button"
            onClick={() => scrollToSection('hero')}
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {t('navigation.home')}
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('about')}
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {t('navigation.about')}
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('projects')}
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {t('navigation.project')}
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('contact')}
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {t('navigation.contact')}
          </button>
        </nav>
        <div className="flex items-center gap-4">
          <div className="flex items-center border rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <Globe className="w-4 h-4 mr-1" />
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  )
}
