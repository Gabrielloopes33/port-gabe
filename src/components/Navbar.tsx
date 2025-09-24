'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { gsap } from 'gsap'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    
    // Animação GSAP para a navbar
    gsap.fromTo(
      '.navbar-item',
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 }
    )
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="navbar-item text-2xl font-bold text-white">Portfolio</div>
        <div className="hidden md:flex space-x-8">
          {['Home', 'Sobre', 'Projetos', 'Contato'].map((item, index) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="navbar-item text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
        <Button variant="outline" className="navbar-item text-white border-white/20 bg-black/30 hover:bg-white/10">Contato</Button>
      </div>
    </nav>
  )
}