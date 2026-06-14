import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { ContentImage } from '@/components/ContentImage'
import { Container } from '@/components/layout/Container'
import { MDXComponents } from '@/components/MDXComponents'
import { PageIntro } from '@/components/PageIntro'
import { PageLinks } from '@/components/PageLinks'
import { TagList, TagListItem } from '@/components/TagList'
import { loadGames, type Game, type MDXEntry } from '@/lib/mdx'

// Detail layout for an (unlisted) game dev-log entry. Mirrors the project layout, but
// deliberately omits `data-pagefind-body` (keeps the page out of on-site search) and
// the JSON-LD structured data (keeps it out of search-engine rich results).
export default async function GameLayout({
  game,
  children,
}: {
  game: MDXEntry<Game>
  children: React.ReactNode
}) {
  const allGames = await loadGames()
  const moreGames = allGames.filter((g) => g.title !== game.title).slice(0, 2)

  const startYear = game.startDate.split('-')[0]
  const endYear = game.date.split('-')[0]

  return (
    <>
      <article className="mt-24 sm:mt-32 lg:mt-40">
        <header>
          <PageIntro eyebrow="Game Dev Log" title={game.title} centered>
            <p className="text-justify">{game.description}</p>
            <div className="flex justify-center gap-x-4">
              {game.website && (
                <Button href={game.website} className="mt-6">
                  Play
                </Button>
              )}
              {game.repo && (
                <Button href={game.repo} className="mt-6" invert>
                  Source code
                </Button>
              )}
            </div>
          </PageIntro>
          <FadeIn>
            <div className="mt-18 border-t border-[var(--theme-border)] bg-[var(--theme-bg-surface)] sm:mt-24 lg:mt-32">
              <Container>
                <div className="mx-auto max-w-5xl">
                  <dl className="-mx-6 grid grid-cols-1 text-sm text-[var(--theme-text-secondary)] sm:mx-0 sm:grid-cols-3">
                    <div className="border-t border-[var(--theme-border)] px-6 py-4 first:border-t-0 sm:border-t-0 sm:border-l">
                      <dt className="font-semibold text-[var(--theme-text-primary)]">Type</dt>
                      <dd>{game.type}</dd>
                    </div>
                    <div className="border-t border-[var(--theme-border)] px-6 py-4 first:border-t-0 sm:border-t-0 sm:border-l">
                      <dt className="font-semibold text-[var(--theme-text-primary)]">Status</dt>
                      <dd>{game.status}</dd>
                    </div>
                    <div className="border-t border-[var(--theme-border)] px-6 py-4 first:border-t-0 sm:border-t-0 sm:border-l">
                      <dt className="font-semibold text-[var(--theme-text-primary)]">Year{startYear != endYear && 's'}</dt>
                      <dd>
                        <time dateTime={startYear}>{startYear}</time>
                        {startYear != endYear && (
                          <>
                            &nbsp;- <time dateTime={endYear}>{endYear}</time>
                          </>
                        )}
                      </dd>
                    </div>
                  </dl>
                </div>
              </Container>
            </div>
            <div className="border-y border-[var(--theme-border)] bg-[var(--theme-bg-elevated)]">
              <div className="mx-auto -my-px max-w-[76rem] bg-[var(--theme-border)]">
                <ContentImage src={game.image} alt={`${game.title} cover art`} quality={90} className="w-full h-auto" priority />
              </div>
            </div>
          </FadeIn>
        </header>

        <Container className="mt-9 sm:mt-12 lg:mt-16">
          <MDXComponents.wrapper>
            <FadeInStagger>
              <FadeIn>
                <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
                  <TagList>
                    {game.tags?.map((tag, idx) => (
                      <TagListItem key={idx} className="text-sm font-semibold text-[var(--theme-text-secondary)]">
                        {tag}
                      </TagListItem>
                    ))}
                  </TagList>
                </div>
              </FadeIn>
              <FadeIn>
                <Border className="mt-6 pt-6">{children}</Border>
              </FadeIn>
            </FadeInStagger>
          </MDXComponents.wrapper>
        </Container>
      </article>

      {moreGames.length > 0 && (
        <PageLinks className="mt-24 sm:mt-32 lg:mt-40" title="More games" pages={moreGames} />
      )}
    </>
  )
}
