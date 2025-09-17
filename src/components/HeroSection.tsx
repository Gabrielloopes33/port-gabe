'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AnimatedButton } from "@/components/ui/animated-button"
import { TypeAnimationComponent } from "@/components/TypeAnimationComponent"




// Registrar o ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/80"></div>
      
      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
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
              <Button variant="outline" size="lg" className="border-white/20 text-gray-500 hover:bg-white">Download CV</Button>
            </div>
          </div>
          
          <div 
            ref={imageRef}
            className="md:w-1/2 flex justify-center"
          >
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 bg-blue-600 rounded-full overflow-hidden border-4 border-blue-500/30 shadow-2xl shadow-blue-500/20">
                <img 
                  src="/images/profile-photo.jpg"
                  alt="Gabriel's profile photo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-black/80 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-white/10">
                <span className="font-bold text-blue-400">3+ years</span> <span className="text-white">experience</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}