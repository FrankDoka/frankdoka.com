import { type Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ArticleList } from '@/components/blocks/ArticleList'
import { Container } from '@/components/layout/Container'
import { PageIntro } from '@/components/PageIntro'
import { loadPosts } from '@/lib/mdx'

// Statically generate one page per unique tag found across the posts.
// Slug is the lowercased tag; display name is the original case-preserved
// tag we find on the matched posts (so "Uppy" stays "Uppy", not "uppy").
export async function generateStaticParams() {
  const posts = await loadPosts()
  const tags = new Set<string>()
  for (const p of posts) for (const t of p.tags ?? []) tags.add(t.toLowerCase())
  return Array.from(tags).map((tag) => ({ tag }))
}

interface Params {
  params: Promise<{ tag: string }>
}

async function findTagDisplayName(slug: string): Promise<string | null> {
  const posts = await loadPosts()
  for (const p of posts) {
    for (const t of p.tags ?? []) {
      if (t.toLowerCase() === slug) return t
    }
  }
  return null
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { tag } = await params
  const display = await findTagDisplayName(tag)
  if (!display) return { title: 'Tag' }
  return {
    title: `${display} — Blog`,
    description: `Blog posts tagged ${display}.`,
    robots: { index: false, follow: true },
  }
}

export default async function TagPage({ params }: Params) {
  const { tag } = await params
  const display = await findTagDisplayName(tag)
  if (!display) notFound()
  const articles = (await loadPosts()).filter((p) =>
    (p.tags ?? []).some((t) => t.toLowerCase() === tag)
  )

  return (
    <>
      <PageIntro eyebrow={`Topic: ${display}`} title={`Posts tagged ${display}`}>
        <p>
          Every blog post tagged <strong>{display}</strong>, newest first.{' '}
          <a href="/blog" className="underline hover:text-[var(--theme-text-primary)]">
            See all posts
          </a>
          .
        </p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <ArticleList articles={articles} />
      </Container>
    </>
  )
}
