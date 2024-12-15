'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Send } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function Contact() {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('送信に失敗しました')
      }

      setFormData({ name: '', email: '', message: '' })
      alert('メッセージを送信しました')
    } catch (error) {
      console.error('Error:', error)
      alert('メッセージの送信に失敗しました')
    }
  }

  return (
    <section id="contact" className="py-20">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
        {t('contactTitle')}
      </h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t('contactName')}
          </label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t('contactEmail')}
          </label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t('contactMessage')}
          </label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full"
            rows={4}
          />
        </div>
        <Button type="submit" className="w-full">
          {t('contactSubmit')}
          <Send className="ml-2 w-4 h-4" />
        </Button>
      </form>
    </section>
  )
}
