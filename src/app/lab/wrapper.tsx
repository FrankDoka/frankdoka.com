import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { ContentImage } from '@/components/ContentImage'
import { Container } from '@/components/layout/Container'
import { MDXComponents } from '@/components/MDXComponents'
import { PageIntro } from '@/components/PageIntro'
import { PageLinks } from '@/components/PageLinks'
import { TagList, TagListItem } from '@/components/TagList'
import { loadLab, type Lab, type MDXEntry } from '@/lib/mdx'

// Detail layout for an (unlisted) Lab entry. Mirrors the game layout: deliberately omits
// `data-pagefind-body` (keeps it out of on-site search) and JSON-LD structured data
// (keeps it out of search-engine rich results).
export default async function LabLayout({
  lab,
  children,
}: {
  lab: MDXEntry<Lab>
  children: React.ReactNode
}) {
  const all = await loadLab()
  const more = all.filter((l) => l.title !== lab.title).slice(0, 2)

  const startYear = lab.startDate.split('-')[0]
  const endYear = lab.date.split('-')[0]

  return (
    <>
      <article className="mt-24 sm:mt-32 lg:mt-40">
        <header>
          <PageIntro eyebrow="Lab" title={lab.title} centered>
            <p className="text-justify">{lab.description}</p>
            <div className="flex justify-center gap-x-4">
              {lab.website && (
                <Button href={lab.website} className="mt-6">
                  Live
                </Button>
              )}
              {lab.repo && (
                <Button href={lab.repo} className="mt-6" invert>
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
                      <dd>{lab.type}</dd>
                    </div>
                    <div className="border-t border-[var(--theme-border)] px-6 py-4 first:border-t-0 sm:border-t-0 sm:border-l">
                      <dt className="font-semibold text-[var(--theme-text-primary)]">Status</dt>
                      <dd>{lab.status}</dd>
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
                <ContentImage src={lab.image} alt={`${lab.title} cover`} quality={90} className="w-full h-auto" priority />
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
                    {lab.tags?.map((tag, idx) => (
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

      {more.length > 0 && (
        <PageLinks className="mt-24 sm:mt-32 lg:mt-40" title="More from the lab" pages={more} />
      )}
    </>
  )
}
