import Image from 'next/image'
import Link from 'next/link'

import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
import { FadeIn } from '@/components/FadeIn'
import { formatDate } from '@/lib/formatDate'
import { type MDXEntry, type Post } from '@/lib/mdx'
import { getReadingTime } from '@/lib/readingTime'

export function ArticleList({ articles }: { articles: Array<MDXEntry<Post>> }) {
  if (articles.length === 0) {
    return <p className="text-center text-[var(--theme-text-secondary)]">No posts here yet.</p>
  }
  return (
    <div className="space-y-24 lg:space-y-32">
      {articles
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .map((article) => (
          <FadeIn key={article.href}>
            <article>
              <Border className="pt-16">
                <div className="relative lg:-mx-4 lg:flex lg:justify-end">
                  <div className="pt-10 lg:w-2/3 lg:flex-none lg:px-4 lg:pt-0">
                    <h2 className="font-display text-2xl font-semibold text-[var(--theme-text-primary)]">
                      <Link href={article.href}>{article.title}</Link>
                    </h2>
                    <dl className="lg:absolute lg:top-0 lg:left-0 lg:w-1/3 lg:px-4">
                      <dt className="sr-only">Published</dt>
                      <dd className="absolute top-0 left-0 text-sm text-[var(--theme-text-secondary)] lg:static">
                        <time dateTime={article.date}>{formatDate(article.date)}</time>
                        {(() => {
                          const mins = getReadingTime(article.href.replace('/blog/', ''))
                          return mins > 0 ? <span className="ml-2 text-[var(--theme-text-muted)]">· {mins} min read</span> : null
                        })()}
                      </dd>
                      <dt className="sr-only">Author</dt>
                      <dd className="mt-6 flex gap-x-4">
                        <div className="flex-none overflow-hidden rounded-xl bg-[var(--theme-bg-elevated)]">
                          <Image alt={`Photo of ${article.author.name}`} {...article.author.image} className="h-12 w-12 object-cover" placeholder="blur" />
                        </div>
                        <div className="text-sm text-[var(--theme-text-secondary)]">
                          <div className="font-semibold">{article.author.name}</div>
                        </div>
                      </dd>
                    </dl>
                    <p className="mt-6 max-w-2xl text-base text-[var(--theme-text-secondary)]">{article.description}</p>
                    {article.tags && article.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {article.tags.map((tag) => (
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
                    <Button href={article.href} aria-label={`Read more: ${article.title}`} className="mt-8">
                      Read more
                    </Button>
                  </div>
                </div>
              </Border>
            </article>
          </FadeIn>
        ))}
    </div>
  )
}
