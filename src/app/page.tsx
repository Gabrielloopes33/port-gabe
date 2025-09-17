'use client'

import { Navbar } from "@/components/Navbar"
import { HeroSection } from "@/components/HeroSection"
import { ElevatorPitch } from "@/components/ElevatorPitch"
import { ProjectsSection } from "@/components/ProjectsSection"
import { ContactSection } from "@/components/ContactSection"
import { Footer } from "@/components/Footer"
import { useEffect } from "react"
import { gsap } from "gsap"

export default function Home() {
  useEffect(() => {
    // Animação de entrada da página
    gsap.fromTo(
      ".page-content",
      { opacity: 0 },
      { opacity: 1, duration: 1 }
    )
  }, [])

  return (
    <div className="page-content">
      <Navbar />
      <HeroSection />
      <ElevatorPitch />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </div>
  )
}