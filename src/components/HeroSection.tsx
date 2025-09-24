'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AnimatedButton } from "@/components/ui/animated-button"
import { TypeAnimationComponent } from "@/components/TypeAnimationComponent"
import ProfileCard from "@/components/ui/profilecard"
import { Github, Linkedin, Mail, Database, Code, Server, Globe, Download, ChevronDown } from "lucide-react"
import { useState } from 'react'




// Registrar o ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const [showCvDropdown, setShowCvDropdown] = useState(false)

  // Dados para o ProfileCard
  const skills = [
    { name: "React", icon: <Code className="w-5 h-5 text-white" /> },
    { name: "Next.js", icon: <Globe className="w-5 h-5 text-white" /> },
    { name: "Node.js", icon: <Server className="w-5 h-5 text-white" /> },
    { name: "TypeScript", icon: <Code className="w-5 h-5 text-white" /> },
    { name: "PostgreSQL", icon: <Database className="w-5 h-5 text-white" /> },
    { name: "Supabase", icon: <Database className="w-5 h-5 text-white" /> },
  ]

  const socialLinks = [
    { name: "GitHub", url: "https://github.com/Gabrielloopes33", icon: <Github className="w-5 h-5 text-white" /> },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/gabriel-lopes-522ba117a/", icon: <Linkedin className="w-5 h-5 text-white" /> },

  ]

  // Função para scroll suave para a seção de projetos
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projetos')
    if (projectsSection) {
      // Calcular offset para melhor posicionamento
      const offset = 80 // Espaço do topo
      const elementPosition = projectsSection.offsetTop - offset
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
  }

  // Função para download do CV
  const downloadCV = (language: 'pt' | 'en') => {
    const fileName = language === 'pt' ? 'cv-gabriel-lopes-pt.pdf' : 'cv-gabriel-lopes-en.pdf'
    const link = document.createElement('a')
    link.href = `/documents/${fileName}`
    link.download = fileName
    link.click()
    setShowCvDropdown(false)
  }

  useEffect(() => {
    // Fechar dropdown quando clicar fora
    const handleClickOutside = (event: MouseEvent) => {
      if (showCvDropdown && !(event.target as Element)?.closest('.relative')) {
        setShowCvDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showCvDropdown])

  useEffect(() => {
    if (sectionRef.current && textRef.current && imageRef.current) {
      // Animação inicial
      gsap.fromTo(
        textRef.current,
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1,
          ease: "power3.out"
        }
      )

      gsap.fromTo(
        imageRef.current,
        { x: 100, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          duration: 1,
          ease: "power3.out",
          delay: 0.3
        }
      )

      // Efeito parallax
      gsap.to(imageRef.current, {
        y: -50,
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: true,
        }
      })
    }
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-0"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/80"></div>
      
      <div className="container mx-auto px-4 relative z-10 max-w-6xl py-8 md:py-0">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 
              ref={textRef}
              className="text-4xl md:text-6xl font-bold mb-4 text-white"
            >
              Hi! I am <span className="text-blue-400">Gabriel</span>
            </h1>
            <h3 
              ref={textRef}
              className="text-xl md:text-2xl font-normal mb-4 text-white"
            >
              I build <span className="text-blue-400">modern, scalable</span> web applications with
            </h3>
            <p className="text-xl md:text-2xl mb-8 text-gray-300">
              <TypeAnimationComponent />
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <AnimatedButton 
                size="lg" 
                variant="glow"
                className="bg-blue-600 hover:bg-blue-700 text-white border-blue-500"
                glow={true}
                shimmerColor="#60A5FA"
                borderRadius="8px"
                textEffect="normal"
                background="rgba(37, 99, 235, 1)"
                shimmerDuration="2s"
                onClick={scrollToProjects}
              >
                My Projects
              </AnimatedButton>
              
              {/* Dropdown para CV */}
              <div className="relative">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white/20 text-gray-950 hover:text-gray-900 hover:bg-white/85 flex items-center gap-2"
                  onClick={() => setShowCvDropdown(!showCvDropdown)}
                >
                  <Download className="w-4 h-4" />
                  Download CV
                  <ChevronDown className={`w-4 h-4 transition-transform ${showCvDropdown ? 'rotate-180' : ''}`} />
                </Button>
                
                {showCvDropdown && (
                  <div className="absolute top-full mt-2 left-0 bg-gray-900 border border-white/20 rounded-lg shadow-2xl backdrop-blur-md z-50 min-w-full">
                    <button
                      onClick={() => downloadCV('pt')}
                      className="w-full px-4 py-3 text-left text-white hover:bg-white/10 transition-colors flex items-center gap-3 rounded-t-lg"
                    >
                      <div className="w-6 h-4 bg-green-500 rounded-sm flex items-center justify-center text-xs font-bold text-white">PT</div>
                      Currículo em Português
                    </button>
                    <button
                      onClick={() => downloadCV('en')}
                      className="w-full px-4 py-3 text-left text-white hover:bg-white/10 transition-colors flex items-center gap-3 rounded-b-lg"
                    >
                      <div className="w-6 h-4 bg-blue-500 rounded-sm flex items-center justify-center text-xs font-bold text-white">EN</div>
                      Resume in English
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div 
            ref={imageRef}
            className="md:w-1/2 flex justify-center mt-8 md:mt-0"
          >
            <ProfileCard
              img="/images/profile-photo.jpg"
              name="Gabriel Lopes"
              position="Full Stack Developer"
              bio="Developer passionate about creating modern and scalable web solutions, with 3+ years of experience."
              skills={skills}
              socialLinks={socialLinks}
              spotlight={true}
              spotlightColor="59, 130, 246"
            />
          </div>
        </div>
      </div>
    </section>
  )
}