'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface SlotWordProps {
  words: string[]
  final: string
  startDelay?: number
  beat?: number
  wordDuration?: number
  finalDuration?: number
}

export function SlotWord({
  words,
  final,
  startDelay = 1000,
  beat = 850,
  wordDuration = 0.12,
  finalDuration = 1,
}: SlotWordProps) {
  const [word, setWord] = useState('')
  const [animated, setAnimated] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  // Derive display word: skip animation state and show final immediately for reduced motion
  const displayWord = shouldReduceMotion ? final : word

  useEffect(() => {
    if (shouldReduceMotion) return

    // Move initial randomization into a callback to satisfy react-hooks/set-state-in-effect
    const initTimer = setTimeout(() => {
      setWord(words[Math.floor(Math.random() * words.length)])
    }, 0)

    // Enable animations after the initial swap has painted
    const raf = requestAnimationFrame(() => setAnimated(true))

    // Animate 2 pool words then land on final — consistent beat, slower final roll
    const pool = [...words].sort(() => Math.random() - 0.5).slice(0, 2)
    const timers: ReturnType<typeof setTimeout>[] = []
    pool.forEach((next, i) => {
      timers.push(setTimeout(() => setWord(next), startDelay + beat * i))
    })
    timers.push(setTimeout(() => setWord(final), startDelay + beat * pool.length))

    return () => {
      clearTimeout(initTimer)
      cancelAnimationFrame(raf)
      timers.forEach(clearTimeout)
    }
  }, [words, final, startDelay, beat, shouldReduceMotion])

  return (
    <span className="relative inline-block overflow-hidden" style={{ verticalAlign: 'bottom' }}>
      {/* Invisible placeholder keeps final word width reserved at all times */}
      <span aria-hidden className="invisible whitespace-nowrap">
        {final}
      </span>
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={displayWord}
          className="absolute left-0 whitespace-nowrap text-[var(--theme-text-secondary)]"
          initial={animated ? { y: '-100%' } : false}
          animate={{ y: '0%' }}
          exit={{ y: '100%' }}
          transition={{ duration: displayWord === final ? finalDuration : wordDuration, ease: 'easeInOut' }}
        >
          {displayWord}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
