import clsx from 'clsx'

import { FadeIn } from '@/components/FadeIn'
import { Container } from '@/components/layout/Container'

export function SectionIntro({
  title,
  eyebrow,
  children,
  smaller = false,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof Container>, 'title' | 'children'> & {
  title: string
  eyebrow?: string
  children?: React.ReactNode
  smaller?: boolean
}) {
  return (
    <Container {...props}>
      <FadeIn className="max-w-2xl">
        <h2>
          {eyebrow && (
            <>
              <span className="mb-6 block font-display text-base font-semibold text-[var(--theme-text-secondary)]">{eyebrow}</span>
              <span className="sr-only"> - </span>
            </>
          )}
          <span
            className={clsx(
              'block font-display tracking-tight text-[var(--theme-text-primary)] [text-wrap:balance]',
              smaller ? 'text-2xl font-semibold' : 'text-4xl font-medium sm:text-5xl'
            )}
          >
            {title}
          </span>
        </h2>
        {children && (
          <div className={clsx('mt-6 text-xl text-[var(--theme-text-secondary)]')}>{children}</div>
        )}
      </FadeIn>
    </Container>
  )
}
