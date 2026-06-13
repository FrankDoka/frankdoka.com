import clsx from 'clsx'

const styles = {
  info: {
    container: 'border-blue-500/30 bg-blue-500/5',
    icon: 'text-blue-400',
    title: 'text-blue-300',
  },
  warning: {
    container: 'border-amber-500/30 bg-amber-500/5',
    icon: 'text-amber-400',
    title: 'text-amber-300',
  },
  danger: {
    container: 'border-red-500/30 bg-red-500/5',
    icon: 'text-red-400',
    title: 'text-red-300',
  },
  tip: {
    container: 'border-emerald-500/30 bg-emerald-500/5',
    icon: 'text-emerald-400',
    title: 'text-emerald-300',
  },
}

const icons = {
  info: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  warning: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  danger: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  tip: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
}

const titles = {
  info: 'Info',
  warning: 'Warning',
  danger: 'Danger',
  tip: 'Tip',
}

export function Callout({
  type = 'info',
  title,
  children,
  className,
}: {
  type?: keyof typeof styles
  title?: string
  children: React.ReactNode
  className?: string
}) {
  const s = styles[type]
  return (
    <div className={clsx('my-8 rounded-xl border p-4 sm:p-5', s.container, className)}>
      <div className="flex items-center gap-2.5">
        <span className={s.icon}>{icons[type]}</span>
        <p className={clsx('text-sm font-semibold', s.title)}>{title ?? titles[type]}</p>
      </div>
      <div className="mt-2 text-sm leading-relaxed text-[var(--theme-text-secondary)]">{children}</div>
    </div>
  )
}
