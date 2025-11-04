'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Modal } from "@/components/ui/modal"

// Registrar o ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function ProjectsSection() {
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
      title: "Dashboard Ads – Internal Tool",
      description: "Analytics dashboard for Meta & Google Ads. Reduced reporting time by 40%.",
      tags: ["Next.js", "PostgreSQL", "Shadcn"],
      image: "/images/dashboard-ads.png",
      detailedDescription: "Este projeto foi desenvolvido para otimizar o processo de análise de campanhas publicitárias. O dashboard integra dados do Meta Ads (Facebook/Instagram) e Google Ads em uma interface única e intuitiva. Implementei gráficos interativos, filtros avançados e relatórios automatizados que reduziram o tempo de análise de dados em 40%. A aplicação foi construída com Next.js para performance otimizada, Supabase para gerenciamento de dados em tempo real, e Shadcn para uma interface moderna e responsiva.This project was developed to improve the advertising campaign analysis process. The dashboard integrates data from Meta Ads (Facebook/Instagram) and Google Ads into a single, intuitive interface. I implemented interactive charts, advanced filters, and automated reports that reduced data analysis time by 40%. The application was built with Next.js for optimized performance, PostgreSQL for real-time data management, and Shadcn for a modern, responsive interface."
    },
    {
      title: "Touch CRM – Omnichannel System",
      description: "Centralized customer communication with WhatsApp & social media. Increased conversion rate by 25%.",
      tags: ["Node.js", "Chatwoot", "PostgreSQL", "n8n"],
      image: "/images/dashboard-crm.png",
      detailedDescription: "An omnichannel CRM system that centralizes all customer communications in a single platform. I integrated WhatsApp Business API, Facebook Messenger, Instagram Direct, and other communication channels. The system automates responses, organizes leads by sales funnel, and provides detailed conversion metrics. I used Node.js for the backend, Chatwoot as the foundation of the chat system, PostgreSQL for data persistence, and n8n for complex automations. The result was a 25% increase in conversion rate."
    },
    {
      title: "Energy Data Dashboard",
      description: "Collected and analyzed solar energy data from Cemig in real time, improving decisions with visual dashboards.",
      tags: ["Next.js", "Supabase", "PostgreSQL", "n8n"],
      image: "/images/dashboard-energy.png",
      detailedDescription: "Dashboard for real-time solar energy data monitoring and analysis, collecting information directly from Cemig's API. The system processes large volumes of energy data, calculates efficiency metrics, and presents interactive visualizations for decision-making. I implemented automatic alerts for anomalies, performance reports, and savings projections. The architecture uses Next.js on the frontend, PostgreSQL for structured storage, and n8n for data processing pipelines."
    },
     {
      title: "CELF institutional website",
      description: "Institutional website for CELF, company specialized in complete solutions for conservation and maintenance of condominium, commercial and industrial spaces.",
      tags: ["Next.js", "Radix UI", "GSAP", "TailwindCSS"],
      image: "/images/celf-site.jpeg",
      detailedDescription: "The website was structured following the user journey: Discover - Presentation of the company and services - Trust - Demonstration of credibility and experience - Request a Proposal - Conversion of the visitor into a lead/customer"
    },
    {
      title: "MeuPet - Pet Care Management App",
      description: "Complete Flutter app connecting pet owners to specialized services with GPS, custom maps, and appointment system.",
      tags: ["Flutter", "Dart", "Riverpod", "GoRouter", "Geolocator"],
      image: "/images/meupet-app.png",
      detailedDescription: "MeuPet is a comprehensive mobile solution developed in Flutter that connects pet owners to specialized service providers. The app features a complete pet management system with GPS location services, custom maps without external API dependencies, appointment scheduling, and health tracking. Key features include: real-time location of nearby veterinarians, pet shops, grooming services, and pet hotels; custom map implementation using Web Mercator projection; complete pet registration with photo upload; integrated calendar for appointments; and secure authentication system. Built with Flutter 3.9.2+, Riverpod for state management, and GoRouter for navigation, delivering a seamless experience across all mobile platforms."
    },
    {
      title: "MOBS2 - Real-time Telemetry App",
      description: "Flutter telemetry app with real-time GPS tracking, speed calculation, and sensor data visualization.",
      tags: ["Flutter", "Provider", "Geolocator", "Sensors", "FlutterMap"],
      image: "/images/mobs2-telemetry.png",
      detailedDescription: "MOBS2 is a technical case study Flutter application focused on real-time telemetry data collection and visualization. The app demonstrates advanced mobile development skills through GPS tracking, sensor integration, and data processing. Features include: real-time GPS location with enhanced precision; dynamic speed calculation (GPS + manual fallback); intelligent direction using GPS + magnetometer backup; 3D acceleration via device sensors (X, Y, Z axes); advanced metrics (max/average speed, distance, session time); interactive map with rotating marker based on direction; robust data validation with GPS precision filtering; outlier detection for speed readings; and memory-optimized performance with proper stream disposal. Built with Provider pattern for state management and OpenStreetMap for mapping without API dependencies."
    },
    {
      title: "Social Test - Culinary Social Network",
      description: "Flutter social network app focused on culinary content with 8 types of posts, Material 3 design, and BLoC architecture.",
      tags: ["Flutter", "BLoC", "Material 3", "Firebase", "Dart"],
      image: "/images/social-test-app.png",
      detailedDescription: "Social Test is a comprehensive Flutter social network application designed specifically for culinary enthusiasts. The app allows users to share recipes, cooking tips, restaurant reviews, and culinary achievements through a sophisticated posting system. Key features include: 8 specialized post types (recipes, tips, reviews, achievements, questions, inspirations, techniques, ingredients); dynamic tag system for content organization; multi-image support for posts; interactive engagement (like, comment, share, save); metadata for recipes (difficulty, prep time, servings); custom Material 3 design system with blue/white/gray palette; light and dark theme support; responsive layout for web and mobile; clean architecture with BLoC pattern; Firebase integration ready for production. The app includes 5 sample posts in Brazilian Portuguese demonstrating various content types, from sophisticated shrimp risotto recipes to professional pastry techniques."
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
                <Button 
                  variant="outline" 
                  className="w-full border-white/20 text-gray-900 hover:bg-white/80"
                  onClick={() => handleOpenModal(project)}
                >
                  See more
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
          title={selectedProject.title}
        >
          <div className="space-y-4">
            {selectedProject.image && (
              <div className="w-full h-64 overflow-hidden rounded-lg">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
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
              {selectedProject.detailedDescription}
            </div>
          </div>
        </Modal>
      )}
    </section>
  )
} 