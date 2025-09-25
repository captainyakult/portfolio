'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import type { NavigationItem } from '@/types'

const navigationItems: NavigationItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Experiments', href: '/experiments' },
]

export default function Navigation() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass border-b border-glass-border backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-xl font-bold gradient-text hover:scale-105 transition-transform duration-200"
          >
            JS
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 hover:text-primary ${
                    isActive 
                      ? 'text-primary' 
                      : 'text-text-secondary hover:text-text'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full" />
                  )}
                </Link>
              )
            })}
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden">
            <MobileMenu items={navigationItems} currentPath={pathname} />
          </div>

          {/* Call to Action */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/resume.pdf"
              target="_blank"
              className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text transition-colors duration-200"
            >
              Resume
            </Link>
            <Link
              href="mailto:hello@jacksimpson.dev"
              className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-primary/25"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

function MobileMenu({ items, currentPath }: { items: NavigationItem[], currentPath: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-text-secondary hover:text-text transition-colors duration-200"
        aria-label="Toggle mobile menu"
      >
        <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1">
          <span className={`w-6 h-0.5 bg-current transition-transform duration-200 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-0.5 bg-current transition-opacity duration-200 ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-0.5 bg-current transition-transform duration-200 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </div>
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 top-16 z-40 md:hidden">
          <div className="glass border-t border-glass-border">
            <div className="px-6 py-4 space-y-4">
              {items.map((item) => {
                const isActive = currentPath === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2 text-base font-medium transition-colors duration-200 ${
                      isActive 
                        ? 'text-primary' 
                        : 'text-text-secondary hover:text-text'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
              <div className="pt-4 border-t border-glass-border space-y-2">
                <Link
                  href="/resume.pdf"
                  target="_blank"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 text-base font-medium text-text-secondary hover:text-text transition-colors duration-200"
                >
                  Resume
                </Link>
                <Link
                  href="mailto:hello@jacksimpson.dev"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 text-base font-medium bg-gradient-to-r from-primary to-secondary text-white rounded-lg text-center"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}