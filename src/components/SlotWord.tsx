'use client'

import { useEffect, useState } from 'react'

import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'

interface SlotWordProps {
  words: string[]
  final: string
  startDelay?: number
  beat?: number
}

export function SlotWord({ words, final, startDelay = 1000, beat = 850 }: SlotWordProps) {
  const [word, setWord] = useState('')
  const shouldReduceMotion = usePrefersReducedMotion()

  // Show the final word immediately when reduced motion is preferred.
  const displayWord = shouldReduceMotion ? final : word

  useEffect(() => {
    if (shouldReduceMotion) return

    const initTimer = setTimeout(() => {
      setWord(words[Math.floor(Math.random() * words.length)])
    }, 0)

    // Roll through 2 pool words on a steady beat, then land on the final word.
    const pool = [...words].sort(() => Math.random() - 0.5).slice(0, 2)
    const timers: ReturnType<typeof setTimeout>[] = []
    pool.forEach((next, i) => {
      timers.push(setTimeout(() => setWord(next), startDelay + beat * i))
    })
    timers.push(setTimeout(() => setWord(final), startDelay + beat * pool.length))

    return () => {
      clearTimeout(initTimer)
      timers.forEach(clearTimeout)
    }
  }, [words, final, startDelay, beat, shouldReduceMotion])

  return (
    <span className="relative inline-block overflow-hidden" style={{ verticalAlign: 'bottom' }}>
      {/* Invisible placeholder keeps the final word's width reserved at all times */}
      <span aria-hidden className="invisible whitespace-nowrap">
        {final}
      </span>
      {/* key forces a remount on each word change, replaying the slide-in animation */}
      <span
        key={displayWord}
        className="absolute left-0 whitespace-nowrap text-[var(--theme-text-secondary)] motion-safe:animate-[slot-in_0.45s_ease-out]"
      >
        {displayWord}
      </span>
    </span>
  )
}
