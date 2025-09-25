'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface QuickAction {
  id: string
  label: string
  action: () => void
  icon: string
}

export default function AgenticHelper() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [isListening, setIsListening] = useState(false)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  const quickActions: QuickAction[] = [
    {
      id: 'view-projects',
      label: 'Show my projects',
      action: () => router.push('/projects'),
      icon: '🚀'
    },
    {
      id: 'view-experiments',
      label: 'Browse experiments',
      action: () => router.push('/experiments'),
      icon: '🧪'
    },
    {
      id: 'download-resume',
      label: 'Download resume',
      action: () => window.open('/resume.pdf', '_blank'),
      icon: '📄'
    },
    {
      id: 'contact',
      label: 'Get in touch',
      action: () => window.open('mailto:hello@jacksimpson.dev', '_blank'),
      icon: '✉️'
    },
    {
      id: 'featured-projects',
      label: 'Show featured work',
      action: () => router.push('/projects?featured=true'),
      icon: '⭐'
    }
  ]

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleQuery(query.toLowerCase())
  }

  const handleQuery = (queryText: string) => {
    // Simple query matching - in a real app, this could be more sophisticated
    if (queryText.includes('project') || queryText.includes('work')) {
      router.push('/projects')
    } else if (queryText.includes('experiment') || queryText.includes('research')) {
      router.push('/experiments')
    } else if (queryText.includes('resume') || queryText.includes('cv')) {
      window.open('/resume.pdf', '_blank')
    } else if (queryText.includes('contact') || queryText.includes('email') || queryText.includes('touch')) {
      window.open('mailto:hello@jacksimpson.dev', '_blank')
    } else if (queryText.includes('home') || queryText.includes('about')) {
      router.push('/')
    } else {
      // Default to showing all projects if query isn't recognized
      router.push('/projects')
    }
    
    setQuery('')
    setIsOpen(false)
  }

  const toggleHelper = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Floating Helper Button */}
      <button
        onClick={toggleHelper}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full glass border border-glass-border hover:border-primary/50 transition-all duration-300 flex items-center justify-center group ${
          isOpen ? 'scale-110 subtle-glow' : 'hover:scale-105'
        }`}
        aria-label="Open assistant"
      >
        <div className={`transition-transform duration-300 ${isOpen ? 'rotate-45' : 'group-hover:scale-110'}`}>
          {isOpen ? (
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </div>
      </button>

      {/* Helper Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-80 max-w-[calc(100vw-3rem)]">
          <div className="glass border border-glass-border rounded-2xl p-6 shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text">How can I help?</h3>
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            </div>

            {/* Search Input */}
            <form onSubmit={handleSubmit} className="mb-4">
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask me anything..."
                  className="w-full px-4 py-3 bg-surface border border-glass-border rounded-lg text-text placeholder-text-muted focus:outline-none focus:border-primary transition-colors duration-200"
                />
                <button
                  type="submit"
                  disabled={!query.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-primary hover:text-secondary disabled:text-text-muted disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </form>

            {/* Quick Actions */}
            <div className="space-y-2">
              <p className="text-sm text-text-secondary mb-3">Quick actions:</p>
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  onClick={action.action}
                  className="w-full flex items-center space-x-3 px-3 py-2 text-left text-sm text-text-secondary hover:text-text hover:bg-surface-secondary rounded-lg transition-all duration-200"
                >
                  <span className="text-base">{action.icon}</span>
                  <span>{action.label}</span>
                </button>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-4 pt-4 border-t border-glass-border">
              <p className="text-xs text-text-muted text-center">
                Try asking: "Show me your projects" or "Download resume"
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm"
        />
      )}
    </>
  )
}