import { type Metadata } from 'next'

import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { Container } from '@/components/layout/Container'
import { PageIntro } from '@/components/PageIntro'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Games',
  description:
    'Multiplayer browser games and interactive experiments built for fun.',
  openGraph: {
    title: 'Games — Frank Doka',
    description: 'Multiplayer browser games and interactive experiments built for fun.',
    url: 'https://www.frankdoka.com/games',
  },
}

interface Game {
  title: string
  description: string
  href: string
  status: 'Live' | 'Coming Soon'
}

const games: Game[] = [
  // Add games here as you build them:
  // {
  //   title: 'Game Title',
  //   description: 'Short description of the game.',
  //   href: '/games/game-slug',
  //   status: 'Live',
  // },
]

export default function GamesPage() {
  return (
    <div data-pagefind-body>
      <PageIntro eyebrow="Games" title="Play something">
        <p>
          Small multiplayer browser games and interactive experiments — built for
          fun, powered by the web.
        </p>
      </PageIntro>

      <Container className="mt-16 sm:mt-20 lg:mt-24">
        {games.length > 0 ? (
          <FadeInStagger>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {games.map((game) => (
                <FadeIn key={game.title}>
                  <Link href={game.href} className="group block">
                    <div className="theme-card flex flex-col rounded-2xl border p-6 transition">
                      <div className="mb-2 flex items-center justify-between">
                        <h3 className="font-display text-lg font-semibold text-[var(--theme-text-primary)]">
                          {game.title}
                        </h3>
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                            game.status === 'Live'
                              ? 'bg-green-900/50 text-green-400'
                              : 'bg-[var(--theme-bg-elevated)] text-[var(--theme-text-muted)]'
                          }`}
                        >
                          {game.status}
                        </span>
                      </div>
                      <p className="grow text-sm text-[var(--theme-text-secondary)]">
                        {game.description}
                      </p>
                      <div className="mt-4 text-xs font-semibold text-[var(--theme-text-muted)] transition group-hover:text-[var(--theme-text-secondary)]">
                        Play now →
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </FadeInStagger>
        ) : (
          <FadeIn>
            <div className="rounded-2xl border border-dashed border-[var(--theme-border)] px-8 py-16 text-center">
              <p className="text-lg font-medium text-[var(--theme-text-secondary)]">
                Games coming soon
              </p>
              <p className="mt-2 text-sm text-[var(--theme-text-muted)]">
                Multiplayer browser games are in development. Check back later!
              </p>
            </div>
          </FadeIn>
        )}
      </Container>
    </div>
  )
}
