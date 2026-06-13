import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SocialMedia } from '@/components/SocialMedia'

describe('SocialMedia', () => {
  it('renders a list with role="list"', () => {
    render(<SocialMedia />)
    expect(screen.getByRole('list')).toBeInTheDocument()
  })

  it('renders two social links', () => {
    render(<SocialMedia />)
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
  })

  it('renders GitHub link with correct aria-label', () => {
    render(<SocialMedia />)
    expect(screen.getByRole('link', { name: 'GitHub' })).toBeInTheDocument()
  })

  it('GitHub link points to correct URL', () => {
    render(<SocialMedia />)
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', 'https://github.com/FrankDoka')
  })

  it('renders LinkedIn link with correct aria-label', () => {
    render(<SocialMedia />)
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toBeInTheDocument()
  })

  it('LinkedIn link points to correct URL', () => {
    render(<SocialMedia />)
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/frank-doka-64951828b/'
    )
  })

  it('applies text color class', () => {
    render(<SocialMedia />)
    expect(screen.getByRole('list').className).toContain('theme-text-primary')
  })
})
