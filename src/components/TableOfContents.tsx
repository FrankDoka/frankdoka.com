'use client'

import { useEffect, useState } from 'react'

interface Heading {
  id: string
  text: string
  level: number
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('article h2[id], article h3[id]'))
    const items: Heading[] = elements.map((el) => ({
      id: el.id,
      text: el.textContent ?? '',
      level: el.tagName === 'H2' ? 2 : 3,
    }))

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting)
        if (visible) setActiveId(visible.target.id)
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0.1 }
    )

    elements.forEach((el) => observer.observe(el))
    queueMicrotask(() => setHeadings(items))
    return () => observer.disconnect()
  }, [])

  if (headings.length < 3) return null

  return (
    <nav aria-label="Table of contents" className="hidden xl:block">
      <div className="sticky top-24">
        <p className="text-sm font-semibold text-[var(--theme-text-primary)]">On this page</p>
        <ul className="mt-3 space-y-2 border-l border-[var(--theme-border-subtle)]">
          {headings.map((heading) => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                className={`block border-l-2 text-sm transition-colors ${
                  heading.level === 3 ? 'pl-6' : 'pl-4'
                } ${
                  activeId === heading.id
                    ? 'border-[var(--theme-text-primary)] text-[var(--theme-text-primary)]'
                    : 'border-transparent text-[var(--theme-text-muted)] hover:text-[var(--theme-text-secondary)]'
                }`}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
