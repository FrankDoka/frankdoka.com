'use client'

import { usePathname } from 'next/navigation'
import { createContext, useEffect, useId, useRef, useState } from 'react'

import SocialMediaBlock from '@/components/blocks/SocialMediaBlock'
import { GridPattern } from '@/components/GridPattern'
import { Container } from '@/components/layout/Container'
import { Footer } from '@/components/layout/Footer'
import { Header } from './Header'
import { NavigationBar } from './Navigation'

export const RootLayoutContext = createContext<{
  logoHovered: boolean
  setLogoHovered: React.Dispatch<React.SetStateAction<boolean>>
} | null>(null)

function XIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="m5.636 4.223 14.142 14.142-1.414 1.414L4.222 5.637z" />
      <path d="M4.222 18.363 18.364 4.22l1.414 1.414L5.636 19.777z" />
    </svg>
  )
}

function MenuIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M2 6h20v2H2zM2 16h20v2H2z" />
    </svg>
  )
}

function NavPanel({
  panelId,
  expanded,
  closeRef,
  onClose,
}: {
  panelId: string
  expanded: boolean
  closeRef: React.RefObject<HTMLButtonElement | null>
  onClose: () => void
}) {
  return (
    <div
      id={panelId}
      style={{ gridTemplateRows: expanded ? '1fr' : '0fr' }}
      className="relative z-50 grid pt-2 transition-[grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none"
      data-theme-page
      aria-hidden={expanded ? undefined : 'true'}
      inert={!expanded}
    >
      <div className="overflow-hidden" data-theme-elevated>
        <div className="pt-14 pb-8" data-theme-page>
          <Header panelId={panelId} icon={XIcon} toggleRef={closeRef} expanded={expanded} onToggle={onClose} />
        </div>
        <NavigationBar />
        <div className="relative before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-[var(--theme-border-subtle)]" data-theme-page>
          <Container>
            <div className="pt-6 pb-8 sm:pt-8">
              <SocialMediaBlock />
            </div>
          </Container>
        </div>
      </div>
    </div>
  )
}

function RootLayoutInner({ children }: { children: React.ReactNode }) {
  const panelId = useId()
  const [expanded, setExpanded] = useState(false)
  const openRef = useRef<React.ComponentRef<'button'>>(null)
  const closeRef = useRef<React.ComponentRef<'button'>>(null)

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (event.target instanceof HTMLElement && event.target.closest('a')?.href === window.location.href) {
        setExpanded(false)
      }
    }
    window.addEventListener('click', onClick)
    return () => window.removeEventListener('click', onClick)
  }, [])

  const toggle = (focusRef: React.RefObject<HTMLButtonElement | null>) => {
    setExpanded((prev) => !prev)
    window.setTimeout(() => focusRef.current?.focus({ preventScroll: true }))
  }

  return (
    <>
      <header>
        <div
          className="absolute top-2 right-0 left-0 z-40 pt-14"
          aria-hidden={expanded ? 'true' : undefined}
          inert={expanded}
        >
          <Header panelId={panelId} icon={MenuIcon} toggleRef={openRef} expanded={expanded} onToggle={() => toggle(closeRef)} />
        </div>

        <NavPanel
          panelId={panelId}
          expanded={expanded}
          closeRef={closeRef}
          onClose={() => toggle(openRef)}
        />
      </header>

      <div
        style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
        className="relative flex flex-auto overflow-hidden pt-14"
        data-theme-surface
      >
        <div className="relative isolate flex w-full flex-col pt-9">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-4 focus:rounded-lg focus:bg-[var(--theme-text-primary)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[var(--theme-bg-page)]"
          >
            Skip to main content
          </a>
          <GridPattern
            className="absolute inset-x-0 -top-14 -z-10 h-[1000px] w-full [mask-image:linear-gradient(to_bottom_left,white_40%,transparent_50%)] fill-[var(--theme-bg-elevated)] stroke-[var(--theme-border-subtle)]"
            yOffset={-96}
            interactive
          />
          <main id="main-content" className="w-full flex-auto">{children}</main>
          <Footer />
        </div>
      </div>
    </>
  )
}

export function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [logoHovered, setLogoHovered] = useState(false)

  return (
    <RootLayoutContext.Provider value={{ logoHovered, setLogoHovered }}>
      <RootLayoutInner key={pathname}>{children}</RootLayoutInner>
    </RootLayoutContext.Provider>
  )
}
