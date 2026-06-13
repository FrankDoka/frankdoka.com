import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { PageIntro } from '@/components/PageIntro'

describe('PageIntro', () => {
  it('renders the eyebrow text', () => {
    render(
      <PageIntro eyebrow="Blog" title="Articles">
        <p>desc</p>
      </PageIntro>
    )
    expect(screen.getByText('Blog')).toBeInTheDocument()
  })

  it('applies theme color class to eyebrow', () => {
    render(
      <PageIntro eyebrow="Blog" title="Articles">
        <p>desc</p>
      </PageIntro>
    )
    expect(screen.getByText('Blog').className).toContain('theme-text-secondary')
  })

  it('eyebrow is not part of the h1', () => {
    render(
      <PageIntro eyebrow="Blog" title="Articles">
        <p>desc</p>
      </PageIntro>
    )
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).not.toHaveTextContent('Blog')
  })

  it('renders the title as h1', () => {
    render(
      <PageIntro eyebrow="Blog" title="Articles and More">
        <p>desc</p>
      </PageIntro>
    )
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(screen.getByText('Articles and More')).toBeInTheDocument()
  })

  it('renders children below the title', () => {
    render(
      <PageIntro eyebrow="Blog" title="Title">
        <p>Child content here</p>
      </PageIntro>
    )
    expect(screen.getByText('Child content here')).toBeInTheDocument()
  })

  it('applies text-center class when centered=true', () => {
    const { container } = render(
      <PageIntro eyebrow="e" title="t" centered>
        <p>c</p>
      </PageIntro>
    )
    // The outer Container gets the text-center class
    const outer = container.firstChild as HTMLElement
    expect(outer).toHaveClass('text-center')
  })
})
