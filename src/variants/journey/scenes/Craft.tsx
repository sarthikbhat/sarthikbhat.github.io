import { useRef } from 'react'
import { motion, useReducedMotion, useTransform } from 'framer-motion'
import type { StackGroup } from '../../../lib/types'
import { useEnterProgress } from '../../../hooks/useScrollScene'

function Cluster({ g, i }: { g: StackGroup; i: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { progress } = useEnterProgress(ref)
  const reduce = useReducedMotion()
  const dir = i % 2 === 0 ? 1 : -1
  const y = useTransform(progress, [0, 1], [46 * dir, -46 * dir])

  return (
    <motion.div ref={ref} className="cluster" style={reduce ? undefined : { y }}>
      <div className="cluster-node">
        <span className="cluster-name">{g.group}</span>
        <span className="cluster-note">{g.note}</span>
      </div>
      <div className="cluster-branch">
        {g.items.map((it) => {
          const level = Math.max(1, Math.min(5, Math.round(parseFloat(it.y) || 1)))
          return (
            <div key={it.n} className="cluster-item">
              <span className="cluster-item-n">{it.n}</span>
              <span
                className="cluster-meter"
                title={`${it.y} experience`}
                aria-label={`${it.y} experience`}
              >
                {[0, 1, 2, 3, 4].map((s) => (
                  <i key={s} className={s < level ? 'on' : ''} />
                ))}
              </span>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}

export function Craft({
  index,
  stack,
}: {
  index: number
  stack: StackGroup[]
}) {
  return (
    <section id="j-craft" data-scene={index} className="scene scene-craft">
      <div className="craft-head">
        <h2 className="scene-h">The craft</h2>
        <span className="scene-sub">what I reach for, and how often</span>
      </div>
      <div className="craft-grid">
        {stack.map((g, i) => (
          <Cluster key={g.group} g={g} i={i} />
        ))}
      </div>
    </section>
  )
}
