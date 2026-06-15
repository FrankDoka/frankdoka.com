import { Button } from '@/components/Button'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { TagList, TagListItem } from '@/components/TagList'
import { loadLab, Lab } from '@/lib/mdx'
import Image from 'next/image'
import Section from '../layout/Section'

function LabCard({ entry }: { entry: Lab }) {
  return (
    <FadeIn className="flex">
      <div className="theme-card group relative flex w-full flex-col rounded-2xl border">
        <div className="overflow-hidden rounded-t-2xl">
          <Image
            src={entry.image.src}
            alt={entry.title}
            width={entry.image.width}
            height={entry.image.height}
            className="aspect-[16/9] w-full object-cover transition duration-300 group-hover:scale-105"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        </div>
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h3 className="font-display text-lg font-semibold text-[var(--theme-text-primary)]">{entry.title}</h3>
          <div className="mt-2 text-sm text-[var(--theme-text-secondary)] line-clamp-2">{entry.abstract}</div>
          <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5">
            <TagList>
              {entry.tags?.slice(0, 4).map((tag) => (
                <TagListItem key={tag} className="text-xs">{tag}</TagListItem>
              ))}
            </TagList>
          </div>
          <div className="mt-4">
            <Button href={entry.href}>View project</Button>
          </div>
        </div>
      </div>
    </FadeIn>
  )
}

export default async function LabSection() {
  const entries = (await loadLab()).sort((a, b) => a.order - b.order)

  return (
    <Section eyebrow="Lab" title="Creative-Tech Lab">
      <FadeInStagger className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {entries.map((entry) => (
          <LabCard key={entry.title} entry={entry} />
        ))}
      </FadeInStagger>
    </Section>
  )
}
