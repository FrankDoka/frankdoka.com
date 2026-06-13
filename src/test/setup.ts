import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

// jsdom doesn't implement IntersectionObserver; FadeIn uses it for scroll
// reveal. A no-op stub is enough — FadeIn always renders its children, the
// observer only toggles a CSS class.
class IntersectionObserverStub {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
  takeRecords = vi.fn(() => [])
}
vi.stubGlobal('IntersectionObserver', IntersectionObserverStub)

// jsdom doesn't implement matchMedia; components that read it (theme, reduced
// motion) need a stub so they don't throw during tests.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }),
})
