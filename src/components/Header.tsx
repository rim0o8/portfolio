'use client'

import { Menu } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from './LanguageSwitcher'

export function Header() {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      if (offset > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }

      // アクティブセクションの検出
      const sections = ['contact', 'projects', 'about', 'hero']
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 200) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const navItems = [
    { id: 'hero', label: t('navigation.home') },
    { id: 'about', label: t('navigation.about') },
    { id: 'projects', label: t('navigation.project') },
    { id: 'contact', label: t('navigation.contact') }
  ]

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'glass-effect py-2 shadow-md' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container flex items-center justify-between px-4 mx-auto">
        <div className="text-xl font-bold gradient-text animate-slide-left">
          Portfolio
        </div>
        <nav className="hidden md:flex gap-6 animate-fade-in">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              className={`text-sm font-medium transition-all duration-300 relative group ${
                activeSection === item.id 
                  ? 'text-primary' 
                  : 'text-foreground hover:text-primary'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {item.label}
              <span 
                className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                  activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                }`} 
              />
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-4 animate-slide-right">
          <div className="shimmer p-1 rounded-full">
            <LanguageSwitcher />
          </div>
          <button 
            type="button"
            className="md:hidden text-primary relative overflow-hidden group"
            onClick={() => {
              // モバイルメニューの実装（将来的に追加）
            }}
            aria-label="メニュー"
          >
            <span className="absolute inset-0 w-full h-full bg-primary/10 rounded-full scale-0 group-hover:scale-100 transition-transform" />
            <Menu className="w-6 h-6 relative z-10" />
          </button>
        </div>
      </div>
    </header>
  )
}
