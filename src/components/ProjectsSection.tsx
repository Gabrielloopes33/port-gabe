'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Modal } from "@/components/ui/modal"
import { useLanguage } from "@/contexts/LanguageContext"

// Registrar o ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function ProjectsSection() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<any>(null)

  useEffect(() => {
    if (sectionRef.current) {
      // Animação dos cards ao entrar na viewport
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
              }
            }
          )
        }
      })

      // Efeito parallax para a seção
      gsap.to(".parallax-element", {
        y: -30,
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: true,
        }
      })
    }
  }, [])

  const projects = [
        {
      titleKey: 'project.meupet.title',
      descriptionKey: 'project.meupet.description',
      detailedDescriptionKey: 'project.meupet.detailed',
      tags: ["Flutter", "Dart", "Riverpod", "GoRouter", "Geolocator"],
      image: "/images/meupet-app.png"
    },
    {
      titleKey: 'project.dashboard-ads.title',
      descriptionKey: 'project.dashboard-ads.description',
      detailedDescriptionKey: 'project.dashboard-ads.detailed',
      tags: ["Next.js", "PostgreSQL", "Shadcn"],
      image: "/images/dashboard-ads.png"
    },
    {
      titleKey: 'project.crm.title',
      descriptionKey: 'project.crm.description',
      detailedDescriptionKey: 'project.crm.detailed',
      tags: ["Node.js", "Chatwoot", "PostgreSQL", "n8n"],
      image: "/images/dashboard-crm.png"
    },
    {
      titleKey: 'project.energy.title',
      descriptionKey: 'project.energy.description',
      detailedDescriptionKey: 'project.energy.detailed',
      tags: ["Next.js", "Supabase", "PostgreSQL", "n8n"],
      image: "/images/dashboard-energy.png"
    },
    {
      titleKey: 'project.celf.title',
      descriptionKey: 'project.celf.description',
      detailedDescriptionKey: 'project.celf.detailed',
      tags: ["Next.js", "Radix UI", "GSAP", "TailwindCSS"],
      image: "/images/celf-site.jpeg"
    },

    {
      titleKey: 'project.mobs2.title',
      descriptionKey: 'project.mobs2.description',
      detailedDescriptionKey: 'project.mobs2.detailed',
      tags: ["Flutter", "Provider", "Geolocator", "Sensors", "FlutterMap"],
      image: "/images/mobs2-telemetry.png"
    },
    
  ]

  const setCardRef = (index: number) => (el: HTMLDivElement) => {
    if (el) {
      cardsRef.current[index] = el
    }
  }

  const handleOpenModal = (project: any) => {
    setSelectedProject(project)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setSelectedProject(null)
  }

  return (
    <section 
      ref={sectionRef}
      id="projetos"
      className="py-20 relative overflow-hidden"
    >      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">{t('projects.title')}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={index}
              ref={setCardRef(index)}
              className="overflow-hidden hover:shadow-xl transition-shadow duration-300 bg-black/30 border border-white/10 hover:border-white/20 backdrop-blur-sm"
            >
              {project.image ? (
                <div className="w-full h-48 overflow-hidden relative group">
                  <img 
                    src={project.image} 
                    alt={t(project.titleKey)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ) : (
                <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-white/5 rounded-t-xl w-full h-48" />
              )}
              <CardHeader>
                <CardTitle className="text-white">{t(project.titleKey)}</CardTitle>
                <CardDescription className="text-gray-300">{t(project.descriptionKey)}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="px-3 py-1 bg-blue-900/20 text-blue-400 border border-blue-500/20 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  className="w-full border-white/20 text-white-900 hover:bg-white/80"
                  onClick={() => handleOpenModal(project)}
                >
                  {t('projects.button.more')}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <Modal
          isOpen={modalOpen}
          onClose={handleCloseModal}
          title={t(selectedProject.titleKey)}
        >
          <div className="space-y-4">
            {selectedProject.image && (
              <div className="w-full h-64 overflow-hidden rounded-lg">
                <img 
                  src={selectedProject.image} 
                  alt={t(selectedProject.titleKey)}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="flex flex-wrap gap-2">
              {selectedProject.tags.map((tag: string, tagIndex: number) => (
                <span 
                  key={tagIndex}
                  className="px-3 py-1 bg-blue-900/20 text-blue-400 border border-blue-500/20 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="text-gray-300 leading-relaxed">
              {t(selectedProject.detailedDescriptionKey)}
            </div>
          </div>
        </Modal>
      )}
    </section>
  )
} 