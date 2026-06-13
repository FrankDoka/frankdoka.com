import Link from 'next/link'

import { ArticleHero } from '@/components/ArticleHero'
import { FadeIn } from '@/components/FadeIn'
import { Container } from '@/components/layout/Container'
import { MDXComponents } from '@/components/MDXComponents'
import { PageLinks } from '@/components/PageLinks'
import { TableOfContents } from '@/components/TableOfContents'
import { formatDate } from '@/lib/formatDate'
import { getReadingTime } from '@/lib/readingTime'
import { JsonLd, blogPostSchema } from '@/components/StructuredData'
import { type MDXEntry, type Post, loadPosts } from '@/lib/mdx'

export default async function BlogArticleWrapper({
  post: post,
  children
}: {
  post: MDXEntry<Post>
  children: React.ReactNode
}) {
  const allPosts = await loadPosts()
  const fullPost = allPosts.find(({ title }) => title === post.title)
  const currentTags = new Set(post.tags ?? [])
  const morePosts = allPosts
    .filter(({ title }) => title !== post.title)
    .sort((a, b) => {
      const aShared = (a.tags ?? []).filter((t) => currentTags.has(t)).length
      const bShared = (b.tags ?? []).filter((t) => currentTags.has(t)).length
      return bShared - aShared || b.date.localeCompare(a.date)
    })
    .slice(0, 2)
  const slug = fullPost?.href.replace('/blog/', '') ?? ''
  const readingTime = slug ? getReadingTime(slug) : 0

  return (
    <>
      <JsonLd data={blogPostSchema(post)} />
      <Container as="article" className="mt-24 sm:mt-32 lg:mt-40" data-pagefind-body>
        <FadeIn>
          <header className="mx-auto flex max-w-5xl flex-col text-center">
            <h1 className="mt-6 font-display text-5xl font-medium tracking-tight [text-wrap:balance] text-[var(--theme-text-primary)] sm:text-6xl">
              {post.title}
            </h1>
            <div className="order-first flex items-center justify-center gap-x-3 text-sm text-[var(--theme-text-secondary)]">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              {readingTime > 0 && (
                <>
                  <span className="text-[var(--theme-text-muted)]">·</span>
                  <span>{readingTime} min read</span>
                </>
              )}
            </div>
            <p className="mt-6 text-sm font-semibold text-[var(--theme-text-secondary)]">by {post.author.name}</p>
            {post.tags && post.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog/tags/${tag.toLowerCase()}`}
                    className="inline-flex items-center rounded-full border border-[var(--theme-border)] px-3 py-1 text-xs font-medium text-[var(--theme-text-secondary)] transition hover:border-[var(--theme-text-primary)] hover:bg-[var(--theme-text-primary)] hover:text-[var(--theme-bg-page)]"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}
            <div className="mx-auto w-full max-w-3xl">
              <ArticleHero icon={post.icon} eyebrow={post.type} />
            </div>
          </header>
        </FadeIn>

        <FadeIn>
          <div className="relative mt-16 sm:mt-20 lg:mt-24">
            <div className="absolute -right-64 top-0 hidden w-56 xl:block">
              <TableOfContents />
            </div>
            <MDXComponents.wrapper>{children}</MDXComponents.wrapper>
          </div>
        </FadeIn>
      </Container>

      {morePosts.length > 0 && (
        <PageLinks className="mt-12 sm:mt-16 lg:mt-20" title="More articles" pages={morePosts} />
      )}
    </>
  )
}
