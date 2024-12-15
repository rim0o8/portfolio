'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function Hero() {
  const { t } = useTranslation()

  return (
    <section className="py-20 md:py-32 flex flex-col items-center text-center">
      <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
        {t('hero.title')}
      </h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
        {t('hero.subtitle')}
      </h2>
      <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mb-8">
        {t('hero.description')}
      </p>
      <Button size="lg" className="group" asChild>
        <a href="#projects">
          {t('hero.cta')}
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </a>
      </Button>
    </section>
  )
}
