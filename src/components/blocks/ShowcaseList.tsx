import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { Container } from '@/components/layout/Container'
import clsx from 'clsx'
import Image, { type StaticImageData } from 'next/image'
import { HeaderWithDivider } from './TextHeaders'

type Props = {
  name?: string | React.ReactNode
  items: [string, StaticImageData][]
  className?: string
  center?: boolean
  height?: number
  wide?: boolean
}

export default function ShowcaseList(props: Props) {
  return (
    <Container className={clsx('mt-8', props.className)}>
      <FadeIn>
        <HeaderWithDivider name={props.name} />
      </FadeIn>
      <FadeInStagger faster>
        <ul
          role="list"
          className={clsx(
            'mt-10 grid grid-cols-2 gap-x-6 gap-y-5',
            props.center && 'justify-items-center',
            props.wide ? 'lg:grid-cols-5' : 'lg:grid-cols-4'
          )}
        >
          {props.items.map(([name, icon]) => (
            <li key={name}>
              <FadeIn>
                <div className="flex items-center gap-3 rounded-xl border border-[var(--theme-card-border)] bg-[var(--theme-card-bg)] px-4 py-3 select-none">
                  <Image
                    height={props.height ?? 24}
                    src={icon}
                    alt={name}
                    loading="lazy"
                    unoptimized
                    className="shrink-0"
                  />
                  <span className="text-sm font-medium text-[var(--theme-text-secondary)]">{name}</span>
                </div>
              </FadeIn>
            </li>
          ))}
        </ul>
      </FadeInStagger>
    </Container>
  )
}
