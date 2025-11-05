'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Language = 'pt' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translations object
const translations = {
  pt: {
    // Hero Section
    'hero.greeting': 'Olá! Eu sou',
    'hero.subtitle': 'Eu construo aplicações web e mobile',
    'hero.subtitle.highlight': 'modernas e escaláveis',
    'hero.subtitle.with': 'com',
    'hero.button.projects': 'Meus Projetos',
    'hero.button.cv': 'Baixar CV',
    'hero.cv.portuguese': 'Currículo em Português',
    'hero.cv.english': 'Currículo em Inglês',
    'hero.profile.name': 'Gabriel Lopes',
    'hero.profile.position': 'Desenvolvedor Full Stack',
    'hero.profile.bio': 'Desenvolvedor apaixonado por criar soluções web modernas e escaláveis, com 3+ anos de experiência.',

    // Navigation
    'nav.portfolio': 'Portfólio',
    'nav.home': 'Início',
    'nav.about': 'Sobre',
    'nav.projects': 'Projetos',
    'nav.contact': 'Contato',

    // Elevator Pitch Section
    'elevator.title': 'Habilidades que me destacam',
    'elevator.subtitle': 'Ofereço uma experiência premium de desenvolvimento com habilidades únicas e de alta qualidade que conectam expertise técnica e entendimento de negócios.',
    'elevator.fullstack.title': 'Desenvolvimento Full-Stack',
    'elevator.fullstack.description': 'Construindo UIs responsivas com React/Next.js e APIs robustas com Node.js + PostgreSQL.',
    'elevator.marketing.title': 'Background em Marketing',
    'elevator.marketing.description': 'Comecei em agências como designer, depois fundei minha própria empresa de marketing, entendendo primeiro os objetivos de negócio.',
    'elevator.ai.title': 'Integração com IA',
    'elevator.ai.description': 'Integrando ChatGPT e ferramentas de IA em fluxos de trabalho com n8n, criando automação de negócios real.',
    'elevator.devops.title': 'Expertise em DevOps',
    'elevator.devops.description': 'Deployments com Docker, VPS e pipelines CI/CD para aplicações escaláveis.',
    'elevator.automation.title': 'Soluções de Automação',
    'elevator.automation.description': 'Construí automação WhatsApp conectando CRMs e sistemas de negócios quando não havia soluções existentes disponíveis.',
    'elevator.git.title': 'Git',
    'elevator.git.description': 'Todo trabalho de versionamento é feito através do Git, com boas práticas de commit.',

    // About Section
    'about.title': 'Sobre Mim',
    'about.subtitle': 'Desenvolvedor apaixonado por criar soluções inovadoras',
    'about.description1': 'Sou um desenvolvedor full-stack apaixonado por tecnologia e inovação, com mais de 3 anos de experiência criando soluções web que impactam positivamente negócios e usuários.',
    'about.description2': 'Minha jornada começou com a curiosidade sobre como os sites funcionam, e desde então me dedico a dominar tecnologias modernas como React, Next.js, Node.js e bancos de dados relacionais.',
    'about.description3': 'Quando não estou programando, gosto de estudar novas tecnologias, contribuir para projetos open source e sempre buscar formas de otimizar processos e criar experiências excepcionais para o usuário.',
    'about.experience.title': 'Experiência',
    'about.experience.description': '3+ anos desenvolvendo soluções web e Mobile modernas e escaláveis',
    'about.knowledge.title': 'Conhecimento',
    'about.knowledge.description': 'Fundamentos de Desenvolvimento Web - IBM',
    'about.location.title': 'Localização',
    'about.location.description': 'Minas Gerais, Brasil - Disponível para trabalho remoto',
    'about.passion.title': 'Paixão',
    'about.passion.description': 'Criar experiências digitais que fazem a diferença na vida das pessoas',
    'about.stats.years': 'Anos de Experiência',
    'about.stats.projects': 'Projetos Concluídos',
    'about.stats.technologies': 'Tecnologias',
    'about.stats.dedication': 'Dedicação',

    // Projects Section
    'projects.title': 'Meus Projetos',
    'projects.button.more': 'Ver mais',

    // Contact Section
    'contact.title': 'Vamos Conversar',
    'contact.subtitle': 'Tem uma ideia de projeto? Preencha o formulário abaixo e entrarei em contato o mais breve possível.',
    'contact.name': 'Nome',
    'contact.email': 'Email',
    'contact.message': 'Mensagem',
    'contact.send': 'Enviar Mensagem',
    'contact.success': 'Mensagem enviada com sucesso!',

    // Footer
    'footer.rights': 'Todos os direitos reservados',
    'footer.made-with': 'Feito com',
    'footer.and': 'e',

    // Project descriptions
    'project.dashboard-ads.title': 'Dashboard Ads – Ferramenta Interna',
    'project.dashboard-ads.description': 'Dashboard de analytics para Meta & Google Ads. Reduziu o tempo de relatórios em 40%.',
    'project.dashboard-ads.detailed': 'Este projeto foi desenvolvido para otimizar o processo de análise de campanhas publicitárias. O dashboard integra dados do Meta Ads (Facebook/Instagram) e Google Ads em uma interface única e intuitiva. Implementei gráficos interativos, filtros avançados e relatórios automatizados que reduziram o tempo de análise de dados em 40%. A aplicação foi construída com Next.js para performance otimizada, PostgreSQL para gerenciamento de dados em tempo real, e Shadcn para uma interface moderna e responsiva.',

    'project.crm.title': 'Touch CRM – Sistema Omnichannel',
    'project.crm.description': 'Comunicação centralizada com WhatsApp e redes sociais. Aumentou a taxa de conversão em 25%.',
    'project.crm.detailed': 'Sistema CRM omnichannel que centraliza todas as comunicações com clientes em uma única plataforma. Integrei WhatsApp Business API, Facebook Messenger, Instagram Direct e outros canais de comunicação. O sistema automatiza respostas, organiza leads por funil de vendas e fornece métricas detalhadas de conversão. Usei Node.js para o backend, Chatwoot como base do sistema de chat, PostgreSQL para persistência de dados e n8n para automações complexas. O resultado foi um aumento de 25% na taxa de conversão.',

    'project.energy.title': 'Dashboard de Dados Energéticos',
    'project.energy.description': 'Coletou e analisou dados de energia solar da Cemig em tempo real, melhorando decisões com dashboards visuais.',
    'project.energy.detailed': 'Dashboard para monitoramento e análise de dados de energia solar em tempo real, coletando informações diretamente da API da Cemig. O sistema processa grandes volumes de dados energéticos, calcula métricas de eficiência e apresenta visualizações interativas para tomada de decisões. Implementei alertas automáticos para anomalias, relatórios de performance e projeções de economia. A arquitetura usa Next.js no frontend, PostgreSQL para armazenamento estruturado e n8n para pipelines de processamento de dados.',

    'project.celf.title': 'Site institucional CELF',
    'project.celf.description': 'Site institucional para CELF, empresa especializada em soluções completas para conservação e manutenção de espaços condominiais, comerciais e industriais.',
    'project.celf.detailed': 'O site foi estruturado seguindo a jornada do usuário: Descobrir - Apresentação da empresa e serviços - Confiar - Demonstração de credibilidade e experiência - Solicitar Proposta - Conversão do visitante em lead/cliente.',

    'project.meupet.title': 'MeuPet - App de Cuidados Pet',
    'project.meupet.description': 'App Flutter completo conectando tutores de pets a prestadores de serviços especializados com GPS, mapas customizados e sistema de agendamento.',
    'project.meupet.detailed': 'MeuPet é uma solução mobile abrangente desenvolvida em Flutter que conecta tutores de pets a prestadores de serviços especializados. O app possui um sistema completo de gerenciamento de pets com serviços de localização GPS, mapas customizados sem dependências de APIs externas, agendamento de consultas e acompanhamento de saúde. Funcionalidades principais incluem: localização em tempo real de veterinários, pet shops, serviços de banho e tosa, e hotéis para pets próximos; implementação de mapa customizado usando projeção Web Mercator; registro completo de pets com upload de fotos; calendário integrado para consultas; e sistema de autenticação seguro. Construído com Flutter 3.9.2+, Riverpod para gerenciamento de estado e GoRouter para navegação.',

    'project.mobs2.title': 'MOBS2 - App de Telemetria em Tempo Real',
    'project.mobs2.description': 'App Flutter de telemetria com rastreamento GPS em tempo real, cálculo de velocidade e visualização de dados de sensores.',
    'project.mobs2.detailed': 'MOBS2 é um estudo de caso técnico Flutter focado em coleta e visualização de dados de telemetria em tempo real. O app demonstra habilidades avançadas de desenvolvimento mobile através de rastreamento GPS, integração de sensores e processamento de dados. Funcionalidades incluem: localização GPS em tempo real com precisão aprimorada; cálculo dinâmico de velocidade (GPS + fallback manual); direção inteligente usando GPS + magnetômetro como backup; aceleração 3D via sensores do dispositivo (eixos X, Y, Z); métricas avançadas (velocidade máx/média, distância, tempo de sessão); mapa interativo com marcador rotativo baseado na direção; validação robusta de dados com filtragem de precisão GPS; detecção de outliers para leituras de velocidade; e performance otimizada para memória com dispose adequado de streams.',

    'project.social.title': 'Social Test - Rede Social Culinária',
    'project.social.description': 'App Flutter de rede social focado em conteúdo culinário com 8 tipos de posts, design Material 3 e arquitetura BLoC.',
    'project.social.detailed': 'Social Test é uma aplicação Flutter de rede social abrangente projetada especificamente para entusiastas culinários. O app permite que usuários compartilhem receitas, dicas de culinária, avaliações de restaurantes e conquistas culinárias através de um sistema sofisticado de posts. Funcionalidades principais incluem: 8 tipos especializados de posts (receitas, dicas, avaliações, conquistas, perguntas, inspirações, técnicas, ingredientes); sistema dinâmico de tags para organização de conteúdo; suporte a múltiplas imagens para posts; engajamento interativo (curtir, comentar, compartilhar, salvar); metadados para receitas (dificuldade, tempo de preparo, porções); sistema de design Material 3 customizado com paleta azul/branco/cinza; suporte a tema claro e escuro; layout responsivo para web e mobile; arquitetura limpa com padrão BLoC; integração Firebase pronta para produção.',

    // TypeAnimation
    'typeAnimation.nextjs': 'Next.js',
    'typeAnimation.nodejs': 'Node.js',
    'typeAnimation.typescript': 'TypeScript',
    'typeAnimation.react': 'React',
    'typeAnimation.postgresql': 'PostgreSQL',

    // Common
    'common.loading': 'Carregando...',
    'common.error': 'Erro',
    'common.success': 'Sucesso',
  },
  en: {
    // Hero Section
    'hero.greeting': 'Hi! I am',
    'hero.subtitle': 'I build',
    'hero.subtitle.highlight': 'modern, scalable',
    'hero.subtitle.with': 'web applications with',
    'hero.button.projects': 'My Projects',
    'hero.button.cv': 'Download CV',
    'hero.cv.portuguese': 'Currículo em Português',
    'hero.cv.english': 'Resume in English',
    'hero.profile.name': 'Gabriel Lopes',
    'hero.profile.position': 'Full Stack Developer',
    'hero.profile.bio': 'Developer passionate about creating modern and scalable web solutions, with 3+ years of experience.',

    // Navigation
    'nav.portfolio': 'Portfolio',
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',

    // Elevator Pitch Section
    'elevator.title': 'Skills that set me apart',
    'elevator.subtitle': 'I offer a premium developer experience with unique, high-quality skills that bridge technical expertise and business understanding.',
    'elevator.fullstack.title': 'Full-Stack Development',
    'elevator.fullstack.description': 'Building responsive UIs with React/Next.js and robust APIs with Node.js + PostgreSQL.',
    'elevator.marketing.title': 'Marketing Background',
    'elevator.marketing.description': 'Started in agencies as a designer, grew into web design, and later founded my own marketing shop, understanding business goals first.',
    'elevator.ai.title': 'AI Integration',
    'elevator.ai.description': 'Integrating ChatGPT and AI tools into workflows with n8n, creating real business automation.',
    'elevator.devops.title': 'DevOps Expertise',
    'elevator.devops.description': 'Deployments with Docker, VPS, and CI/CD pipelines for scalable applications.',
    'elevator.automation.title': 'Automation Solutions',
    'elevator.automation.description': 'Built WhatsApp automation connecting CRMs and business systems when no existing solutions were available.',
    'elevator.git.title': 'Git',
    'elevator.git.description': 'All versioning work is done through Git, with good commit practices.',

    // About Section
    'about.title': 'About Me',
    'about.subtitle': 'Developer passionate about creating innovative solutions',
    'about.description1': 'I\'m a full-stack developer passionate about technology and innovation, with over 2+ years of experience creating web solutions that positively impact businesses and users.',
    'about.description2': 'My journey began with curiosity about how websites work, and since then I\'ve dedicated myself to mastering modern technologies like React, Next.js, Node.js, and relational databases.',
    'about.description3': 'When I\'m not coding, I enjoy studying new technologies, contributing to open source projects, and always looking for ways to optimize processes and create exceptional user experiences.',
    'about.experience.title': 'Experience',
    'about.experience.description': '2+ years developing modern and scalable web solutions',
    'about.knowledge.title': 'Knowledge',
    'about.knowledge.description': 'Web Development fundamentals - IBM',
    'about.location.title': 'Location',
    'about.location.description': 'Minas Gerais, Brasil - Available for remote work',
    'about.passion.title': 'Passion',
    'about.passion.description': 'Creating digital experiences that make a difference in people\'s lives',
    'about.stats.years': 'Years of Experience',
    'about.stats.projects': 'Completed Projects',
    'about.stats.technologies': 'Technologies',
    'about.stats.dedication': 'Dedication',

    // Projects Section
    'projects.title': 'My Projects',
    'projects.button.more': 'See more',

    // Contact Section
    'contact.title': 'Let\'s Talk',
    'contact.subtitle': 'Have a project idea? Fill out the form below and I\'ll get back to you as soon as possible.',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    'contact.success': 'Message sent successfully!',

    // Project descriptions
    'project.dashboard-ads.title': 'Dashboard Ads – Internal Tool',
    'project.dashboard-ads.description': 'Analytics dashboard for Meta & Google Ads. Reduced reporting time by 40%.',
    'project.dashboard-ads.detailed': 'This project was developed to improve the advertising campaign analysis process. The dashboard integrates data from Meta Ads (Facebook/Instagram) and Google Ads into a single, intuitive interface. I implemented interactive charts, advanced filters, and automated reports that reduced data analysis time by 40%. The application was built with Next.js for optimized performance, PostgreSQL for real-time data management, and Shadcn for a modern, responsive interface.',

    'project.crm.title': 'Touch CRM – Omnichannel System',
    'project.crm.description': 'Centralized customer communication with WhatsApp & social media. Increased conversion rate by 25%.',
    'project.crm.detailed': 'An omnichannel CRM system that centralizes all customer communications in a single platform. I integrated WhatsApp Business API, Facebook Messenger, Instagram Direct, and other communication channels. The system automates responses, organizes leads by sales funnel, and provides detailed conversion metrics. I used Node.js for the backend, Chatwoot as the foundation of the chat system, PostgreSQL for data persistence, and n8n for complex automations. The result was a 25% increase in conversion rate.',

    'project.energy.title': 'Energy Data Dashboard',
    'project.energy.description': 'Collected and analyzed solar energy data from Cemig in real time, improving decisions with visual dashboards.',
    'project.energy.detailed': 'Dashboard for real-time solar energy data monitoring and analysis, collecting information directly from Cemig\'s API. The system processes large volumes of energy data, calculates efficiency metrics, and presents interactive visualizations for decision-making. I implemented automatic alerts for anomalies, performance reports, and savings projections. The architecture uses Next.js on the frontend, PostgreSQL for structured storage, and n8n for data processing pipelines.',

    'project.celf.title': 'CELF institutional website',
    'project.celf.description': 'Institutional website for CELF, company specialized in complete solutions for conservation and maintenance of condominium, commercial and industrial spaces.',
    'project.celf.detailed': 'The website was structured following the user journey: Discover - Presentation of the company and services - Trust - Demonstration of credibility and experience - Request a Proposal - Conversion of the visitor into a lead/customer.',

    'project.meupet.title': 'MeuPet - Pet Care Management App',
    'project.meupet.description': 'Complete Flutter app connecting pet owners to specialized services with GPS, custom maps, and appointment system.',
    'project.meupet.detailed': 'MeuPet is a comprehensive mobile solution developed in Flutter that connects pet owners to specialized service providers. The app features a complete pet management system with GPS location services, custom maps without external API dependencies, appointment scheduling, and health tracking. Key features include: real-time location of nearby veterinarians, pet shops, grooming services, and pet hotels; custom map implementation using Web Mercator projection; complete pet registration with photo upload; integrated calendar for appointments; and secure authentication system. Built with Flutter 3.9.2+, Riverpod for state management, and GoRouter for navigation, delivering a seamless experience across all mobile platforms.',

    'project.mobs2.title': 'MOBS2 - Real-time Telemetry App',
    'project.mobs2.description': 'Flutter telemetry app with real-time GPS tracking, speed calculation, and sensor data visualization.',
    'project.mobs2.detailed': 'MOBS2 is a technical case study Flutter application focused on real-time telemetry data collection and visualization. The app demonstrates advanced mobile development skills through GPS tracking, sensor integration, and data processing. Features include: real-time GPS location with enhanced precision; dynamic speed calculation (GPS + manual fallback); intelligent direction using GPS + magnetometer backup; 3D acceleration via device sensors (X, Y, Z axes); advanced metrics (max/average speed, distance, session time); interactive map with rotating marker based on direction; robust data validation with GPS precision filtering; outlier detection for speed readings; and memory-optimized performance with proper stream disposal. Built with Provider pattern for state management and OpenStreetMap for mapping without API dependencies.',

    'project.social.title': 'Social Test - Culinary Social Network',
    'project.social.description': 'Flutter social network app focused on culinary content with 8 types of posts, Material 3 design, and BLoC architecture.',
    'project.social.detailed': 'Social Test is a comprehensive Flutter social network application designed specifically for culinary enthusiasts. The app allows users to share recipes, cooking tips, restaurant reviews, and culinary achievements through a sophisticated posting system. Key features include: 8 specialized post types (recipes, tips, reviews, achievements, questions, inspirations, techniques, ingredients); dynamic tag system for content organization; multi-image support for posts; interactive engagement (like, comment, share, save); metadata for recipes (difficulty, prep time, servings); custom Material 3 design system with blue/white/gray palette; light and dark theme support; responsive layout for web and mobile; clean architecture with BLoC pattern; Firebase integration ready for production. The app includes 5 sample posts in Brazilian Portuguese demonstrating various content types, from sophisticated shrimp risotto recipes to professional pastry techniques.',

    // Footer
    'footer.rights': 'All rights reserved',
    'footer.made-with': 'Made with',
    'footer.and': 'and',

    // TypeAnimation
    'typeAnimation.nextjs': 'Next.js',
    'typeAnimation.nodejs': 'Node.js',
    'typeAnimation.typescript': 'TypeScript',
    'typeAnimation.react': 'React',
    'typeAnimation.postgresql': 'PostgreSQL',

    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
  }
}

interface LanguageProviderProps {
  children: ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('en')

  // Load saved language from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && (savedLanguage === 'pt' || savedLanguage === 'en')) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  const value = {
    language,
    setLanguage,
    t
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}