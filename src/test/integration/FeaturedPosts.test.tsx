import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import FeaturedPosts from '@/components/sections/FeaturedPosts'
import type { MDXEntry, Post } from '@/lib/mdx'

function makePost(overrides: Partial<Post & { href: string }> = {}): MDXEntry<Post> {
  const base: Post & { href: string } = {
    href: '/blog/test-post',
    title: 'Test Post Title',
    description: 'A test description',
    date: '2025-06-01',
    type: 'Article',
    icon: (() => null) as unknown as Post['icon'],
    author: { name: 'Frank Doka', image: { src: '/frank.png' } },
    tags: [],
    ...overrides,
  }
  return { ...base, metadata: base }
}

describe('FeaturedPosts', () => {
  it('renders section title', () => {
    render(<FeaturedPosts posts={[makePost()]} />)
    expect(screen.getByText('Build Logs & Deep Dives')).toBeInTheDocument()
  })

  it('renders the post title', () => {
    render(<FeaturedPosts posts={[makePost()]} />)
    expect(screen.getByText('Test Post Title')).toBeInTheDocument()
  })

  it('renders the post description', () => {
    render(<FeaturedPosts posts={[makePost()]} />)
    expect(screen.getByText('A test description')).toBeInTheDocument()
  })

  it('renders the post type', () => {
    render(<FeaturedPosts posts={[makePost({ type: 'Tutorial' })]} />)
    expect(screen.getByText('Tutorial')).toBeInTheDocument()
  })

  it('renders post year in a time element', () => {
    render(<FeaturedPosts posts={[makePost({ date: '2025-06-01' })]} />)
    const time = screen.getByText('2025').closest('time')
    expect(time).toHaveAttribute('dateTime', '2025')
  })

  it('post article links to post href', () => {
    render(<FeaturedPosts posts={[makePost({ href: '/blog/my-post' })]} />)
    const link = screen.getAllByRole('link').find((a) => a.getAttribute('href') === '/blog/my-post')
    expect(link).toBeDefined()
  })

  it('renders "See all posts" CTA linking to /blog', () => {
    render(<FeaturedPosts posts={[makePost()]} />)
    const cta = screen.getByRole('link', { name: /see all posts/i })
    expect(cta).toHaveAttribute('href', '/blog')
  })

  it('renders 2 posts with lg:grid-cols-2 layout', () => {
    const { container } = render(<FeaturedPosts posts={[makePost(), makePost({ href: '/blog/p2', title: 'P2' })]} />)
    const grid = container.querySelector('.lg\\:grid-cols-2')
    expect(grid).toBeInTheDocument()
  })

  it('renders 3 posts with lg:grid-cols-3 layout', () => {
    const posts = [
      makePost({ href: '/blog/p1', title: 'P1' }),
      makePost({ href: '/blog/p2', title: 'P2' }),
      makePost({ href: '/blog/p3', title: 'P3' }),
    ]
    const { container } = render(<FeaturedPosts posts={posts} />)
    const grid = container.querySelector('.lg\\:grid-cols-3')
    expect(grid).toBeInTheDocument()
  })
})
