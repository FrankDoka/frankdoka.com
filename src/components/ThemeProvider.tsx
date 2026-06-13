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
  const stored = localStorage.getItem('theme') as Theme | null
  if (stored) return stored
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
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
  const [theme, setTheme] = useState<Theme>(getInitialTheme)
  const initialized = useRef(false)

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      applyTheme(theme)
      return
    }
    applyTheme(theme)
    localStorage.setItem('theme', theme)
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
