import clsx from 'clsx'

import { FadeIn } from '@/components/FadeIn'
import { Container } from '@/components/layout/Container'

export function PageIntro({
  eyebrow,
  title,
  children,
  centered = false
}: {
  eyebrow: string
  title: string
  children: React.ReactNode
  centered?: boolean
}) {
  return (
    <Container className={clsx('mt-18 sm:mt-26 lg:mt-32', centered && 'text-center')}>
      <FadeIn>
        <p className="font-display text-base font-semibold text-[var(--theme-text-secondary)]">{eyebrow}</p>
        <h1
          className={clsx(
            'mt-6 max-w-5xl font-display text-5xl font-medium tracking-tight [text-wrap:balance] text-[var(--theme-text-primary)] sm:text-6xl',
            centered && 'mx-auto'
          )}
        >
          {title}
        </h1>
        <div className={clsx('mt-6 max-w-3xl text-xl text-[var(--theme-text-secondary)]', centered && 'mx-auto')}>{children}</div>
      </FadeIn>
    </Container>
  )
}
