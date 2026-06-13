import { Button } from '@/components/Button'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import Section from '@/components/layout/Section'
import { MDXEntry, Post } from '@/lib/mdx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

const colsMap: Record<number, string> = {
  1: 'lg:grid-cols-1',
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
}

export default function FeaturedPosts({ posts }: { posts: Array<MDXEntry<Post>> }) {
  const lgCols = colsMap[Math.min(posts.length, 3)] ?? 'lg:grid-cols-3'

  return (
    <Section eyebrow="Latest" title="Build Logs & Deep Dives">
      <FadeInStagger className={`grid grid-cols-1 gap-6 ${lgCols}`}>
        {posts.map((post) => (
          <FadeIn key={post.href} className="flex">
            <article className="theme-card relative flex w-full flex-col rounded-2xl border p-5 transition sm:p-6">
              <h3>
                <Link href={post.href}>
                  <span className="absolute inset-0 rounded-2xl" />
                  <FontAwesomeIcon size="lg" icon={post.icon} className="text-[var(--theme-text-muted)]" />
                </Link>
              </h3>
              <p className="mt-4 flex gap-x-2 text-xs text-[var(--theme-text-muted)]">
                <time dateTime={post.date.split('-')[0]} className="font-semibold text-[var(--theme-text-primary)]">
                  {post.date.split('-')[0]}
                </time>
                <span className="text-[var(--theme-text-muted)]" aria-hidden="true">/</span>
                <span>{post.type}</span>
              </p>
              <p className="mt-3 font-display text-base font-semibold text-[var(--theme-text-primary)]">{post.title}</p>
              <p className="mt-2 text-sm text-[var(--theme-text-secondary)]">{post.description}</p>
            </article>
          </FadeIn>
        ))}
      </FadeInStagger>
      <FadeIn className="mt-12 flex justify-center">
        <Button href="/blog">See all posts</Button>
      </FadeIn>
    </Section>
  )
}
