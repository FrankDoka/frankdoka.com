import Link from 'next/link'

import { FadeIn } from '@/components/FadeIn'
import { InlineSearch } from '@/components/InlineSearch'
import { Container } from '@/components/layout/Container'

export default function NotFound() {
  return (
    <Container className="flex h-full items-center pt-24 sm:pt-32 lg:pt-40">
      <FadeIn className="flex max-w-xl flex-col items-center text-center">
        <p className="font-display text-4xl font-semibold text-[var(--theme-text-primary)] sm:text-5xl">
          404
        </p>
        <h1 className="mt-4 font-display text-2xl font-semibold text-[var(--theme-text-primary)]">
          Page not found
        </h1>
        <p className="mt-2 text-sm text-[var(--theme-text-secondary)]">
          This page doesn&apos;t exist or has been moved.
        </p>
        <InlineSearch />
        <Link
          href="/"
          className="mt-6 text-sm font-semibold text-[var(--theme-text-primary)] transition hover:text-[var(--theme-text-secondary)]"
        >
          Go to the home page
        </Link>
      </FadeIn>
    </Container>
  )
}
