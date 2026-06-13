import Link from 'next/link'
import { Container } from './Container'

const links = [
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/toolbox', label: 'Toolbox' },
]

function NavRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="even:mt-px sm:bg-[var(--theme-bg-page)]">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2">{children}</div>
      </Container>
    </div>
  )
}

function NavItem({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group relative isolate -mx-6 bg-[var(--theme-bg-page)] px-6 py-6 even:mt-px sm:mx-0 sm:px-0 sm:py-10 sm:odd:pr-16 sm:even:mt-0 sm:even:border-l sm:even:border-[var(--theme-border-subtle)] sm:even:pl-16"
    >
      {children}
      <span className="absolute inset-y-0 -z-10 w-screen bg-[var(--theme-bg-surface)] opacity-0 transition group-odd:right-0 group-even:left-0 group-hover:opacity-100" />
    </Link>
  )
}

function DokaBrand() {
  return (
    <div className="bg-[var(--theme-bg-page)]">
      <Container>
        <Link
          href="/"
          aria-label="Go to homepage"
          className="group inline-block py-10 transition-opacity hover:opacity-100"
        >
          <svg
            viewBox="0 0 160 48"
            aria-hidden="true"
            className="h-12 w-auto text-[var(--theme-text-primary)] opacity-30 transition-opacity duration-300 group-hover:opacity-100"
          >
            <text
              x="0"
              y="38"
              fontFamily="var(--font-mona-sans), ui-sans-serif, system-ui, sans-serif"
              fontSize="42"
              fontWeight="500"
              letterSpacing="-1"
              fill="currentColor"
            >
              Doka.
            </text>
          </svg>
        </Link>
      </Container>
    </div>
  )
}

export function NavigationBar() {
  return (
    <>
      <nav className="mt-px font-display text-5xl font-medium tracking-tight text-[var(--theme-text-primary)]">
        <NavRow>
          {links.map(({ href, label }) => (
            <NavItem key={href} href={href}>
              {label}
            </NavItem>
          ))}
        </NavRow>
      </nav>
      <DokaBrand />
    </>
  )
}
