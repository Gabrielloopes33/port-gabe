'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/contexts/LanguageContext"
import { Calendar, MapPin, GraduationCap, Briefcase, Heart, Code2 } from "lucide-react"

// Registrar o ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function AboutSection() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

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
              delay: index * 0.2,
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
              }
            }
          )
        }
      })

      // Animação do texto principal
      gsap.fromTo(
        ".about-text",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: ".about-text",
            start: "top 80%",
          }
        }
      )
    }
  }, [])

  const setCardRef = (index: number) => (el: HTMLDivElement) => {
    if (el) {
      cardsRef.current[index] = el
    }
  }

  const aboutData = [
    {
      icon: <Briefcase className="w-6 h-6 text-blue-400" />,
      titleKey: "about.experience.title",
      descriptionKey: "about.experience.description"
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-green-400" />,
      titleKey: "about.knowledge.title",
      descriptionKey: "about.knowledge.description"
    },
    {
      icon: <MapPin className="w-6 h-6 text-purple-400" />,
      titleKey: "about.location.title",
      descriptionKey: "about.location.description"
    },
    {
      icon: <Heart className="w-6 h-6 text-red-400" />,
      titleKey: "about.passion.title",
      descriptionKey: "about.passion.description"
    }
  ]

  return (
    <section 
      ref={sectionRef}
      id="sobre"
      className="py-20 relative overflow-hidden bg-gradient-to-b from-black/40 to-black/60"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Título da seção */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              {t('about.title')}
            </h2>
            <div className="w-20 h-1 bg-blue-400 mx-auto mb-8"></div>
          </div>

          {/* Texto principal */}
          <div className="about-text mb-16">
            <Card className="bg-black/30 border border-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-500/20 p-3 rounded-full flex-shrink-0">
                    <Code2 className="w-8 h-8 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-lg text-gray-300 leading-relaxed mb-4">
                      {t('about.description1')}
                    </p>
                    <p className="text-lg text-gray-300 leading-relaxed mb-4">
                      {t('about.description2')}
                    </p>
                    <p className="text-lg text-gray-300 leading-relaxed">
                      {t('about.description3')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cards informativos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aboutData.map((item, index) => (
              <Card 
                key={index}
                ref={setCardRef(index)}
                className="bg-black/20 border border-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-300 hover:transform hover:scale-105"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-gray-800/50 p-3 rounded-full flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{t(item.titleKey)}</h3>
                      <p className="text-gray-300 leading-relaxed">{t(item.descriptionKey)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Estatísticas */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg p-6">
              <div className="text-3xl font-bold text-blue-400 mb-2">3+</div>
              <div className="text-sm text-gray-300">{t('about.stats.years')}</div>
            </div>
            <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg p-6">
              <div className="text-3xl font-bold text-green-400 mb-2">15+</div>
              <div className="text-sm text-gray-300">{t('about.stats.projects')}</div>
            </div>
            <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg p-6">
              <div className="text-3xl font-bold text-purple-400 mb-2">10+</div>
              <div className="text-sm text-gray-300">{t('about.stats.technologies')}</div>
            </div>
            <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg p-6">
              <div className="text-3xl font-bold text-red-400 mb-2">100%</div>
              <div className="text-sm text-gray-300">{t('about.stats.dedication')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}