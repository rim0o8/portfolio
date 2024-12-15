'use client'

import { Brain, Cloud, Database } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function Skills() {
  const { t } = useTranslation()
  const skillsConfig = [
    { id: '1', icon: Database },
    { id: '2', icon: Brain },
    { id: '3', icon: Cloud }
  ]

  const skills = skillsConfig.map(({ id, icon }) => ({
    category: t(`skills.items.${id}.title`),
    icon,
    items: t(`skills.items.${id}.items`, { returnObjects: true }) as string[]
  }))

  return (
    <section id="skills" className="py-20">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
        {t('skills.title')}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {skills.map((skillSet) => (
          <div key={skillSet.category} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transition-transform hover:scale-105">
            <div className="flex items-center mb-4">
              <skillSet.icon className="w-8 h-8 text-blue-500 mr-3" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {skillSet.category}
              </h3>
            </div>
            <ul className="space-y-2">
              {skillSet.items.map((skill) => (
                <li key={skill} className="flex items-center text-gray-600 dark:text-gray-300">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
