import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Container } from '@/components/layout/Container'

describe('Container', () => {
  it('renders children', () => {
    render(<Container>child content</Container>)
    expect(screen.getByText('child content')).toBeInTheDocument()
  })

  it('renders as div by default', () => {
    const { container } = render(<Container>x</Container>)
    expect(container.firstChild?.nodeName).toBe('DIV')
  })

  it('renders as specified element via as prop', () => {
    const { container } = render(<Container as="footer">x</Container>)
    expect(container.firstChild?.nodeName).toBe('FOOTER')
  })

  it('applies max-width and auto-margin classes to outer element', () => {
    const { container } = render(<Container>x</Container>)
    expect(container.firstChild).toHaveClass('mx-auto')
    expect(container.firstChild).toHaveClass('max-w-7xl')
  })

  it('applies custom className to outer element', () => {
    const { container } = render(<Container className="my-class">x</Container>)
    expect(container.firstChild).toHaveClass('my-class')
  })

  it('inner wrapper has max-w-2xl class', () => {
    const { container } = render(<Container>x</Container>)
    const inner = container.firstChild?.firstChild as HTMLElement
    expect(inner).toHaveClass('mx-auto')
    expect(inner).toHaveClass('max-w-2xl')
  })
})
