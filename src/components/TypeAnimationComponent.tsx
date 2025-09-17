'use client'

import { TypeAnimation } from 'react-type-animation'

export function TypeAnimationComponent() {
  return (
    <TypeAnimation
      sequence={[
        'Next.js ',
        1000,
        'Node.js',
        1000,
        'TypeScript',
        1000,
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: '1.5em', display: 'inline-block', color: '#a3a3ff' }}
      repeat={Infinity}
    />
  )
}