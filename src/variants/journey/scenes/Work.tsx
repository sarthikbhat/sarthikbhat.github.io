import { useRef } from 'react'
import { motion, useTransform, useReducedMotion } from 'framer-motion'
import type { Project } from '../../../lib/types'
import { usePinnedScene } from '../../../hooks/useScrollScene'
import { useIsMobile } from '../../../hooks/useIsMobile'

function WorkCard({
  p,
  onOpen,
}: {
  p: Project
  onOpen: (id: string) => void
}) {
  return (
    <button className="work-card" data-cur="open" onClick={() => onOpen(p.id)}>
      <div className="work-card-top">
        <span className="work-card-kind">{p.kind}</span>
        <span className="work-card-year">{p.year}</span>
      </div>
      <h3 className="work-card-name">{p.name}</h3>
      <p className="work-card-blurb">{p.blurb}</p>
      <div className="work-card-stats">
        {p.stats.map((s) => (
          <div key={s.k} className="work-card-stat">
            <span className="work-card-stat-v">{s.v}</span>
            <span className="work-card-stat-k">{s.k}</span>
          </div>
        ))}
      </div>
      <span className="work-card-open">open case →</span>
    </button>
  )
}

export function Work({
  index,
  projects,
  onOpen,
}: {
  index: number
  projects: Project[]
  onOpen: (id: string) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { progress } = usePinnedScene(ref)
  const mobile = useIsMobile()
  const reduce = useReducedMotion()
  const x = useTransform(progress, [0, 1], ['0vw', '-92vw'])

  if (mobile) {
    return (
      <section id="j-work" data-scene={index} className="scene scene-work-m">
        <h2 className="scene-h">Selected work</h2>
        <div className="work-stack">
          {projects.map((p) => (
            <motion.div
              key={p.id}
              initial={reduce ? false : { opacity: 0, y: 28 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: [0.34, 1.2, 0.64, 1] }}
            >
              <WorkCard p={p} onOpen={onOpen} />
            </motion.div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section
      id="j-work"
      data-scene={index}
      ref={ref}
      className="scene scene-work"
    >
      <div className="work-sticky">
        <div className="work-head">
          <h2 className="scene-h">Selected work</h2>
          <span className="scene-sub">drag the tray in forge · here, scroll →</span>
        </div>
        <motion.div className="work-track" style={{ x }}>
          {projects.map((p) => (
            <WorkCard key={p.id} p={p} onOpen={onOpen} />
          ))}
          <div className="work-endcap">
            <span>that's the reel</span>
            <span className="work-endcap-sub">↑ back to top via the mark</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
