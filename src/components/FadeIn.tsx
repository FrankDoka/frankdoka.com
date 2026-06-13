'use client'

import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

// Scroll-triggered fade-in built on IntersectionObserver + CSS (see the
// `[data-fade-in]` rules in global.css) — no animation library needed.
// `prefers-reduced-motion` is handled in CSS.

const StaggerContext = createContext<{ inView: boolean; step: number } | null>(null)

function useInView<T extends Element>() {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -200px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, inView }
}

export function FadeIn({
  staggerIndex = 0,
  style,
  ...props
}: React.ComponentPropsWithoutRef<'div'> & { staggerIndex?: number }) {
  const stagger = useContext(StaggerContext)
  const self = useInView<HTMLDivElement>()
  const inView = stagger ? stagger.inView : self.inView
  const delay = stagger ? staggerIndex * stagger.step : 0

  return (
    <div
      ref={stagger ? undefined : self.ref}
      data-fade-in=""
      data-visible={inView ? 'true' : undefined}
      style={delay ? { transitionDelay: `${delay}s`, ...style } : style}
      {...props}
    />
  )
}

export function FadeInStagger({
  faster = false,
  children,
  ...props
}: React.ComponentPropsWithoutRef<'div'> & { faster?: boolean }) {
  const { ref, inView } = useInView<HTMLDivElement>()
  const step = faster ? 0.12 : 0.2

  // Give each direct FadeIn child an incrementing index so its CSS
  // transition-delay produces the staggered cascade.
  let index = 0
  const staggered = Children.map(children, (child) =>
    isValidElement(child) && child.type === FadeIn
      ? cloneElement(child as React.ReactElement<{ staggerIndex?: number }>, { staggerIndex: index++ })
      : child,
  )

  return (
    <StaggerContext.Provider value={{ inView, step }}>
      <div ref={ref} {...props}>
        {staggered}
      </div>
    </StaggerContext.Provider>
  )
}
