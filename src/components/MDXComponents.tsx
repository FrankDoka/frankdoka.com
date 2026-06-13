import clsx from 'clsx'
import Image, { type ImageProps } from 'next/image'

import { Border } from '@/components/Border'
import { Callout } from '@/components/Callout'
import { CodeBlock } from '@/components/CodeBlock'
import { ContentImage } from '@/components/ContentImage'
import { TagList, TagListItem } from '@/components/TagList'

export const MDXComponents = {
  Callout,
  pre: CodeBlock,
  // Diagrams/illustrations shown in full (no crop), unlike the photo `img`
  // renderer above. Pass an imported image plus alt text and an optional caption.
  Figure: function Figure({ src, alt, caption }: { src: ImageProps['src']; alt: string; caption?: string }) {
    return (
      <figure className="my-10 overflow-hidden rounded-4xl border border-[var(--theme-border)] bg-[var(--theme-bg-elevated)] max-sm:-mx-6">
        <Image src={src} alt={alt} sizes="(min-width: 768px) 42rem, 100vw" className="h-auto w-full" />
        {caption ? (
          <figcaption className="border-t border-[var(--theme-border)] px-6 py-3 text-center text-sm text-[var(--theme-text-muted)]">
            {caption}
          </figcaption>
        ) : null}
      </figure>
    )
  },
  img: function Img({ className, ...props }: React.ComponentPropsWithoutRef<typeof ContentImage>) {
    return (
      <div className={clsx('group isolate my-10 overflow-hidden rounded-4xl bg-[var(--theme-bg-elevated)] max-sm:-mx-6', className)}>
        <ContentImage
          {...props}
          sizes="(min-width: 768px) 42rem, 100vw"
          className="aspect-16/10 w-full object-cover"
        />
      </div>
    )
  },
  table: function Table({ className, ...props }: React.ComponentPropsWithoutRef<'table'>) {
    return (
      <div className={clsx('my-10 max-sm:-mx-6 max-sm:flex max-sm:overflow-x-auto', className)}>
        <div className="max-sm:min-w-full max-sm:flex-none max-sm:px-6">
          <table {...props} />
        </div>
      </div>
    )
  },
  TagList({ className, ...props }: React.ComponentPropsWithoutRef<typeof TagList>) {
    return <TagList className={clsx('my-6', className)} {...props} />
  },
  TagListItem,
  TopTip({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
      <Border position="left" className={clsx('my-10 pl-8', className)}>
        <p className="font-display text-sm font-bold tracking-widest text-[var(--theme-text-primary)] uppercase">Top tip</p>
        <div className="mt-4">{children}</div>
      </Border>
    )
  },
  Typography({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
    return <div className={clsx('typography', className)} {...props} />
  },
  wrapper({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
    return <div className={clsx('*:mx-auto [&>:first-child]:mt-0! [&>:last-child]:mb-0!', className)} {...props} />
  }
}
