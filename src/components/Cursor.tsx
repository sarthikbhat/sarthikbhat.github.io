import { useEffect, useRef } from 'react'
import { getPalette } from '../lib/theme'

/** Springy custom cursor that morphs into a labelled pill over interactive
 *  elements (label read from their `data-cur` attribute). Vanilla RAF - this
 *  is not something framer-motion is built for. */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return
    const c = dotRef.current
    const t = labelRef.current
    if (!c) return

    let x = innerWidth / 2
    let y = innerHeight / 2
    let tx = x
    let ty = y
    let raf = requestAnimationFrame(function loop() {
      x += (tx - x) * 0.25
      y += (ty - y) * 0.25
      c.style.transform = `translate(${x}px,${y}px)`
      raf = requestAnimationFrame(loop)
    })

    const onMove = (e: MouseEvent) => {
      tx = e.clientX
      ty = e.clientY
      c.style.opacity = '1'
      const target = e.target as Element | null
      const hit = target?.closest?.('[data-cur], a, button, .tray-box') as
        | HTMLElement
        | null
      const label = hit
        ? hit.dataset.cur ?? (hit.classList.contains('tray-box') ? 'grab' : '')
        : ''
      const pal = getPalette()
      if (label) {
        const w = Math.max(54, label.length * 8 + 22)
        c.style.width = `${w}px`
        c.style.height = '26px'
        c.style.margin = `-13px 0 0 ${-w / 2}px`
        c.style.background = pal.ink
        c.style.color = pal.paper
        if (t) {
          t.textContent = label
          t.style.opacity = '1'
        }
      } else {
        c.style.width = '14px'
        c.style.height = '14px'
        c.style.margin = '-7px 0 0 -7px'
        c.style.background = pal.a1
        if (t) t.style.opacity = '0'
      }
    }
    const onLeave = () => {
      c.style.opacity = '0'
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div className="cursor" ref={dotRef} aria-hidden="true">
      <span className="cursor-label" ref={labelRef} />
    </div>
  )
}
