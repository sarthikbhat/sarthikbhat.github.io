import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import type { Content } from '../lib/types'

export function Hero({ content }: { content: Content }) {
  const { hero, tags, identity } = content
  const badgeRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const badge = badgeRef.current
    if (!badge || reduce || matchMedia('(max-width: 720px)').matches) return
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        badge.style.translate = `0 ${(scrollY * 0.16).toFixed(1)}px`
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [reduce])

  const line = (text: string, i: number, className: string, accent = false) => (
    <span className={`mask ${className}`}>
      <motion.span
        className={accent ? 'hero-accent' : undefined}
        initial={reduce ? false : { y: '108%' }}
        animate={reduce ? undefined : { y: 0 }}
        transition={{
          duration: 1.05,
          delay: 0.14 + i * 0.13,
          ease: [0.19, 1, 0.22, 1],
        }}
      >
        {text}
      </motion.span>
    </span>
  )

  return (
    <section id="top" className="hero">
      <div className="hero-id">
        <span className="hero-name">{identity.name}</span>
        <span className="hero-meta">
          {identity.role} · {identity.location}
        </span>
      </div>
      <h1 className="hero-title">
        {line(hero.line1, 0, 'mask-1')}
        {line(hero.line2, 1, 'mask-2')}
        {line(hero.line3, 2, 'mask-3', true)}
      </h1>
      <div className="hero-grid">
        <p className="lead">{hero.blurb}</p>
        <div className="chips">
          {tags.map((t, i) => (
            <motion.span
              key={t}
              className="chip"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              {t}
            </motion.span>
          ))}
        </div>
      </div>
      <div className="badge" ref={badgeRef}>
        {hero.badge}
      </div>
    </section>
  )
}
