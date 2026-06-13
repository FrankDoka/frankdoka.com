'use client'

import { usePagefindSearch } from '@/lib/usePagefindSearch'

export function InlineSearch() {
  const { query, setQuery, results, loading } = usePagefindSearch(5)

  return (
    <div className="mt-8 w-full max-w-md" aria-live="polite">
      <div className="flex items-center gap-3 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg-surface)] px-4 py-3">
        <svg className="h-4 w-4 shrink-0 fill-[var(--theme-text-muted)]" viewBox="0 0 20 20" aria-hidden="true">
          <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clipRule="evenodd" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for what you were looking for..."
          className="flex-1 bg-transparent text-sm text-[var(--theme-text-primary)] placeholder:text-[var(--theme-text-muted)] focus:outline-none"
        />
      </div>

      {loading && (
        <p className="mt-4 text-center text-sm text-[var(--theme-text-muted)]">Searching...</p>
      )}

      {!loading && query && results.length === 0 && (
        <p className="mt-4 text-center text-sm text-[var(--theme-text-muted)]">No results found.</p>
      )}

      {results.length > 0 && (
        <div className="mt-3 space-y-1 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg-surface)] p-2">
          {results.map((result) => (
            <a
              key={result.url}
              href={result.url}
              className="block rounded-lg px-3 py-2.5 transition hover:bg-[var(--theme-bg-hover)]"
            >
              <p className="text-sm font-medium text-[var(--theme-text-primary)]">{result.title}</p>
              <p
                className="mt-0.5 line-clamp-1 text-xs text-[var(--theme-text-secondary)]"
                dangerouslySetInnerHTML={{ __html: result.excerpt }}
              />
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
