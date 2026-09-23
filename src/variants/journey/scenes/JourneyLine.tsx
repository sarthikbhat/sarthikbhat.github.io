import { useRef } from 'react'
import { motion, useReducedMotion, useTransform } from 'framer-motion'
import type { Stop } from '../../../lib/types'
import { useEnterProgress } from '../../../hooks/useScrollScene'

export function JourneyLine({
  index,
  stops,
}: {
  index: number
  stops: Stop[]
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { progress } = useEnterProgress(ref)
  const reduce = useReducedMotion()
  const fillH = useTransform(progress, [0.12, 0.9], ['0%', '100%'])
  const markerTop = useTransform(progress, [0.12, 0.9], ['0%', '100%'])

  return (
    <section
      id="j-journey"
      data-scene={index}
      ref={ref}
      className="scene scene-journeyline"
    >
      <div className="jl-head">
        <h2 className="scene-h">The journey</h2>
        <span className="scene-sub">intern → engineer</span>
      </div>
      <div className="jl-rail">
        <div className="jl-line">
          <motion.div
            className="jl-fill"
            style={reduce ? { height: '100%' } : { height: fillH }}
          />
        </div>
        {!reduce && (
          <motion.div className="jl-marker" style={{ top: markerTop }}>
            ◆
          </motion.div>
        )}
        <div className="jl-stops">
          {stops.map((s, i) => (
            <motion.div
              key={s.company + i}
              className={`jl-stop ${i % 2 ? 'right' : 'left'}`}
              initial={reduce ? false : { opacity: 0, y: 26 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, ease: [0.34, 1.2, 0.64, 1] }}
            >
              <span className="jl-dot" />
              <span className="jl-when">{s.when}</span>
              <h3 className="jl-role">{s.role}</h3>
              <span className="jl-company">{s.company}</span>
              <p className="jl-detail">{s.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
