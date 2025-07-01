'use client'

import { Button } from '@/components/ui/button'
import { Brain, ExternalLink, Github } from 'lucide-react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { useEffect, useRef, useState } from 'react'

export function Projects() {
  const { t } = useTranslation()

  const projects = Array.from({ length: 6 }, (_, i) => {
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
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: any }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current || !isHovered) return
      
      const rect = cardRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      
      setMousePos({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isHovered])

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => {
    setIsHovered(false)
    setMousePos({ x: 0.5, y: 0.5 })
  }

  const rotateX = isHovered ? (mousePos.y - 0.5) * -20 : 0
  const rotateY = isHovered ? (mousePos.x - 0.5) * 20 : 0

  return (
    <div
      ref={cardRef}
      className="pokemon-card-wrapper"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        '--mouse-x': mousePos.x,
        '--mouse-y': mousePos.y,
        '--rotate-x': `${rotateX}deg`,
        '--rotate-y': `${rotateY}deg`,
      } as React.CSSProperties}
    >
      <div className="pokemon-card">
        <div className="card-shine" />
        <div className="card-glare" />
        <div className="card-sparkles">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="sparkle" style={{
              '--sparkle-delay': `${i * 0.4}s`,
              '--sparkle-x': `${(i * 37) % 100}%`,
              '--sparkle-y': `${(i * 23 + 10) % 100}%`,
            } as React.CSSProperties} />
          ))}
        </div>
        
        <div className="card-content">
          {project.image ? (
            <div className="card-image-wrapper">
              <Image 
                src={project.image} 
                alt={project.title} 
                width={600} 
                height={400} 
                className="card-image" 
              />
            </div>
          ) : (
            <div className="card-image-wrapper card-image-placeholder">
              <Brain className="w-24 h-24 text-gray-400 dark:text-gray-500" />
            </div>
          )}
          
          <div className="card-info">
            <h3 className="card-title">{project.title}</h3>
            <p className="card-description">{project.description}</p>
            
            <div className="card-actions">
              {project.demoLink && (
                <Button variant="outline" size="sm" asChild className="card-button">
                  <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                    {t('projects.viewProject')} <ExternalLink className="ml-1 w-4 h-4" />
                  </a>
                </Button>
              )}
              {project.githubLink && (
                <Button variant="outline" size="sm" asChild className="card-button">
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                    {t('projects.sourceCode')} <Github className="ml-1 w-4 h-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}