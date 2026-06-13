import { type IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { GridPattern } from '@/components/GridPattern'

// A themed banner for the top of blog posts: a subtle grid pattern behind the
// post's icon and type label. Gives every article a consistent visual header
// without needing a bespoke image per post.
export function ArticleHero({ icon, eyebrow }: { icon: IconProp; eyebrow: string }) {
  return (
    <div className="mt-10 overflow-hidden rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-bg-elevated)]">
      <div className="relative flex h-44 items-center justify-center sm:h-52">
        <GridPattern
          yOffset={-24}
          className="absolute inset-0 h-full w-full fill-[var(--theme-border-subtle)] stroke-[var(--theme-border)] [mask-image:radial-gradient(60%_60%_at_50%_50%,white,transparent)]"
        />
        <div className="relative flex flex-col items-center gap-4">
          <span className="flex h-20 w-20 items-center justify-center rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-bg-surface)] text-teal-500">
            <FontAwesomeIcon icon={icon} className="text-3xl" />
          </span>
          <span className="text-xs font-semibold tracking-[0.2em] text-[var(--theme-text-muted)] uppercase">
            {eyebrow}
          </span>
        </div>
      </div>
    </div>
  )
}
