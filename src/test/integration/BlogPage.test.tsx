import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import React from 'react'
import type { MDXEntry, Post } from '@/lib/mdx'

vi.mock('@/lib/mdx', () => ({
  loadPosts: vi.fn(),
  loadProjects: vi.fn(),
  BlogPost: {
    type: 'Article',
    author: { name: 'Frank Doka', image: { src: '/frank.png' } },
  },
}))

vi.mock('@/components/Button', () => ({
  Button: ({ href, children, className, ...rest }: { href?: string; children?: React.ReactNode; className?: string; [key: string]: unknown }) => (
    <a href={href} className={className} {...rest}>{children}</a>
  ),
}))

function makePost(overrides: Partial<Post & { href: string }> = {}): MDXEntry<Post> {
  const base: Post & { href: string } = {
    href: '/blog/test-post',
    title: 'My Article Title',
    description: 'Article description.',
    date: '2025-06-01',
    type: 'Article',
    icon: (() => null) as unknown as Post['icon'],
    author: { name: 'Frank Doka', image: { src: '/frank.png' } },
    tags: [],
    ...overrides,
  }
  return { ...base, metadata: base }
}

describe('Blog page', () => {
  let loadPosts: ReturnType<typeof vi.fn>

  beforeEach(async () => {
    const mdx = await import('@/lib/mdx')
    loadPosts = vi.mocked(mdx.loadPosts)
    loadPosts.mockResolvedValue([makePost()])
  })

  it('renders the Blog eyebrow', async () => {
    const Blog = (await import('@/app/blog/page')).default
    const jsx = await Blog()
    render(jsx)
    expect(screen.getByText('Blog')).toBeInTheDocument()
  })

  it('renders the page title heading', async () => {
    const Blog = (await import('@/app/blog/page')).default
    const jsx = await Blog()
    render(jsx)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('renders article title as a link', async () => {
    const Blog = (await import('@/app/blog/page')).default
    const jsx = await Blog()
    render(jsx)
    expect(screen.getByRole('link', { name: 'My Article Title' })).toBeInTheDocument()
  })

  it('renders formatted date for each article', async () => {
    const Blog = (await import('@/app/blog/page')).default
    const jsx = await Blog()
    render(jsx)
    expect(screen.getByText('June 1, 2025')).toBeInTheDocument()
  })

  it('renders author name', async () => {
    const Blog = (await import('@/app/blog/page')).default
    const jsx = await Blog()
    render(jsx)
    expect(screen.getByText('Frank Doka')).toBeInTheDocument()
  })

  it('renders article description', async () => {
    const Blog = (await import('@/app/blog/page')).default
    const jsx = await Blog()
    render(jsx)
    expect(screen.getByText('Article description.')).toBeInTheDocument()
  })

  it('renders a "Read more" link per article', async () => {
    loadPosts.mockResolvedValue([makePost(), makePost({ href: '/blog/p2', title: 'P2' })])
    const Blog = (await import('@/app/blog/page')).default
    const jsx = await Blog()
    render(jsx)
    expect(screen.getAllByRole('link', { name: /Read more/i })).toHaveLength(2)
  })

  it('renders empty state gracefully with no posts', async () => {
    loadPosts.mockResolvedValue([])
    const Blog = (await import('@/app/blog/page')).default
    const jsx = await Blog()
    render(jsx)
    expect(screen.getByText('Blog')).toBeInTheDocument()
    expect(screen.queryByRole('article')).not.toBeInTheDocument()
  })
})
