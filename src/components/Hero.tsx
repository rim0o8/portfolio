'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function Hero() {
  const { t } = useTranslation()

  return (
    <section className="relative py-20 md:py-32 flex flex-col items-center text-center overflow-hidden">
      {/* 背景装飾要素 */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-float animate-delay-300" />
        <div className="absolute top-40 right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-float animate-delay-200" />
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl animate-float animate-delay-100" />
        
        {/* 装飾的な幾何学模様 */}
        <div className="absolute top-1/4 left-1/4 w-8 h-8 border-2 border-primary/20 rounded-full animate-rotate" />
        <div className="absolute bottom-1/4 right-1/4 w-12 h-12 border-2 border-blue-500/20 rounded-full animate-rotate animate-delay-200" style={{ animationDirection: 'reverse' }} />
        <div className="absolute top-1/3 right-1/3 w-6 h-6 border-2 border-purple-500/20 rotate-45 animate-float animate-delay-300" />
      </div>
      
      <div className="relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text text-shadow">
          {t('hero.title')}
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-200 mb-4 animate-fade-in animate-delay-100">
          {t('hero.subtitle')}
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mb-8 animate-fade-in animate-delay-200">
          {t('hero.description')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animate-delay-300">
          <Button size="lg" className="group gradient-border relative overflow-hidden" asChild>
            <a href="#projects" className="relative z-10 bg-background dark:bg-background px-6 py-2 rounded-md">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
              <span className="relative z-10 flex items-center transition-colors group-hover:text-white">
                {t('hero.cta')}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
          </Button>
          <Button size="lg" variant="outline" className="glass-effect animate-pulse-slow" asChild>
            <a href="#contact">
              {t('hero.contact')}
            </a>
          </Button>
        </div>
      </div>
      
      {/* 装飾的な要素 */}
      <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-[120%] h-40 bg-gradient-to-b from-transparent to-background/5 backdrop-blur-sm -z-10" />
    </section>
  )
}
