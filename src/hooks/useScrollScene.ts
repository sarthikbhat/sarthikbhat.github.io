import { useScroll, type MotionValue } from 'framer-motion'
import type { RefObject } from 'react'

export function usePinnedScene(ref: RefObject<HTMLElement>): {
  progress: MotionValue<number>
} {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })
  return { progress: scrollYProgress }
}

export function useEnterProgress(ref: RefObject<HTMLElement>): {
  progress: MotionValue<number>
} {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  return { progress: scrollYProgress }
}
