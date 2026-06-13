import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Logo, Logomark, LogoText } from '@/components/Logo'

describe('Logomark', () => {
  it('renders an svg', () => {
    const { container } = render(<Logomark />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('applies theme-aware fill to rect', () => {
    const { container } = render(<Logomark />)
    const rect = container.querySelector('rect')
    expect(rect?.className.baseVal ?? rect?.getAttribute('class')).toContain('theme-text-primary')
  })

  it('applies w-8 class when filled=true', () => {
    const { container } = render(<Logomark filled />)
    const rect = container.querySelector('rect')
    expect(rect?.className.baseVal ?? rect?.getAttribute('class')).toContain('w-8')
  })

  it('applies w-0 class when not filled', () => {
    const { container } = render(<Logomark />)
    const rect = container.querySelector('rect')
    expect(rect?.className.baseVal ?? rect?.getAttribute('class')).toContain('w-0')
  })
})

describe('LogoText', () => {
  it('renders an svg', () => {
    const { container } = render(<LogoText />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('applies className to text element', () => {
    const { container } = render(<LogoText className="fill-red-500" />)
    const textEl = container.querySelector('text')
    expect(textEl).toBeInTheDocument()
    expect(textEl?.getAttribute('class')).toContain('fill-red-500')
  })
})

describe('Logo', () => {
  it('renders an svg', () => {
    const { container } = render(<Logo />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('is aria-hidden (decorative)', () => {
    const { container } = render(<Logo />)
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
  })

  it('adds group/logo class when fillOnHover=true', () => {
    const { container } = render(<Logo fillOnHover />)
    expect(container.querySelector('svg')).toHaveClass('group/logo')
  })

  it('does not add group/logo class by default', () => {
    const { container } = render(<Logo />)
    expect(container.querySelector('svg')).not.toHaveClass('group/logo')
  })

  it('forwards custom className', () => {
    const { container } = render(<Logo className="h-8" />)
    expect(container.querySelector('svg')).toHaveClass('h-8')
  })
})
