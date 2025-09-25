import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AgenticHelper from '../AgenticHelper'

// Mock next/navigation
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

describe('AgenticHelper', () => {
  beforeEach(() => {
    mockPush.mockClear()
  })

  it('renders helper button', () => {
    render(<AgenticHelper />)
    
    const button = screen.getByRole('button', { name: /open assistant/i })
    expect(button).toBeInTheDocument()
  })

  it('opens helper panel when button is clicked', async () => {
    render(<AgenticHelper />)
    
    const button = screen.getByRole('button', { name: /open assistant/i })
    fireEvent.click(button)
    
    expect(screen.getByText('How can I help?')).toBeInTheDocument()
  })

  it('displays quick actions when opened', () => {
    render(<AgenticHelper />)
    
    const button = screen.getByRole('button', { name: /open assistant/i })
    fireEvent.click(button)
    
    expect(screen.getByText('Show my projects')).toBeInTheDocument()
    expect(screen.getByText('Browse experiments')).toBeInTheDocument()
    expect(screen.getByText('Download resume')).toBeInTheDocument()
    expect(screen.getByText('Get in touch')).toBeInTheDocument()
  })

  it('executes quick action for projects', () => {
    render(<AgenticHelper />)
    
    const button = screen.getByRole('button', { name: /open assistant/i })
    fireEvent.click(button)
    
    const projectsAction = screen.getByText('Show my projects')
    fireEvent.click(projectsAction)
    
    expect(mockPush).toHaveBeenCalledWith('/projects')
  })

  it('handles search query submission', async () => {
    const user = userEvent.setup()
    render(<AgenticHelper />)
    
    const button = screen.getByRole('button', { name: /open assistant/i })
    fireEvent.click(button)
    
    const input = screen.getByPlaceholderText('Ask me anything...')
    await user.type(input, 'show projects')
    
    const form = input.closest('form')!
    fireEvent.submit(form)
    
    expect(mockPush).toHaveBeenCalledWith('/projects')
  })

  it('closes when backdrop is clicked', () => {
    render(<AgenticHelper />)
    
    const button = screen.getByRole('button', { name: /open assistant/i })
    fireEvent.click(button)
    
    expect(screen.getByText('How can I help?')).toBeInTheDocument()
    
    // Click backdrop
    const backdrop = document.querySelector('.fixed.inset-0.z-30')
    fireEvent.click(backdrop!)
    
    expect(screen.queryByText('How can I help?')).not.toBeInTheDocument()
  })
})