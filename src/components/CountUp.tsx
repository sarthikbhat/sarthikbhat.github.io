import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

export function CountUp({ value, active }: { value: string; active: boolean }) {
  const reduce = useReducedMotion()
  const m = value.match(/[\d.]+/)
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    if (!m) {
      setDisplay(value)
      return
    }
    const target = parseFloat(m[0])
    const decimals = (m[0].split('.')[1] ?? '').length
    const idx = m.index ?? 0
    const pre = value.slice(0, idx)
    const suf = value.slice(idx + m[0].length)
    const fmt = (n: number) =>
      pre + n.toFixed(decimals) + suf

    if (!active) {
      setDisplay(fmt(0))
      return
    }
    if (reduce || target === 0) {
      setDisplay(value)
      return
    }

    const dur = 900
    let start = 0
    let raf = 0
    const tick = (t: number) => {
      if (!start) start = t
      const k = Math.min(1, (t - start) / dur)
      const eased = 1 - Math.pow(1 - k, 3)
      setDisplay(fmt(target * eased))
      if (k < 1) raf = requestAnimationFrame(tick)
      else setDisplay(value)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, value, reduce])

  return <>{display}</>
}
