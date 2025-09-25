import { clamp, lerp, formatDate, generateId, debounce } from '../utils'

describe('Utils', () => {
  describe('clamp', () => {
    it('clamps value between min and max', () => {
      expect(clamp(5, 0, 10)).toBe(5)
      expect(clamp(-5, 0, 10)).toBe(0)
      expect(clamp(15, 0, 10)).toBe(10)
    })
  })

  describe('lerp', () => {
    it('interpolates between start and end values', () => {
      expect(lerp(0, 10, 0.5)).toBe(5)
      expect(lerp(0, 10, 0)).toBe(0)
      expect(lerp(0, 10, 1)).toBe(10)
    })
  })

  describe('formatDate', () => {
    it('formats date string correctly', () => {
      const result = formatDate('2024-12-01')
      expect(result).toBe('December 1, 2024')
    })
  })

  describe('generateId', () => {
    it('generates a unique string ID', () => {
      const id1 = generateId()
      const id2 = generateId()
      
      expect(id1).toMatch(/^[a-z0-9]{9}$/)
      expect(id2).toMatch(/^[a-z0-9]{9}$/)
      expect(id1).not.toBe(id2)
    })
  })

  describe('debounce', () => {
    jest.useFakeTimers()
    
    it('debounces function calls', () => {
      const mockFn = jest.fn()
      const debouncedFn = debounce(mockFn, 100)
      
      debouncedFn()
      debouncedFn()
      debouncedFn()
      
      expect(mockFn).not.toHaveBeenCalled()
      
      jest.advanceTimersByTime(100)
      
      expect(mockFn).toHaveBeenCalledTimes(1)
    })

    afterEach(() => {
      jest.clearAllTimers()
    })
  })
})