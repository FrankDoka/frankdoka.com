'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

type Theme = 'dark' | 'light'

const THEME_COLORS = {
  dark: {
    bgPage: '#0a0a0a',
    bgSurface: '#171717',
    textPrimary: '#ffffff',
  },
  light: {
    bgPage: '#f8f8f8',
    bgSurface: '#efefef',
    textPrimary: '#1a1a1a',
  },
}

const ThemeContext = createContext<{
  theme: Theme
  toggleTheme: () => void
}>({
  theme: 'dark',
  toggleTheme: () => {},
})

export function useTheme() {
  return useContext(ThemeContext)
}

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'
  // localStorage/matchMedia can throw "The operation is insecure" (a SecurityError
  // DOMException) when a browser blocks storage access (e.g. strict tracking
  // protection or disabled cookies). Guard every access so a blocked browser
  // degrades to the default theme instead of crashing the whole app on mount.
  try {
    const stored = localStorage.getItem('theme') as Theme | null
    if (stored === 'light' || stored === 'dark') return stored
  } catch {}
  try {
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  } catch {}
  return 'dark'
}

function applyTheme(theme: Theme) {
  const colors = THEME_COLORS[theme]
  document.documentElement.setAttribute('data-theme', theme)
  document.body.style.backgroundColor = colors.bgPage
  document.body.style.color = colors.textPrimary
  document.querySelectorAll<HTMLElement>('[data-theme-surface]').forEach((el) => {
    el.style.backgroundColor = colors.bgSurface
  })
  document.querySelectorAll<HTMLElement>('[data-theme-page]').forEach((el) => {
    el.style.backgroundColor = colors.bgPage
  })
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Start from the server default ('dark') so the first client render matches
  // the SSR HTML — avoids a hydration mismatch. The real theme is already
  // applied to the DOM pre-paint by the inline script in layout.tsx; we
  // reconcile React state to it on mount below.
  const [theme, setTheme] = useState<Theme>('dark')
  const initialized = useRef(false)

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      // Always apply on mount so body/container inline styles are set, then
      // reconcile React state to the real theme (fixes the toggle icon for
      // light visitors without a hydration mismatch on first render). The
      // state sync is deferred a frame to avoid a synchronous setState here.
      const actual = getInitialTheme()
      applyTheme(actual)
      if (actual === theme) return
      const raf = requestAnimationFrame(() => setTheme(actual))
      return () => cancelAnimationFrame(raf)
    }
    applyTheme(theme)
    try {
      localStorage.setItem('theme', theme)
    } catch {}
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }, [])

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme])

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}
