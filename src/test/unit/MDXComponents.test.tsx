import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MDXComponents } from '@/components/MDXComponents'

describe('MDXComponents.TopTip', () => {
  it('renders "Top tip" label', () => {
    render(<MDXComponents.TopTip>Some tip</MDXComponents.TopTip>)
    expect(screen.getByText('Top tip')).toBeInTheDocument()
  })

  it('renders children content', () => {
    render(<MDXComponents.TopTip>Helpful advice</MDXComponents.TopTip>)
    expect(screen.getByText('Helpful advice')).toBeInTheDocument()
  })

  it('applies my-10 and pl-8 classes', () => {
    const { container } = render(<MDXComponents.TopTip>x</MDXComponents.TopTip>)
    expect(container.firstChild).toHaveClass('my-10', 'pl-8')
  })
})

describe('MDXComponents.Typography', () => {
  it('renders children', () => {
    render(<MDXComponents.Typography>Body text</MDXComponents.Typography>)
    expect(screen.getByText('Body text')).toBeInTheDocument()
  })

  it('applies the typography class', () => {
    const { container } = render(<MDXComponents.Typography>x</MDXComponents.Typography>)
    expect(container.firstChild).toHaveClass('typography')
  })

  it('applies custom className', () => {
    const { container } = render(<MDXComponents.Typography className="extra">x</MDXComponents.Typography>)
    expect(container.firstChild).toHaveClass('extra')
  })
})

describe('MDXComponents.wrapper', () => {
  it('renders children', () => {
    render(<MDXComponents.wrapper><p>Hello</p></MDXComponents.wrapper>)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('renders as a div', () => {
    const { container } = render(<MDXComponents.wrapper>x</MDXComponents.wrapper>)
    expect(container.firstChild?.nodeName).toBe('DIV')
  })
})

describe('MDXComponents.table', () => {
  it('renders a table element', () => {
    render(
      <MDXComponents.table>
        <tbody>
          <tr><td>cell</td></tr>
        </tbody>
      </MDXComponents.table>
    )
    expect(screen.getByRole('table')).toBeInTheDocument()
  })

  it('wraps table in an overflow div', () => {
    const { container } = render(
      <MDXComponents.table>
        <tbody><tr><td>x</td></tr></tbody>
      </MDXComponents.table>
    )
    expect(container.firstChild).toHaveClass('my-10')
  })
})

describe('MDXComponents.TagList', () => {
  it('renders a list', () => {
    render(
      <MDXComponents.TagList>
        <li>Item</li>
      </MDXComponents.TagList>
    )
    expect(screen.getByRole('list')).toBeInTheDocument()
  })

  it('applies my-6 class', () => {
    render(
      <MDXComponents.TagList>
        <li>x</li>
      </MDXComponents.TagList>
    )
    expect(screen.getByRole('list')).toHaveClass('my-6')
  })
})
