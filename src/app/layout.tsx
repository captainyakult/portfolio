import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import AgenticHelper from '@/components/AgenticHelper'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Jack Simpson - Interactive Portfolio',
  description: 'Portfolio showcasing 3D visualizations, interactive web engineering, AI experiments, and robotics projects.',
  keywords: ['portfolio', '3D visualization', 'web development', 'AI', 'machine learning', 'robotics'],
  authors: [{ name: 'Jack Simpson' }],
  creator: 'Jack Simpson',
  metadataBase: new URL('https://jacksimpson.dev'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://jacksimpson.dev',
    siteName: 'Jack Simpson Portfolio',
    title: 'Jack Simpson - Interactive Portfolio',
    description: 'Portfolio showcasing 3D visualizations, interactive web engineering, AI experiments, and robotics projects.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Jack Simpson Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jack Simpson - Interactive Portfolio',
    description: 'Portfolio showcasing 3D visualizations, interactive web engineering, AI experiments, and robotics projects.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen bg-background text-text">
          <Navigation />
          <main className="relative">
            {children}
          </main>
          <AgenticHelper />
        </div>
      </body>
    </html>
  )
}