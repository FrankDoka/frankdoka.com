import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { TagList, TagListItem } from '@/components/TagList'

describe('TagList', () => {
  it('renders a list with role="list"', () => {
    render(
      <TagList>
        <TagListItem>TypeScript</TagListItem>
      </TagList>
    )
    expect(screen.getByRole('list')).toBeInTheDocument()
  })

  it('applies custom className to list', () => {
    render(
      <TagList className="extra-class">
        <TagListItem>x</TagListItem>
      </TagList>
    )
    expect(screen.getByRole('list')).toHaveClass('extra-class')
  })

  it('renders multiple items', () => {
    render(
      <TagList>
        <TagListItem>TypeScript</TagListItem>
        <TagListItem>React</TagListItem>
        <TagListItem>Next.js</TagListItem>
      </TagList>
    )
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('Next.js')).toBeInTheDocument()
  })
})

describe('TagListItem', () => {
  it('renders children text', () => {
    render(
      <ul>
        <TagListItem>TypeScript</TagListItem>
      </ul>
    )
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
  })

  it('renders as a list item', () => {
    render(
      <ul>
        <TagListItem>tag</TagListItem>
      </ul>
    )
    expect(screen.getByRole('listitem')).toBeInTheDocument()
  })

  it('applies rounded pill classes', () => {
    render(
      <ul>
        <TagListItem>tag</TagListItem>
      </ul>
    )
    expect(screen.getByRole('listitem')).toHaveClass('rounded-full')
    expect(screen.getByRole('listitem').className).toContain('theme-bg-elevated')
  })

  it('applies custom className', () => {
    render(
      <ul>
        <TagListItem className="font-semibold">tag</TagListItem>
      </ul>
    )
    expect(screen.getByRole('listitem')).toHaveClass('font-semibold')
  })
})
