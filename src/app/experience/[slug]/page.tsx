import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { Container } from '@/components/layout/Container'
import { PageIntro } from '@/components/PageIntro'
import { experience } from '@/data/experience'
import { type Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type Params = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return experience.map((job) => ({ slug: job.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const job = experience.find((j) => j.slug === slug)
  if (!job) return {}
  return {
    title: `${job.role} at ${job.org}`,
    description: `${job.role} at ${job.org}. ${job.period}. ${job.location}.`,
  }
}

export default async function ExperiencePage({ params }: Params) {
  const { slug } = await params
  const job = experience.find((j) => j.slug === slug)
  if (!job) notFound()

  return (
    <div data-pagefind-body>
      <PageIntro eyebrow={job.period} title={job.org}>
        <p>{job.role} &middot; {job.location}</p>
      </PageIntro>

      <Container className="mt-16 sm:mt-20 lg:mt-24">
        <FadeInStagger>
          <FadeIn>
            <div className="mx-auto max-w-3xl">
              <p className="text-lg leading-8 text-[var(--theme-text-secondary)]">{job.description}</p>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="mx-auto mt-10 max-w-3xl">
              <h2 className="text-xs font-semibold tracking-widest text-[var(--theme-text-muted)] uppercase">
                Tech Stack
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {job.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center rounded-full border border-[var(--theme-border)] bg-[var(--theme-bg-surface)] px-3 py-1 text-xs font-medium text-[var(--theme-text-secondary)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="mx-auto mt-16 max-w-3xl border-t border-[var(--theme-border-subtle)] pt-12">
              <h2 className="text-xs font-semibold tracking-widest text-[var(--theme-text-muted)] uppercase">
                Key Contributions
              </h2>
              <div className="mt-8 space-y-8">
                {job.highlights.map((h, i) => (
                  <div key={i} className="relative pl-8 before:absolute before:top-0 before:left-0 before:h-full before:w-px before:bg-[var(--theme-border-subtle)]">
                    <p className="text-base leading-7 text-[var(--theme-text-secondary)]">{h}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="mx-auto mt-16 max-w-3xl">
              <Link
                href="/"
                className="text-sm font-semibold text-[var(--theme-text-muted)] transition hover:text-[var(--theme-text-primary)]"
              >
                &larr; Back to home
              </Link>
            </div>
          </FadeIn>
        </FadeInStagger>
      </Container>
    </div>
  )
}
