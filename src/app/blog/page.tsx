import { type Metadata } from 'next'

import { ArticleList } from '@/components/blocks/ArticleList'
import { Container } from '@/components/layout/Container'
import { PageIntro } from '@/components/PageIntro'
import { loadPosts } from '@/lib/mdx'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Project deep-dives, build logs, and lessons learned from cloud infrastructure and DevOps work.',
  openGraph: {
    title: 'Blog — Frank Doka',
    description: 'Project deep-dives, build logs, and lessons learned from cloud infrastructure and DevOps work.',
    url: 'https://www.frankdoka.com/blog',
  },
}

export default async function Blog() {
  const articles = await loadPosts()
  const allTags = Array.from(new Set(articles.flatMap((a) => a.tags ?? []))).sort((a, b) =>
    a.localeCompare(b)
  )

  return (
    <>
      <PageIntro eyebrow="Blog" title="Build Logs & Deep Dives">
        <p>{metadata.description}</p>
        {allTags.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-[var(--theme-text-secondary)]">Topics:</span>
            {allTags.map((tag) => (
              <a
                key={tag}
                href={`/blog/tags/${tag.toLowerCase()}`}
                className="inline-flex items-center rounded-full border border-[var(--theme-border)] px-3 py-1 text-xs font-medium text-[var(--theme-text-secondary)] transition hover:border-[var(--theme-text-primary)] hover:bg-[var(--theme-text-primary)] hover:text-[var(--theme-bg-page)]"
              >
                {tag}
              </a>
            ))}
          </div>
        )}
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <ArticleList articles={articles} />
      </Container>
    </>
  )
}
