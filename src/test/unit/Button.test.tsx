import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Button } from '@/components/Button'

describe('Button', () => {
  it('renders as button when no href provided', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('renders as anchor when href provided', () => {
    render(<Button href="/blog">Go</Button>)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/blog')
  })

  it('renders children text inside a span', () => {
    render(<Button>Label</Button>)
    const span = screen.getByText('Label').closest('span')
    expect(span).toBeInTheDocument()
  })

  it('applies default styles', () => {
    render(<Button>x</Button>)
    expect(screen.getByRole('button')).toHaveClass('rounded-full', 'font-semibold')
  })

  it('applies inverted styles when invert=true', () => {
    render(<Button invert>x</Button>)
    expect(screen.getByRole('button')).toHaveClass('rounded-full', 'font-semibold')
  })

  it('applies custom className', () => {
    render(<Button className="extra">x</Button>)
    expect(screen.getByRole('button')).toHaveClass('extra')
  })
})
