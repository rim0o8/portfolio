'use client'

import { Button } from '@/components/ui/button'
import { Brain, ExternalLink, Github } from 'lucide-react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { useEffect, useRef, useState } from 'react'

export function Projects() {
  const { t } = useTranslation()
  const [activeCard, setActiveCard] = useState<number | null>(null)

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
          <ProjectCard 
            key={index} 
            project={project} 
            index={index}
            isActive={activeCard === index}
            setActiveCard={setActiveCard}
          />
        ))}
      </div>
    </section>
  )
}

function ProjectCard({ 
  project, 
  index, 
  isActive, 
  setActiveCard 
}: { 
  project: any
  index: number
  isActive: boolean
  setActiveCard: (index: number | null) => void
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  const [isHovered, setIsHovered] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    // Detect touch device
    setIsTouchDevice('ontouchstart' in window)
  }, [])

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!cardRef.current || (!isHovered && !isActive)) return
      
      const rect = cardRef.current.getBoundingClientRect()
      let clientX: number, clientY: number
      
      if (e.type === 'touchmove') {
        const touch = (e as TouchEvent).touches[0]
        clientX = touch.clientX
        clientY = touch.clientY
        if (isActive) {
          setIsDragging(true)
        }
      } else {
        clientX = (e as MouseEvent).clientX
        clientY = (e as MouseEvent).clientY
      }
      
      const x = (clientX - rect.left) / rect.width
      const y = (clientY - rect.top) / rect.height
      
      setMousePos({ x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) })
    }

    const handleTouchEnd = () => {
      if (isActive && !isDragging) {
        setMousePos({ x: 0.5, y: 0.5 })
      }
      setTimeout(() => setIsDragging(false), 100)
    }

    if (isTouchDevice) {
      window.addEventListener('touchmove', handleMove, { passive: true })
      window.addEventListener('touchend', handleTouchEnd, { passive: true })
    } else {
      window.addEventListener('mousemove', handleMove)
    }

    return () => {
      if (isTouchDevice) {
        window.removeEventListener('touchmove', handleMove)
        window.removeEventListener('touchend', handleTouchEnd)
      } else {
        window.removeEventListener('mousemove', handleMove)
      }
    }
  }, [isHovered, isActive, isTouchDevice, isDragging])

  const handleMouseEnter = () => {
    if (!isTouchDevice) {
      setIsHovered(true)
    }
  }

  const handleMouseLeave = () => {
    if (!isTouchDevice) {
      setIsHovered(false)
      setMousePos({ x: 0.5, y: 0.5 })
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(false)
    
    if (!isActive) {
      setActiveCard(index)
      const touch = e.touches[0]
      const rect = cardRef.current?.getBoundingClientRect()
      if (rect) {
        const x = (touch.clientX - rect.left) / rect.width
        const y = (touch.clientY - rect.top) / rect.height
        setMousePos({ x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) })
      }
    }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isActive && !isDragging) {
      // Only deactivate on tap (not drag)
      setActiveCard(null)
      setMousePos({ x: 0.5, y: 0.5 })
    }
  }

  const handleClick = (e: React.MouseEvent) => {
    if (isTouchDevice) {
      e.preventDefault()
    }
  }

  const isInteracting = isHovered || isActive
  const rotateX = isInteracting ? (mousePos.y - 0.5) * -20 : 0
  const rotateY = isInteracting ? (mousePos.x - 0.5) * 20 : 0

  return (
    <div
      ref={cardRef}
      className={`pokemon-card-wrapper ${isActive ? 'card-active' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={handleClick}
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