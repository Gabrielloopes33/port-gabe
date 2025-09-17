import './globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import { BackgroundPaths } from '@/components/BackgroundPaths'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Meu portfolio pessoal',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <body className="min-h-screen bg-[#010101] text-white">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <BackgroundPaths svgOptions={{ duration: 8 }} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}