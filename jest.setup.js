import '@testing-library/jest-dom'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    }
  },
  useSearchParams() {
    return {
      get: jest.fn(),
    }
  },
  usePathname() {
    return ''
  },
}))

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    return React.createElement('img', props)
  },
}))

// Mock @react-three/fiber and drei
jest.mock('@react-three/fiber', () => ({
  Canvas: ({ children }) => React.createElement('div', { 'data-testid': 'canvas' }, children),
  useFrame: jest.fn(),
  useThree: () => ({ camera: {}, scene: {} }),
}))

jest.mock('@react-three/drei', () => ({
  Float: ({ children }) => React.createElement('div', { 'data-testid': 'float' }, children),
  OrbitControls: () => React.createElement('div', { 'data-testid': 'orbit-controls' }),
  Text3D: ({ children }) => React.createElement('div', { 'data-testid': 'text3d' }, children),
}))

// Suppress console warnings during tests
global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
}