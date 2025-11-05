'use client'

import { TypeAnimation } from 'react-type-animation'
import { useLanguage } from '@/contexts/LanguageContext'

export function TypeAnimationComponent() {
  const { t } = useLanguage()

  return (
    <TypeAnimation
      sequence={[
        t('typeAnimation.nextjs'),
        1000,
        t('typeAnimation.nodejs'),
        1000,
        t('typeAnimation.typescript'),
        1000,
        t('typeAnimation.react'),
        1000,
        t('typeAnimation.postgresql'),
        1000,
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: '1.5em', display: 'inline-block', color: '#a3a3ff' }}
      repeat={Infinity}
    />
  )
}