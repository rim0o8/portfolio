'use client'

import type { ReactNode } from 'react'
import { I18nextProvider } from 'react-i18next'
import '../i18n/config'
import i18n from '../i18n/config'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  )
}