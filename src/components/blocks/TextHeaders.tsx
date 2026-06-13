import { SectionIntro } from '@/components/SectionIntro'
import clsx from 'clsx'

type SectionHeaderProps = {
  title: string
  eyebrow?: string
  description?: string | React.ReactNode
  className?: string
}

export function SectionHeader(props: SectionHeaderProps) {
  return (
    <SectionIntro eyebrow={props.eyebrow} title={props.title} className={props.className}>
      <div>{props.description}</div>
    </SectionIntro>
  )
}

type HeaderWithDividerProps = {
  name: string | React.ReactNode
  className?: string
}

export function HeaderWithDivider({ name, className }: HeaderWithDividerProps) {
  return (
    <div className={clsx('flex items-center gap-x-8', className)}>
      <h2 className="text-center font-display text-sm font-semibold tracking-wider sm:text-left text-[var(--theme-text-primary)]">
        {name}
      </h2>
      <div className="h-px flex-auto bg-[var(--theme-border-subtle)]" />
    </div>
  )
}
