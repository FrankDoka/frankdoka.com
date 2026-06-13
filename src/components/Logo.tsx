import clsx from 'clsx'
import { useId } from 'react'

export function Logomark({
  filled = false,
  ...props
}: React.ComponentPropsWithoutRef<'svg'> & {
  filled?: boolean
}) {
  const id = useId()

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <rect
        clipPath={`url(#${id}-clip)`}
        className={clsx(
          'h-8 fill-[var(--theme-text-primary)] transition-all duration-300',
          filled ? 'w-8' : 'w-0 group-hover/logo:w-8',
        )}
      />
      <use
        href={`#${id}-path`}
        className="stroke-[var(--theme-text-primary)]"
        fill="none"
        strokeWidth="1.5"
      />
      <defs>
        <path
          id={`${id}-path`}
          d="M3.25 26v.75H7c1.305 0 2.384-.21 3.346-.627.96-.415 1.763-1.02 2.536-1.752.695-.657 1.39-1.443 2.152-2.306l.233-.263c.864-.975 1.843-2.068 3.071-3.266 1.209-1.18 2.881-1.786 4.621-1.786h5.791V5.25H25c-1.305 0-2.384.21-3.346.627-.96.415-1.763 1.02-2.536 1.751-.695.658-1.39 1.444-2.152 2.307l-.233.263c-.864.975-1.843 2.068-3.071 3.266-1.209 1.18-2.881 1.786-4.621 1.786H3.25V26Z"
        />
        <clipPath id={`${id}-clip`}>
          <use href={`#${id}-path`} />
        </clipPath>
      </defs>
    </svg>
  )
}

export function LogoText({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 92 40" aria-hidden="true" x="38">
      <text
        x="0"
        y="28"
        fontFamily="var(--font-mona-sans), ui-sans-serif, system-ui, sans-serif"
        fontSize="22"
        fontWeight="500"
        letterSpacing="-0.5"
        className={className}
      >
        Doka.
      </text>
    </svg>
  )
}

export function Logo({
  className,
  filled = false,
  fillOnHover = false,
  ...props
}: React.ComponentPropsWithoutRef<'svg'> & {
  filled?: boolean
  fillOnHover?: boolean
}) {
  return (
    <svg viewBox="0 0 130 40" aria-hidden="true" className={clsx(fillOnHover && 'group/logo', className)} {...props}>
      <Logomark preserveAspectRatio="xMinYMid meet" filled={filled} />
      <LogoText className="fill-[var(--theme-text-primary)]" />
    </svg>
  )
}
