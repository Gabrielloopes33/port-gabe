'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin, GraduationCap, Briefcase, Heart, Code2 } from "lucide-react"

// Registrar o ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function AboutSection() {
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
      title: "Experience",
      description: "2+ years developing modern and scalable web solutions"
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-green-400" />,
      title: "Knowledge",
      description: "Web Development fundamentals - IBM"
    },
    {
      icon: <MapPin className="w-6 h-6 text-purple-400" />,
      title: "Location",
      description: "Minas Gerais, Brasil - Available for remote work"
    },
    {
      icon: <Heart className="w-6 h-6 text-red-400" />,
      title: "Passion",
      description: "Creating digital experiences that make a difference in people's lives"
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
              About <span className="text-blue-400">Me</span>
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
                      I'm a full-stack developer passionate about technology and innovation, with over 2+ years of experience
creating web solutions that positively impact businesses and users.
                    </p>
                    <p className="text-lg text-gray-300 leading-relaxed mb-4">
                      My journey began with curiosity about how websites work, and since then I've dedicated myself
to mastering modern technologies like React, Next.js, Node.js, and relational databases.
                    </p>
                    <p className="text-lg text-gray-300 leading-relaxed">
                      When I'm not coding, I enjoy studying new technologies, contributing to open source projects,
and always looking for ways to optimize processes and create exceptional user experiences.
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
                      <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                      <p className="text-gray-300 leading-relaxed">{item.description}</p>
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
              <div className="text-sm text-gray-300">Years of Experience</div>
            </div>
            <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg p-6">
              <div className="text-3xl font-bold text-green-400 mb-2">15+</div>
              <div className="text-sm text-gray-300">Completed Projects</div>
            </div>
            <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg p-6">
              <div className="text-3xl font-bold text-purple-400 mb-2">10+</div>
              <div className="text-sm text-gray-300">Technologies</div>
            </div>
            <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg p-6">
              <div className="text-3xl font-bold text-red-400 mb-2">100%</div>
              <div className="text-sm text-gray-300">Dedication</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}