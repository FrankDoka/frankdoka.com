import { useEffect, useState } from 'react'

// Tracks the user's `prefers-reduced-motion` setting via matchMedia.
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches)
    mq.addEventListener('change', onChange)
    // Defer the initial read so we don't call setState synchronously in the effect.
    const raf = requestAnimationFrame(() => setReduced(mq.matches))
    return () => {
      mq.removeEventListener('change', onChange)
      cancelAnimationFrame(raf)
    }
  }, [])

  return reduced
}
