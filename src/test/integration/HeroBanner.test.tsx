import HeroBanner from '@/components/sections/HeroBanner'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

describe('HeroBanner', () => {
  it('renders an h1 with "Frank Doka"', () => {
    render(<HeroBanner />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Frank Doka')
  })

  it('renders "Infrastructure Architect." in the SlotWord placeholder', () => {
    const { container } = render(<HeroBanner />)
    const placeholder = container.querySelector('.invisible')
    expect(placeholder?.textContent).toBe('Infrastructure Architect.')
  })

  it('renders the SlotWord animated span', () => {
    const { container } = render(<HeroBanner />)
    expect(container.querySelector('[class*="theme-text-secondary"]')).toBeInTheDocument()
  })

  it('renders "Architect." text', () => {
    render(<HeroBanner />)
    expect(screen.getByText(/Architect\./)).toBeInTheDocument()
  })

  it('renders the SlotWord invisible placeholder', () => {
    const { container } = render(<HeroBanner />)
    expect(container.querySelector('.invisible')).toBeInTheDocument()
  })

  it('heading is inside a max-w container', () => {
    const { container } = render(<HeroBanner />)
    const outer = container.querySelector('.max-w-7xl')
    expect(outer).toBeInTheDocument()
  })
})
