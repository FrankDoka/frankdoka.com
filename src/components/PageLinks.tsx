import clsx from 'clsx'
import Link from 'next/link'

import { Border } from '@/components/Border'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { GridPattern } from '@/components/GridPattern'
import { Container } from '@/components/layout/Container'
import { SectionIntro } from '@/components/SectionIntro'

function ArrowIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 6" aria-hidden="true" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M24 3 18 .5v2H0v1h18v2L24 3Z" />
    </svg>
  )
}

interface Page {
  href: string
  date: string
  title: string
  description: string
}

function PageLink({ page }: { page: Page }) {
  return (
    <article key={page.href}>
      <Border position="left" className="relative flex flex-col items-start pl-8">
        <h3 className="mt-6 text-base font-semibold text-[var(--theme-text-primary)]">{page.title}</h3>
        <time dateTime={page.date.split('-')[0]} className="order-first text-sm text-[var(--theme-text-secondary)]">
          {page.date.split('-')[0]}
        </time>
        <p className="mt-2.5 text-base text-[var(--theme-text-secondary)]">{page.description}</p>
        <Link
          href={page.href}
          className="mt-6 flex gap-x-3 text-base font-semibold text-[var(--theme-text-primary)] transition hover:text-[var(--theme-text-secondary)]"
          aria-label={`Read more: ${page.title}`}
        >
          Read more
          <ArrowIcon className="w-6 flex-none fill-current" />
          <span className="absolute inset-0" />
        </Link>
      </Border>
    </article>
  )
}

export function PageLinks({
  title,
  pages,
  intro,
  className
}: {
  title: string
  pages: Array<Page>
  intro?: string
  className?: string
}) {
  return (
    <div className={clsx('relative pt-12 sm:pt-16 lg:pt-20', className)}>
      <div className="absolute inset-x-0 top-0 -z-10 h-[884px] overflow-hidden rounded-t-4xl bg-linear-to-b from-[var(--theme-bg-elevated)]">
        <GridPattern
          className="absolute inset-0 h-full w-full [mask-image:linear-gradient(to_bottom_left,white_40%,transparent_50%)] fill-[var(--theme-bg-elevated)] stroke-[var(--theme-border-subtle)]"
          yOffset={-270}
        />
      </div>

      <SectionIntro title={title} smaller>
        {intro && <p>{intro}</p>}
      </SectionIntro>

      <Container className={intro ? 'mt-24' : 'mt-16'}>
        <FadeInStagger className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
          {pages.map((page) => (
            <FadeIn key={page.href}>
              <PageLink page={page} />
            </FadeIn>
          ))}
        </FadeInStagger>
      </Container>
    </div>
  )
}
