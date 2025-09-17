'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Github, Linkedin } from 'lucide-react'

export function Footer() {
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (footerRef.current) {
      // Animação de entrada do footer
      gsap.fromTo(
        footerRef.current,
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1,
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom"
          }
        }
      )
    }
  }, [])

  return (
    <footer ref={footerRef} className="py-10 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold text-white">Gabriel Moraes</h3>
            <p className="text-gray-300">Desenvolvedor Full Stack</p>
          </div>
          <div className="flex space-x-6">
            <a 
              href="https://github.com/Gabrielloopes33"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors group"
            >
              <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>GitHub</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/gabriel-lopes-522ba117a/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors group"
            >
              <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Gabriel Moraes. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  )
}