'use client'

import clsx from 'clsx'
import Link from 'next/link'

type ButtonProps = {
  invert?: boolean
} & (React.ComponentPropsWithoutRef<typeof Link> | (React.ComponentPropsWithoutRef<'button'> & { href?: undefined }))

export function Button({ invert = false, className, children, ...props }: ButtonProps) {
  className = clsx(
    className,
    'inline-flex rounded-full px-4 py-1.5 text-sm font-semibold transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
    invert
      ? 'bg-[var(--theme-bg-elevated)] text-[var(--theme-text-primary)] hover:bg-[var(--theme-bg-hover)] border border-[var(--theme-border)] focus-visible:outline-[var(--theme-text-primary)]'
      : 'bg-[var(--theme-text-primary)] text-[var(--theme-bg-page)] hover:opacity-90 focus-visible:outline-[var(--theme-text-primary)]'
  )

  const inner = <span className="relative top-px">{children}</span>

  if (typeof props.href === 'undefined') {
    return (
      <button className={className} {...props}>
        {inner}
      </button>
    )
  }

  return (
    <Link className={className} {...props}>
      {inner}
    </Link>
  )
}
