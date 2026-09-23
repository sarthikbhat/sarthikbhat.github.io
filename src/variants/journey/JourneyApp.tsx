import { useCallback, useEffect, useRef, useState } from 'react'
import type { Content } from '../../lib/types'
import { ShaderField, type ShaderMode } from '../../gl/ShaderField'
import { ProjectSheets } from '../../components/ProjectSheets'
import { Arrival } from './scenes/Arrival'
import { Work } from './scenes/Work'
import { Craft } from './scenes/Craft'
import { JourneyLine } from './scenes/JourneyLine'
import { Dusk } from './scenes/Dusk'

const SCENES = ['arrival', 'work', 'craft', 'journey', 'dusk'] as const
const MODE_BY_SCENE: ShaderMode[] = ['ink', 'grid', 'circuit', 'grid', 'dusk']

export function JourneyApp({ content }: { content: Content }) {
  const [active, setActive] = useState(0)
  const [openId, setOpenId] = useState<string | null>(null)
  const rootRef = useRef<HTMLDivElement>(null)

  const onOpen = useCallback((id: string) => setOpenId(id), [])
  const onClose = useCallback(() => setOpenId(null), [])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const els = Array.from(root.querySelectorAll<HTMLElement>('[data-scene]'))
    let raf = 0
    const calc = () => {
      raf = 0
      const mid = window.scrollY + innerHeight / 2
      let best = 0
      let bestD = Infinity
      for (const el of els) {
        const idx = Number(el.getAttribute('data-scene'))
        const rect = el.getBoundingClientRect()
        const top = rect.top + window.scrollY
        const bottom = rect.bottom + window.scrollY
        if (mid >= top && mid < bottom) {
          best = idx
          bestD = -1
          break
        }
        const d = Math.min(Math.abs(mid - top), Math.abs(mid - bottom))
        if (d < bestD) {
          bestD = d
          best = idx
        }
      }
      setActive(best)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(calc)
    }
    calc()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const go = (i: number) => {
    rootRef.current
      ?.querySelector(`[data-scene="${i}"]`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="journey" ref={rootRef}>
        <div className="journey-bg">
          <ShaderField
            mode={MODE_BY_SCENE[active]}
            intensity={active === 0 ? 0.82 : active === 4 ? 0.7 : 0.56}
          />
          <div className="journey-bg-scrim" aria-hidden="true" />
        </div>

        <a className="journey-brand" href="#j-arrival" onClick={(e) => { e.preventDefault(); go(0) }}>
          <span className="journey-brand-mark" />
          {content.identity.initials}
        </a>

        <nav className="spine" aria-label="Scenes">
          {SCENES.map((name, i) => (
            <button
              key={name}
              className={i === active ? 'spine-dot active' : 'spine-dot'}
              aria-label={name}
              aria-current={i === active}
              data-cur={name}
              onClick={() => go(i)}
            >
              <span className="spine-dot-label">{name}</span>
            </button>
          ))}
        </nav>

        <div className="journey-scenes">
          <Arrival index={0} content={content} />
          <Work index={1} projects={content.projects} onOpen={onOpen} />
          <Craft index={2} stack={content.stack} />
          <JourneyLine index={3} stops={content.stops} />
          <Dusk index={4} content={content} />
        </div>

        <ProjectSheets
          projects={content.projects}
          openId={openId}
          onClose={onClose}
        />
      </div>
  )
}
