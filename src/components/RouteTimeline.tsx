import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { Stop } from '../lib/types'
import { getPalette, onTheme } from '../lib/theme'
import { useIsMobile } from '../hooks/useIsMobile'

function RouteMobile({ stops }: { stops: Stop[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 65%', 'end 45%'],
  })
  const fill = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <div className="mroute" ref={ref}>
      <div className="mroute-rail">
        <motion.div className="mroute-fill" style={{ height: fill }} />
        <motion.div className="mroute-train" style={{ top: fill }}>
          ●
        </motion.div>
      </div>
      <div className="mroute-stops">
        {stops.map((s, i) => (
          <motion.div
            className="mstop"
            key={s.company + i}
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 0.5, ease: [0.34, 1.25, 0.64, 1] }}
          >
            <span className="mstop-dot" />
            <div className="stop-when">{s.when}</div>
            <div className="stop-role">{s.role}</div>
            <div className="stop-company">{s.company}</div>
            <p className="stop-detail">{s.detail}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export function RouteTimeline({ stops }: { stops: Stop[] }) {
  const isMobile = useIsMobile()
  const secRef = useRef<HTMLElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const trainRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const stationRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (isMobile) return
    const sec = secRef.current
    const rail = railRef.current
    const train = trainRef.current
    const track = trackRef.current
    if (!sec || !rail || !train || !track) return
    const cards = Array.from(track.children) as HTMLElement[]
    const labels = stops.map((s) => s.company)
    let raf = 0
    let active = -1

    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const r = sec.getBoundingClientRect()
        const span = sec.offsetHeight - innerHeight
        const p = Math.min(1, Math.max(0, -r.top / Math.max(1, span)))
        const pad = parseFloat(getComputedStyle(rail).paddingLeft) || 0
        const railW = rail.clientWidth - pad * 2
        const over = Math.max(0, track.scrollWidth - railW)
        track.style.transform = `translate3d(${-p * over}px,0,0)`
        train.style.transform = `translateX(${
          p * Math.max(0, railW - 36)
        }px) rotate(${p * 900}deg)`
        const i = Math.min(cards.length - 1, Math.floor(p * cards.length * 0.999))
        if (i !== active) {
          active = i
          const pal = getPalette()
          cards.forEach((s, k) => {
            const on = k === i
            s.style.transform = on ? 'translateY(-10px)' : 'none'
            s.style.boxShadow = on ? `7px 7px 0 ${pal.a1}` : 'none'
            s.style.background = on ? pal.a3 : pal.card
          })
          if (stationRef.current) stationRef.current.textContent = labels[i] || ''
        }
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    const offTheme = onTheme(() => {
      active = -1
      onScroll()
    })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      offTheme()
    }
  }, [stops, isMobile])

  return (
    <section id="route" className="route" ref={secRef}>
      <div className="route-sticky">
        <div className="route-head">
          <h2 className="route-title">The route</h2>
          {!isMobile && (
            <span className="route-sub">
              keep scrolling -{' '}
              <span ref={stationRef}>{stops[0]?.company ?? ''}</span>
            </span>
          )}
        </div>

        {isMobile ? (
          <RouteMobile stops={stops} />
        ) : (
          <div className="route-rail" ref={railRef}>
            <div className="route-line" />
            <div className="train" ref={trainRef}>
              ●
            </div>
            <div className="route-viewport">
              <div className="route-track" ref={trackRef}>
                {stops.map((s, i) => (
                  <div className="stop" key={s.company + i}>
                    <div className="stop-dot" />
                    <div className="stop-when">{s.when}</div>
                    <div className="stop-role">{s.role}</div>
                    <div className="stop-company">{s.company}</div>
                    <p className="stop-detail">{s.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
