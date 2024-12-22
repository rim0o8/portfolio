'use client'

import { Button } from '@/components/ui/button'
import { ExternalLink, Github } from 'lucide-react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'

export function Projects() {
  const { t } = useTranslation()

  const projects = Array.from({ length: 4 }, (_, i) => {
    const index = i + 1
    return {
      title: t(`projects.items.${index}.title`),
      description: t(`projects.items.${index}.description`), 
      image: t(`projects.items.${index}.image`),
      demoLink: t(`projects.items.${index}.demoLink`),
      githubLink: t(`projects.items.${index}.githubLink`),
    }
  })

  return (
    <section id="projects" className="py-20">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
        {t('projects.title')}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div key={project.title} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105 flex flex-col">
            <Image src={project.image} alt={project.title} width={600} height={400} className="w-full h-48 object-cover" />
            <div className="p-6 flex-1 flex flex-col">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{project.description}</p>
              </div>
              <div className="flex space-x-4 mt-auto pt-4">
                {project.demoLink && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                      {t('viewProject')} <ExternalLink className="ml-1 w-4 h-4" />
                    </a>
                  </Button>
                )}
                {project.githubLink && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                      {t('sourceCode')} <Github className="ml-1 w-4 h-4" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
