import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { NavigationBar } from '@/components/layout/Navigation'

describe('NavigationBar', () => {
  it('renders inside a nav element', () => {
    render(<NavigationBar />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('renders a Blog link', () => {
    render(<NavigationBar />)
    const blogLink = screen.getByRole('link', { name: 'Blog' })
    expect(blogLink).toBeInTheDocument()
  })

  it('Blog link points to /blog', () => {
    render(<NavigationBar />)
    expect(screen.getByRole('link', { name: 'Blog' })).toHaveAttribute('href', '/blog')
  })

  it('renders a Projects link', () => {
    render(<NavigationBar />)
    const projectsLink = screen.getByRole('link', { name: 'Projects' })
    expect(projectsLink).toBeInTheDocument()
  })

  it('Projects link points to /projects', () => {
    render(<NavigationBar />)
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '/projects')
  })

  it('renders nav links plus Doka brand link', () => {
    render(<NavigationBar />)
    expect(screen.getAllByRole('link')).toHaveLength(5)
  })

  it('renders Doka brand link to homepage', () => {
    render(<NavigationBar />)
    expect(screen.getByRole('link', { name: 'Go to homepage' })).toHaveAttribute('href', '/')
  })
})
