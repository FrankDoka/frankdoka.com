import Link from 'next/link'
import { useContext } from 'react'
import { Logo, Logomark } from '../Logo'
import { SearchButton } from '../SearchDialog'
import { ThemeToggle } from '../ThemeToggle'
import { Container } from './Container'
import { RootLayoutContext } from './RootLayout'
import { Button } from '../Button'

export function Header({
  panelId,
  icon: Icon,
  expanded,
  onToggle,
  toggleRef,
}: {
  panelId: string
  icon: React.ComponentType<{ className?: string }>
  expanded: boolean
  onToggle: () => void
  toggleRef: React.RefObject<HTMLButtonElement | null>
}) {
  const { logoHovered, setLogoHovered } = useContext(RootLayoutContext)!

  return (
    <Container>
      <div className="flex items-center justify-between">
        <Link
          href="/"
          aria-label="Home"
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
        >
          <Logomark className="h-8 sm:hidden" filled={logoHovered} />
          <Logo className="hidden h-8 sm:block" filled={logoHovered} />
        </Link>
        <div className="flex items-center gap-x-4 sm:gap-x-8">
          <SearchButton />
          <ThemeToggle />
          <Button href={'https://www.linkedin.com/in/frank-doka-64951828b/'}>Contact Me</Button>
          <button
            ref={toggleRef}
            type="button"
            onClick={onToggle}
            aria-expanded={expanded ? 'true' : 'false'}
            aria-controls={panelId}
            className="group -m-2.5 rounded-full p-2.5 transition hover:bg-[var(--theme-bg-hover)]"
            aria-label="Toggle navigation"
          >
            <Icon className="h-6 w-6 fill-[var(--theme-text-primary)] transition group-hover:fill-[var(--theme-text-secondary)]" />
          </button>
        </div>
      </div>
    </Container>
  )
}
