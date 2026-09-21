import { useRef, type PointerEvent } from 'react'

/** Pointer-follow "magnet" effect for buttons. Vanilla transform so it never
 *  fights framer-motion (magnet elements are intentionally not motion nodes). */
export function useMagnet<T extends HTMLElement>(strength = { x: 0.3, y: 0.45 }) {
  const ref = useRef<T>(null)

  const onPointerMove = (e: PointerEvent<T>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.transition = ''
    el.style.translate = `${(e.clientX - r.left - r.width / 2) * strength.x}px ${
      (e.clientY - r.top - r.height / 2) * strength.y
    }px`
  }

  const onPointerLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transition = 'translate 0.4s cubic-bezier(0.34, 1.35, 0.64, 1)'
    el.style.translate = '0 0'
  }

  return { ref, onPointerMove, onPointerLeave }
}
