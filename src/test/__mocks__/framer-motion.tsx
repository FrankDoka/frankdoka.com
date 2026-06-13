import React from 'react'
import { vi } from 'vitest'

type AnyProps = Record<string, unknown> & { children?: React.ReactNode }

// Strip framer-motion specific props before passing to DOM elements
function stripMotionProps(props: AnyProps): AnyProps {
  const {
    variants, initial, animate, exit, whileInView, whileHover, whileTap,
    viewport, transition, layout, layoutId, drag, dragConstraints,
    onAnimationStart, onAnimationComplete, onDrag, onDragEnd, onDragStart,
    ...rest
  } = props
  void variants; void initial; void animate; void exit; void whileInView; void whileHover; void whileTap
  void viewport; void transition; void layout; void layoutId; void drag; void dragConstraints
  void onAnimationStart; void onAnimationComplete; void onDrag; void onDragEnd; void onDragStart
  return rest
}

function createMotionComponent(tag: string | React.ComponentType<AnyProps>) {
  const Comp = React.forwardRef<HTMLElement, AnyProps>(({ children, ...props }, ref) => {
    const clean = stripMotionProps(props)
    return React.createElement(tag as string, { ...clean, ref }, children as React.ReactNode)
  })
  if (typeof tag === 'string') Comp.displayName = `motion.${tag}`
  return Comp
}

// motion can be called as motion(Component) or accessed as motion.div
function motionFn(Component: React.ComponentType<AnyProps>) {
  return createMotionComponent(Component as unknown as string)
}

const motionProxy = new Proxy(motionFn as unknown as Record<string, React.ComponentType<AnyProps>>, {
  get(_, tag: string) {
    return createMotionComponent(tag)
  },
  apply(_target, _thisArg, args: [React.ComponentType<AnyProps>]) {
    return createMotionComponent(args[0] as unknown as string)
  },
})

export const motion = motionProxy
export const m = motionProxy

export function AnimatePresence({ children }: { children?: React.ReactNode }) {
  return React.createElement(React.Fragment, null, children)
}
export function MotionConfig({ children }: { children?: React.ReactNode }) {
  return React.createElement(React.Fragment, null, children)
}
export function LazyMotion({ children }: { children?: React.ReactNode }) {
  return React.createElement(React.Fragment, null, children)
}

export const useReducedMotion = vi.fn(() => false)
export const useScroll = vi.fn(() => ({
  scrollYProgress: { get: () => 0, set: vi.fn(), on: vi.fn(), destroy: vi.fn() },
  scrollY: { get: () => 0, set: vi.fn(), on: vi.fn(), destroy: vi.fn() },
}))
export const useTransform = vi.fn((value: unknown) => value)
export const useMotionTemplate = vi.fn((...args: unknown[]) => args.filter(Boolean).join(''))
export const useMotionValue = vi.fn((initial: unknown) => ({ get: () => initial, set: vi.fn(), on: vi.fn() }))
export const useSpring = vi.fn((val: unknown) => val)
export const domAnimation = {}
