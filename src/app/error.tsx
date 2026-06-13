'use client'

import { FadeIn } from '@/components/FadeIn'
import { Container } from '@/components/layout/Container'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <Container className="flex h-full items-center pt-24 sm:pt-32 lg:pt-40">
      <FadeIn className="flex max-w-xl flex-col items-center text-center">
        <p className="font-display text-4xl font-semibold text-[var(--theme-text-primary)] sm:text-5xl">
          500
        </p>
        <h1 className="mt-4 font-display text-2xl font-semibold text-[var(--theme-text-primary)]">
          Something went wrong
        </h1>
        <p className="mt-2 text-sm text-[var(--theme-text-secondary)]">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="mt-4 text-sm font-semibold text-[var(--theme-text-primary)] transition hover:text-[var(--theme-text-secondary)]"
        >
          Try again
        </button>
      </FadeIn>
    </Container>
  )
}
