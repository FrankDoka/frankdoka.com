import { Button } from '@/components/Button'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { TagList, TagListItem } from '@/components/TagList'
import { loadGames, Game } from '@/lib/mdx'
import Image from 'next/image'
import Section from '../layout/Section'

function GameCard({ game }: { game: Game }) {
  return (
    <FadeIn className="flex">
      <div className="theme-card group relative flex w-full flex-col rounded-2xl border">
        <div className="overflow-hidden rounded-t-2xl">
          <Image
            src={game.image.src}
            alt={game.title}
            width={game.image.width}
            height={game.image.height}
            className="aspect-[16/9] w-full object-cover transition duration-300 group-hover:scale-105"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        </div>
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h3 className="font-display text-lg font-semibold text-[var(--theme-text-primary)]">{game.title}</h3>
          <div className="mt-2 text-sm text-[var(--theme-text-secondary)] line-clamp-2">{game.abstract}</div>
          <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5">
            <TagList>
              {game.tags?.slice(0, 4).map((tag) => (
                <TagListItem key={tag} className="text-xs">{tag}</TagListItem>
              ))}
            </TagList>
          </div>
          <div className="mt-4">
            <Button href={game.href}>View game</Button>
          </div>
        </div>
      </div>
    </FadeIn>
  )
}

export default async function GamesSection() {
  const games = (await loadGames()).sort((a, b) => a.order - b.order)

  return (
    <Section eyebrow="Games" title="Game Dev Log">
      <FadeInStagger className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {games.map((game) => (
          <GameCard key={game.title} game={game} />
        ))}
      </FadeInStagger>
    </Section>
  )
}
