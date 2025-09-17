'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Registrar o ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  
  const sectionRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (sectionRef.current && formRef.current) {
      // Animação do formulário
      gsap.fromTo(
        formRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      )

      // Efeito parallax
      gsap.to(".contact-element", {
        y: -20,
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: true,
        }
      })
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você pode adicionar a lógica para enviar o formulário
    console.log('Formulário enviado:', formData)
    alert('Mensagem enviada com sucesso!')
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <section 
      ref={sectionRef}
      id="contato"
      className="py-20 relative overflow-hidden"
    >      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">Let’s build something together!</h2>
        
        <div className="max-w-4xl mx-auto">
          <Card className="bg-black/30 border border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Vamos trabalhar juntos!</CardTitle>
              <CardDescription className="text-gray-300">
                Tem um projeto em mente? Preencha o formulário abaixo e entrarei em contato o mais breve possível.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white mb-2">Nome</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-black/50 border border-white/20 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-black/50 border border-white/20 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white mb-2">Mensagem</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-2 bg-black/50 border border-white/20 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  ></textarea>
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">Enviar Mensagem</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}