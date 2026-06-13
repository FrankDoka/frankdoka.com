import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Footer } from '@/components/layout/Footer'

describe('Footer', () => {
  it('renders a home logo link', () => {
    render(<Footer />)
    const homeLinks = screen.getAllByRole('link', { name: 'Home' })
    expect(homeLinks.length).toBeGreaterThanOrEqual(1)
  })

  it('all Home links point to /', () => {
    render(<Footer />)
    const homeLinks = screen.getAllByRole('link', { name: 'Home' })
    homeLinks.forEach((link) => expect(link).toHaveAttribute('href', '/'))
  })

  it('renders a Blog nav link', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: 'Blog' })).toHaveAttribute('href', '/blog')
  })

  it('renders a Projects nav link in Site Map', () => {
    render(<Footer />)
    const projectsLinks = screen.getAllByRole('link', { name: 'Projects' })
    expect(projectsLinks.length).toBeGreaterThanOrEqual(1)
    expect(projectsLinks[0]).toHaveAttribute('href', '/projects')
  })

  it('renders Site Map heading', () => {
    render(<Footer />)
    expect(screen.getByText('Site Map')).toBeInTheDocument()
  })

  it('renders all site map links', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about')
    expect(screen.getByRole('link', { name: 'Blog' })).toHaveAttribute('href', '/blog')
    expect(screen.getByRole('link', { name: 'Toolbox' })).toHaveAttribute('href', '/toolbox')
  })

  it('renders copyright with current year', () => {
    render(<Footer />)
    const year = new Date().getFullYear()
    expect(screen.getByText(`© Frank Doka ${year}`)).toBeInTheDocument()
  })

  it('renders "Follow me" social media section heading', () => {
    render(<Footer />)
    expect(screen.getByText('Follow me')).toBeInTheDocument()
  })

  it('renders GitHub social link', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', 'https://github.com/FrankDoka')
  })
})
