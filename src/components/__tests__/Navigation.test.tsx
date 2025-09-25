import { render, screen, fireEvent } from '@testing-library/react'
import Navigation from '../Navigation'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

describe('Navigation', () => {
  it('renders navigation items', () => {
    render(<Navigation />)
    
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('Experiments')).toBeInTheDocument()
  })

  it('renders logo', () => {
    render(<Navigation />)
    
    expect(screen.getByText('JS')).toBeInTheDocument()
  })

  it('renders call-to-action buttons', () => {
    render(<Navigation />)
    
    expect(screen.getByText('Resume')).toBeInTheDocument()
    expect(screen.getByText('Get in Touch')).toBeInTheDocument()
  })

  it('shows active state for current page', () => {
    render(<Navigation />)
    
    const homeLink = screen.getByText('Home')
    expect(homeLink).toHaveClass('text-primary')
  })

  it('toggles mobile menu', () => {
    render(<Navigation />)
    
    const mobileToggle = screen.getByRole('button', { name: /toggle mobile menu/i })
    fireEvent.click(mobileToggle)
    
    // Should show mobile menu items
    const mobileHomeLink = screen.getAllByText('Home')
    expect(mobileHomeLink.length).toBeGreaterThan(1) // Desktop + mobile
  })
})