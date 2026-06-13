import { render, screen, act } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { SlotWord } from '@/components/SlotWord'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'

vi.mock('@/lib/usePrefersReducedMotion', () => ({
  usePrefersReducedMotion: vi.fn(() => false),
}))

const WORDS = ['Builder.', 'Hacker.', 'Maker.', 'Nerd.', 'Coder.']
const FINAL = 'Software Engineer.'

describe('SlotWord', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.mocked(usePrefersReducedMotion).mockReturnValue(false)
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('renders an invisible placeholder with the final word', () => {
    const { container } = render(<SlotWord words={WORDS} final={FINAL} />)
    const placeholder = container.querySelector('.invisible')
    expect(placeholder?.textContent).toBe(FINAL)
  })

  it('renders the animated span with theme styling', () => {
    const { container } = render(<SlotWord words={WORDS} final={FINAL} />)
    expect(container.querySelector('[class*="theme-text-secondary"]')).toBeInTheDocument()
  })

  it('renders with empty content initially (no flash on SSR)', () => {
    const { container } = render(<SlotWord words={WORDS} final={FINAL} />)
    expect(container.querySelector('[class*="theme-text-secondary"]')?.textContent).toBe('')
  })

  it('lands on the final word after all timers complete', () => {
    render(<SlotWord words={WORDS} final={FINAL} startDelay={100} beat={100} />)
    act(() => {
      vi.advanceTimersByTime(1000)
    })
    // Both the invisible placeholder and the animated span show the final word
    expect(screen.getAllByText(FINAL).length).toBeGreaterThanOrEqual(2)
  })

  it('shows the final word immediately when reduced motion is preferred', () => {
    vi.mocked(usePrefersReducedMotion).mockReturnValue(true)
    render(<SlotWord words={WORDS} final={FINAL} />)
    expect(screen.getAllByText(FINAL).length).toBeGreaterThanOrEqual(2)
  })

  it('does not animate any pool words when reduced motion is preferred', () => {
    vi.mocked(usePrefersReducedMotion).mockReturnValue(true)
    render(<SlotWord words={WORDS} final={FINAL} startDelay={100} beat={100} />)
    act(() => {
      vi.advanceTimersByTime(1000)
    })
    // Still only shows FINAL, no intermediate words
    const allText = screen.getAllByText(FINAL)
    expect(allText.length).toBeGreaterThanOrEqual(2)
    WORDS.forEach((w) => {
      expect(screen.queryAllByText(w).length).toBe(0)
    })
  })
})
