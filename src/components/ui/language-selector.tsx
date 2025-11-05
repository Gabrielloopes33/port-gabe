'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { useState, useEffect, useRef } from 'react'

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const languages = [
    {
      code: 'pt' as const,
      name: 'Português',
      flag: 'BR',
      shortName: 'PT'
    },
    {
      code: 'en' as const,
      name: 'English',
      flag: 'US',
      shortName: 'EN'
    }
  ]

  const currentLanguage = languages.find(lang => lang.code === language)

  // Fechar dropdown quando clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-md hover:border-white/40 hover:bg-white/20 transition-all duration-200 text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <div className={`w-8 h-6 rounded-sm flex items-center justify-center text-xs font-bold text-white border ${
          currentLanguage?.code === 'pt' ? 'bg-green-600 border-green-500' : 'bg-blue-600 border-blue-500'
        }`}>
          {currentLanguage?.flag}
        </div>
        <span className="text-sm font-medium">{currentLanguage?.shortName}</span>
        <svg 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
          <div className="absolute top-full mt-2 right-0 bg-gray-900/95 backdrop-blur-md border border-white/10 rounded-lg shadow-2xl z-20 min-w-[140px] overflow-hidden">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code)
                  setIsOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors cursor-pointer ${
                  language === lang.code
                    ? 'bg-blue-600/20 text-blue-400'
                    : 'text-white hover:bg-white/5'
                }`}
              >
                <div className={`w-8 h-6 rounded-sm flex items-center justify-center text-xs font-bold text-white border ${
                  lang.code === 'pt' ? 'bg-green-600 border-green-500' : 'bg-blue-600 border-blue-500'
                }`}>
                  {lang.flag}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{lang.name}</div>
                </div>
                {language === lang.code && (
                  <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
      )}
    </div>
  )
}