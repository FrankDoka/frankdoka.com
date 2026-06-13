import Link from 'next/link'

import SocialMediaBlock from '@/components/blocks/SocialMediaBlock'
import { FadeIn } from '@/components/FadeIn'
import { Container } from '@/components/layout/Container'
import { Logo } from '@/components/Logo'

const siteLinks = [
  { title: 'Home', href: '/' },
  { title: 'About', href: '/about' },
  { title: 'Blog', href: '/blog' },
  { title: 'Projects', href: '/projects' },
  { title: 'Toolbox', href: '/toolbox' },
]

function Navigation() {
  return (
    <nav>
      <div className="font-display text-sm font-semibold tracking-wider text-[var(--theme-text-primary)]">Site Map</div>
      <ul role="list" className="mt-3 grid grid-cols-2 gap-x-8 text-sm text-[var(--theme-text-secondary)]">
        {siteLinks.map((link, i) => (
          <li key={i} className="mt-2">
            <Link href={link.href} className="transition hover:text-[var(--theme-text-primary)]">
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export function Footer() {
  return (
    <Container as="footer" className="mt-12 w-full sm:mt-16 lg:mt-20">
      <FadeIn>
        <div className="flex flex-wrap items-start justify-between gap-x-12 gap-y-8">
          <Navigation />
          <SocialMediaBlock />
        </div>
        <div className="mt-8 mb-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-4 border-t border-[var(--theme-border)] pt-6">
          <Link href="/" aria-label="Home">
            <Logo className="h-8" fillOnHover />
          </Link>
          <p className="text-sm text-[var(--theme-text-secondary)]">© Frank Doka {new Date().getFullYear()}</p>
        </div>
      </FadeIn>
    </Container>
  )
}
