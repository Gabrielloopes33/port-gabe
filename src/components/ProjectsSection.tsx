'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Registrar o ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function ProjectsSection() {
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
      title: "Dashboard Ads – Internal Tool",
      description: "Analytics dashboard for Meta & Google Ads. Reduced reporting time by 40%.",
      tags: ["Next.js", "Supabase", "Shadcn"],
      image: "/images/dashboard-ads.png"
    },
    {
      title: "Touch CRM – Omnichannel System",
      description: "Centralized customer communication with WhatsApp & social media. Increased conversion rate by 25%.",
      tags: ["Node.js", "Chatwoot", "PostgreSQL", "n8n"],
      image: "/images/dashboard-crm.png"
    },
    {
      title: "Energy Data Dashboard",
      description: "Collected and analyzed solar energy data from Cemig in real time, improving decisions with visual dashboards.",
      tags: ["Next.js", "Supabase", "PostgreSQL", "n8n"],
      image: "/images/dashboard-energy.png"
    }
  ]

  const setCardRef = (index: number) => (el: HTMLDivElement) => {
    if (el) {
      cardsRef.current[index] = el
    }
  }

  return (
    <section 
      ref={sectionRef}
      id="projetos"
      className="py-20 relative overflow-hidden"
    >      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">My Projects</h2>
        
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
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ) : (
                <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-white/5 rounded-t-xl w-full h-48" />
              )}
              <CardHeader>
                <CardTitle className="text-white">{project.title}</CardTitle>
                <CardDescription className="text-gray-300">{project.description}</CardDescription>
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
                <Button variant="outline" className="w-full border-white/20 text-gray-900 hover:bg-white/80">Ver Projeto</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}