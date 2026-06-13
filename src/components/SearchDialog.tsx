'use client'

import { useEffect, useRef, useState } from 'react'
import { usePagefindSearch } from '@/lib/usePagefindSearch'

export function SearchButton() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(true)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Search"
        className="group -m-2.5 rounded-full p-2.5 transition hover:bg-[var(--theme-bg-hover)]"
      >
        <svg className="h-5 w-5 fill-[var(--theme-text-primary)] transition group-hover:fill-[var(--theme-text-secondary)]" viewBox="0 0 20 20" aria-hidden="true">
          <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clipRule="evenodd" />
        </svg>
      </button>
      {open && <SearchDialog onClose={() => setOpen(false)} />}
    </>
  )
}

function SearchDialog({ onClose }: { onClose: () => void }) {
  const { query, setQuery, results, loading } = usePagefindSearch(8)
  const inputRef = useRef<HTMLInputElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 pt-[15vh] backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-label="Search"
        className="w-full max-w-lg rounded-2xl border shadow-2xl"
        style={{ backgroundColor: 'var(--theme-bg-surface)', borderColor: 'var(--theme-border)' }}
      >
        <div className="flex items-center gap-3 border-b border-[var(--theme-border-subtle)] px-4 py-3">
          <svg className="h-5 w-5 shrink-0 fill-[var(--theme-text-muted)]" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clipRule="evenodd" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts, projects..."
            className="flex-1 bg-transparent text-sm text-[var(--theme-text-primary)] placeholder:text-[var(--theme-text-muted)] focus:outline-none"
          />
          <kbd className="hidden rounded border border-[var(--theme-border)] px-1.5 py-0.5 text-[10px] text-[var(--theme-text-muted)] sm:inline">
            ESC
          </kbd>
        </div>

        <div className="max-h-80 overflow-y-auto p-2" aria-live="polite">
          {loading && (
            <p className="px-3 py-6 text-center text-sm text-[var(--theme-text-muted)]">Searching...</p>
          )}
          {!loading && query && results.length === 0 && (
            <p className="px-3 py-6 text-center text-sm text-[var(--theme-text-muted)]">No results found.</p>
          )}
          {!loading && !query && (
            <p className="px-3 py-6 text-center text-sm text-[var(--theme-text-muted)]">
              Type to search across all pages.
            </p>
          )}
          {results.map((result) => (
            <a
              key={result.url}
              href={result.url}
              onClick={onClose}
              className="block rounded-lg px-3 py-2.5 transition hover:bg-[var(--theme-bg-hover)]"
            >
              <p className="text-sm font-medium text-[var(--theme-text-primary)]">{result.title}</p>
              <p
                className="mt-0.5 line-clamp-2 text-xs text-[var(--theme-text-secondary)]"
                dangerouslySetInnerHTML={{ __html: result.excerpt }}
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
