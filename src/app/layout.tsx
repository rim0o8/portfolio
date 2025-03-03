'use client'

import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import './globals.css'
import { Providers } from './providers'

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  const { i18n } = useTranslation()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initializeLanguage = async () => {
      const savedLanguage = localStorage.getItem('i18nextLng') || 'en'
      await i18n.changeLanguage(savedLanguage)
      setIsLoading(false)
    }

    initializeLanguage()
  }, [i18n])

  if (isLoading) {
    return (
      <html lang="en" suppressHydrationWarning>
        <body className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 font-sans antialiased">
          <div className="flex items-center justify-center h-screen">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <div className="text-lg font-medium text-primary">読み込み中...</div>
            </div>
          </div>
        </body>
      </html>
    )
  }

  return (
    <html lang={i18n.language} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </head>
      <Providers>
        <body className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 font-sans antialiased">
          <main className="container mx-auto px-4 py-8 relative">
            {children}
          </main>
        </body>
      </Providers>
    </html>
  )
}

