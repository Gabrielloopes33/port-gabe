'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MovingBorderCard } from "@/components/ui/moving-border-card"
import { 
  Code, 
  Paintbrush, 
  Rocket, 
  Cpu, 
  Database, 
  Smartphone, 
  BrainCircuit,
  Layers,
  LayoutGrid
} from 'lucide-react'

export function ElevatorPitch() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  
  // Definição dos cards com tamanhos variados para criar um layout de grid encaixado
  const features = [
    {
      title: "Full-Stack Development",
      description: "Building responsive UIs with React/Next.js and robust APIs with Node.js + PostgreSQL.",
      icon: <Code className="w-6 h-6" />,
      highlight: "excepcionais",
      size: "medium" // Card médio (ocupa 4 colunas)
    },
    {
      title: "Marketing Background",
      description: "Started in agencies as a designer, grew into web design, and later founded my own marketing shop, understanding business goals first.",
      icon: <Paintbrush className="w-6 h-6" />,
      highlight: "intuitivas",
      size: "small" // Card pequeno (ocupa 2 colunas)
    },
    {
      title: "AI Integration",
      description: "Integrating ChatGPT and AI tools into workflows with n8n, creating real business automation.",
      icon: <Cpu className="w-6 h-6" />,
      highlight: "eficiente",
      size: "small" // Card pequeno (ocupa 2 colunas)
    },
    {
      title: "DevOps Expertise",
      description: "Deployments with Docker, VPS, and CI/CD pipelines for scalable applications.",
      icon: <Rocket className="w-6 h-6" />,
      highlight: "performance",
      size: "medium" // Card médio (ocupa 4 colunas)
    },
    {
      title: "Automation Solutions",
      description: "Built WhatsApp automation connecting CRMs and business systems when no existing solutions were available.",
      icon: <Layers className="w-6 h-6" />,
      highlight: "gerenciamento",
      size: "medium" // Card pequeno (ocupa 2 colunas)
    },
    {
      title: "Git",
      description: "All versioning work is done through Git, with good commit practices.",
      icon: <LayoutGrid className="w-6 h-6" />,
      highlight: "perfeitamente",
      size: "small" // Card pequeno (ocupa 2 colunas)
    },
  ]
  
  return (
    <section 
      ref={sectionRef}
      className="py-20 flex items-center justify-center w-full"
    >
      <div className="w-full max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Skills that set me apart
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-300">
           I offer a premium developer experience with unique, high-quality skills that bridge technical expertise and business understanding.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mx-auto">
          {features.map((feature, index) => {
            // Calcular classes específicas com base no tamanho do card
            let colSpanClass = "";
            
            switch (feature.size) {
              case "small":
                colSpanClass = "md:col-span-2"; // Card pequeno (2/6 colunas)
                break;
              case "medium":
                colSpanClass = "md:col-span-4"; // Card médio (4/6 colunas)
                break;
              case "large":
                colSpanClass = "md:col-span-5"; // Card grande (5/6 colunas)
                break;
              case "wide":
                colSpanClass = "md:col-span-6"; // Card largo (largura total - 6/6)
                break;
              default:
                colSpanClass = "md:col-span-3"; // Padrão para compatibilidade
            }
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.2 + (index * 0.1),
                  type: "spring" as const,
                  damping: 12,
                  stiffness: 100
                }}
                className={`${colSpanClass} ${
                  feature.size === "large" || feature.size === "wide" ? "md:row-span-1" : ""
                } group flex flex-col ${
                  feature.size === "medium" ? "min-h-[180px]" : 
                  feature.size === "large" ? "min-h-[200px]" : 
                  feature.size === "wide" ? "min-h-[180px]" : "min-h-[160px]"
                } justify-center items-center`}
              >
                <MovingBorderCard
                  duration={4000 + (index * 500)} // Diferentes velocidades para cada card
                  color={index % 2 === 0 ? "#3B82F6" : "#8B5CF6"} // Alterna entre azul e roxo
                  opacity={0.8}
                  width="3rem"
                  height="3rem"
                  className="w-full h-full"
                >
                  <div className="w-full h-full p-6 transition-all duration-300 group flex flex-col justify-center items-center">
                    <div className="bg-black/50 rounded-full w-10 h-10 flex items-center justify-center mb-4 text-blue-400 group-hover:text-blue-300 border border-white/5 group-hover:border-blue-500/30 transition-colors duration-300 self-center">
                      {feature.icon}
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3 text-center">{feature.title}</h3>
                    
                    <p className="text-gray-300 text-sm text-center">
                      {feature.description.split(feature.highlight).map((part, i, arr) => (
                        i === arr.length - 1 ? (
                          <span key={i}>{part}</span>
                        ) : (
                          <>
                            <span key={`${i}-part`}>{part}</span>
                            <span key={`${i}-highlight`} className="text-blue-400 font-medium">{feature.highlight}</span>
                          </>
                        )
                      ))}
                    </p>
                  </div>
                </MovingBorderCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  )
}