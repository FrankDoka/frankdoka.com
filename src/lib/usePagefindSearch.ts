'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

export interface SearchResult {
  url: string
  title: string
  excerpt: string
}

export function usePagefindSearch(maxResults = 8) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const pagefindRef = useRef<Record<string, (...args: unknown[]) => Promise<unknown>> | null>(null)

  const search = useCallback(async (term: string) => {
    if (!term.trim()) {
      setResults([])
      return
    }
    setLoading(true)
    try {
      if (!pagefindRef.current) {
        // @ts-expect-error pagefind is loaded from static assets at runtime
        const pf = await import(/* webpackIgnore: true */ '/pagefind/pagefind.js')
        await pf.init()
        pagefindRef.current = pf
      }
      const pf = pagefindRef.current!
      const searchResult = await pf.search(term) as { results: Array<{ data: () => Promise<Record<string, unknown>> }> }
      const data = await Promise.all(searchResult.results.slice(0, maxResults).map((r) => r.data()))
      setResults(
        data.map((d) => ({
          url: d.url as string,
          title: (d.meta as Record<string, string>)?.title ?? (d.url as string),
          excerpt: d.excerpt as string,
        }))
      )
    } catch {
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [maxResults])

  useEffect(() => {
    const timeout = setTimeout(() => search(query), 200)
    return () => clearTimeout(timeout)
  }, [query, search])

  return { query, setQuery, results, loading }
}
