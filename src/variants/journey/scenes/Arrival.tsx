import { motion, useReducedMotion } from 'framer-motion'
import type { Content } from '../../../lib/types'

export function Arrival({
  index,
  content,
}: {
  index: number
  content: Content
}) {
  const { hero, identity } = content
  const reduce = useReducedMotion()

  const line = (text: string, i: number, accent = false) => (
    <span className="mask jline">
      <motion.span
        className={accent ? 'hero-accent' : undefined}
        initial={reduce ? false : { y: '110%' }}
        animate={reduce ? undefined : { y: 0 }}
        transition={{
          duration: 1.0,
          delay: 0.15 + i * 0.12,
          ease: [0.19, 1, 0.22, 1],
        }}
      >
        {text}
      </motion.span>
    </span>
  )

  return (
    <section id="j-arrival" data-scene={index} className="scene scene-arrival">
      <div className="arrival-inner">
        <div className="arrival-id">
          <span className="hero-name">{identity.name}</span>
          <span className="hero-meta">
            {identity.role} · {identity.location}
          </span>
        </div>
        <h1 className="arrival-title">
          {line(hero.line1, 0)}
          {line(hero.line2, 1)}
          {line(hero.line3, 2, true)}
        </h1>
        <p className="arrival-blurb">{hero.blurb}</p>
      </div>
      <div className="scroll-cue" aria-hidden="true">
        <span className="scroll-cue-rail">
          <span className="scroll-cue-dot" />
        </span>
        scroll
      </div>
    </section>
  )
}
