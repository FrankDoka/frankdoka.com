import clsx from 'clsx'
import { FadeIn, FadeInStagger } from './FadeIn'

export function TagList({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <FadeInStagger>
      <ul role="list" className={clsx(className, 'flex flex-wrap gap-4')}>
        {children}
      </ul>
    </FadeInStagger>
  )
}

export function TagListItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <FadeIn>
      <li className={clsx('rounded-full bg-[var(--theme-bg-elevated)] px-4 py-1.5 text-base text-[var(--theme-text-secondary)]', className)}>
        {children}
      </li>
    </FadeIn>
  )
}
