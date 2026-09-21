import { useEffect, useRef } from 'react'
import type { Project } from '../lib/types'
import { getPalette, onTheme, lum } from '../lib/theme'

interface Body {
  r: number
  x: number
  y: number
  vx: number
  vy: number
  a: number
  va: number
  ci: number
  label: string
  id: string | null
  big: boolean
}

const CHIPS = [
  'TS', 'Go', 'React', 'SQL', 'k8s', 'WASM', 'CSS', 'Rust', 'a11y', 'perf',
  'Node', 'Vite', 'HTTP', 'Redis', 'RAF', 'SVG',
]
const GRAVITY = 0.62

export function Tray({
  projects,
  onOpen,
}: {
  projects: Project[]
  onOpen: (id: string) => void
}) {
  const boxRef = useRef<HTMLDivElement>(null)
  const cvRef = useRef<HTMLCanvasElement>(null)
  const shakeRef = useRef<HTMLButtonElement>(null)
  const flipRef = useRef<HTMLButtonElement>(null)
  const fpsRef = useRef<HTMLSpanElement>(null)
  const nRef = useRef<HTMLSpanElement>(null)
  const onOpenRef = useRef(onOpen)
  onOpenRef.current = onOpen

  useEffect(() => {
    const box = boxRef.current
    const cv = cvRef.current
    if (!box || !cv) return
    const ctx = cv.getContext('2d')
    if (!ctx) return
    const dpr = Math.min(2, devicePixelRatio || 1)
    let theme = getPalette()
    let pal = [theme.a1, theme.a2, theme.a3, theme.ink]
    const offTheme = onTheme((_n, p) => {
      theme = p
      pal = [p.a1, p.a2, p.a3, p.ink]
    })

    let bodies: Body[] = []
    let W = 0
    let H = 0
    let dragging: Body | null = null
    let moved = 0
    let gy = GRAVITY
    let traf = 0
    const grab = { x: 0, y: 0 }
    const pointer = { x: 0, y: 0, px: 0, py: 0 }

    const size = () => {
      W = box.clientWidth
      H = box.clientHeight
      cv.width = Math.round(W * dpr)
      cv.height = Math.round(H * dpr)
    }
    const seed = () => {
      bodies = []
      const nBig = projects.length
      const nChip = CHIPS.length
      // size coins so the row of them fits the box width without spawn overlap
      // (overlapping spawns fling coins out the top and they never settle),
      // and so they fit the box height too
      const fitW = W / (2.3 * (nBig + 1))
      const fitH = Math.sqrt((W * H * 0.2) / (Math.PI * (nBig + 0.18 * nChip)))
      const big = Math.max(34, Math.min(94, fitW, fitH))
      const chip = Math.max(18, big * 0.42)
      projects.forEach((p, i) =>
        bodies.push({
          r: big,
          x: (W * (i + 1)) / (nBig + 1),
          y: -big * 1.2 - (i % 3) * big * 1.6,
          vx: (Math.random() - 0.5) * 3,
          vy: 0,
          a: 0,
          va: (Math.random() - 0.5) * 0.08,
          ci: i % 4,
          label: p.name,
          id: p.id,
          big: true,
        }),
      )
      CHIPS.forEach((c, i) =>
        bodies.push({
          r: chip,
          x: W * (0.08 + (i % 8) * 0.115),
          y: -40 - i * 55,
          vx: (Math.random() - 0.5) * 4,
          vy: 0,
          a: 0,
          va: (Math.random() - 0.5) * 0.12,
          ci: -1,
          label: c,
          id: null,
          big: false,
        }),
      )
      if (nRef.current) nRef.current.textContent = String(bodies.length)
    }

    const step = () => {
      for (const b of bodies) {
        b.vy += gy
        b.vx *= 0.995
        b.vy *= 0.995
        b.x += b.vx
        b.y += b.vy
        b.a += b.va
        b.va *= 0.97
      }
      for (let i = 0; i < bodies.length; i++) {
        for (let j = i + 1; j < bodies.length; j++) {
          const a = bodies[i]
          const c = bodies[j]
          let dx = c.x - a.x
          let dy = c.y - a.y
          let d = Math.hypot(dx, dy)
          const min = a.r + c.r
          if (d === 0) {
            d = 0.01
            dx = 0.01
          }
          if (d < min) {
            const nx = dx / d
            const ny = dy / d
            const ov = (min - d) / 2
            a.x -= nx * ov
            a.y -= ny * ov
            c.x += nx * ov
            c.y += ny * ov
            const sep = (c.vx - a.vx) * nx + (c.vy - a.vy) * ny
            if (sep < 0) {
              const imp = (-1.32 * sep) / 2
              a.vx -= imp * nx
              a.vy -= imp * ny
              c.vx += imp * nx
              c.vy += imp * ny
              a.va -= imp * 0.004
              c.va += imp * 0.004
            }
          }
        }
      }
      for (const b of bodies) {
        if (b.x - b.r < 0) {
          b.x = b.r
          b.vx = Math.abs(b.vx) * 0.55
          b.va += 0.01
        }
        if (b.x + b.r > W) {
          b.x = W - b.r
          b.vx = -Math.abs(b.vx) * 0.55
          b.va -= 0.01
        }
        if (b.y + b.r > H) {
          b.y = H - b.r
          b.vy = -Math.abs(b.vy) * 0.42
          b.vx *= 0.9
          b.va *= 0.86
        }
        if (b.y - b.r < -400) {
          b.y = -400 + b.r
          b.vy = Math.abs(b.vy) * 0.4
        }
        if (gy < 0 && b.y - b.r < 0) {
          b.y = b.r
          b.vy = Math.abs(b.vy) * 0.42
        }
      }
      if (dragging) {
        dragging.vx = (pointer.x - pointer.px) * 0.85
        dragging.vy = (pointer.y - pointer.py) * 0.85
        dragging.x = pointer.x - grab.x
        dragging.y = pointer.y - grab.y
      }
    }

    let frames = 0
    let fpsT = performance.now()
    const draw = () => {
      ctx.save()
      ctx.scale(dpr, dpr)
      ctx.clearRect(0, 0, W, H)
      for (const b of bodies) {
        const fill = b.big ? pal[b.ci] : theme.card
        ctx.save()
        ctx.translate(b.x, b.y)
        ctx.rotate(b.a)
        ctx.beginPath()
        ctx.arc(0, 0, b.r, 0, 7)
        ctx.fillStyle = fill
        ctx.fill()
        ctx.lineWidth = 2
        ctx.strokeStyle = theme.ink
        ctx.stroke()
        if (b.big) {
          ctx.beginPath()
          ctx.arc(0, 0, b.r - 7, 0, 7)
          ctx.strokeStyle = 'rgba(0,0,0,.22)'
          ctx.lineWidth = 1
          ctx.stroke()
        }
        ctx.fillStyle = lum(fill) < 0.55 ? theme.paper : theme.ink
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.font = b.big
          ? `700 ${Math.round(b.r * 0.26)}px "Bricolage Grotesque", sans-serif`
          : `700 ${Math.round(b.r * 0.46)}px "Space Mono", monospace`
        ctx.fillText(b.label, 0, 0)
        ctx.restore()
      }
      ctx.restore()
      frames++
      const now = performance.now()
      if (now - fpsT > 600) {
        if (fpsRef.current)
          fpsRef.current.textContent = String(
            Math.round((frames * 1000) / (now - fpsT)),
          )
        frames = 0
        fpsT = now
      }
    }

    const loop = () => {
      step()
      draw()
      traf = requestAnimationFrame(loop)
    }
    size()
    seed()

    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting && !traf) traf = requestAnimationFrame(loop)
          else if (!e.isIntersecting && traf) {
            cancelAnimationFrame(traf)
            traf = 0
          }
        }),
      { threshold: 0.05 },
    )
    io.observe(box)

    let rt: ReturnType<typeof setTimeout>
    const onResize = () => {
      clearTimeout(rt)
      rt = setTimeout(() => {
        size()
        seed()
      }, 200)
    }
    window.addEventListener('resize', onResize)

    const local = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect()
      pointer.px = pointer.x
      pointer.py = pointer.y
      pointer.x = e.clientX - r.left
      pointer.y = e.clientY - r.top
    }
    const onDown = (e: PointerEvent) => {
      local(e)
      pointer.px = pointer.x
      pointer.py = pointer.y
      moved = 0
      for (let i = bodies.length - 1; i >= 0; i--) {
        const b = bodies[i]
        if (Math.hypot(pointer.x - b.x, pointer.y - b.y) < b.r) {
          dragging = b
          grab.x = pointer.x - b.x
          grab.y = pointer.y - b.y
          box.setPointerCapture(e.pointerId)
          box.style.cursor = 'grabbing'
          break
        }
      }
    }
    const onPointerMove = (e: PointerEvent) => {
      local(e)
      if (dragging)
        moved += Math.abs(pointer.x - pointer.px) + Math.abs(pointer.y - pointer.py)
    }
    const release = () => {
      if (dragging && moved < 6 && dragging.id) onOpenRef.current(dragging.id)
      dragging = null
      box.style.cursor = 'grab'
    }
    box.addEventListener('pointerdown', onDown)
    box.addEventListener('pointermove', onPointerMove)
    box.addEventListener('pointerup', release)
    box.addEventListener('pointercancel', release)

    const shake = shakeRef.current
    const onShake = () =>
      bodies.forEach((b) => {
        b.vy -= 14 + Math.random() * 11
        b.vx += (Math.random() - 0.5) * 17
        b.va += (Math.random() - 0.5) * 0.3
      })
    shake?.addEventListener('click', onShake)

    const flip = flipRef.current
    const onFlip = () => {
      gy = -gy
      if (flip) flip.textContent = gy > 0 ? 'gravity: down' : 'gravity: up'
      bodies.forEach((b) => {
        b.vy += gy * 4
      })
    }
    flip?.addEventListener('click', onFlip)

    return () => {
      offTheme()
      io.disconnect()
      cancelAnimationFrame(traf)
      window.removeEventListener('resize', onResize)
      box.removeEventListener('pointerdown', onDown)
      box.removeEventListener('pointermove', onPointerMove)
      box.removeEventListener('pointerup', release)
      box.removeEventListener('pointercancel', release)
      shake?.removeEventListener('click', onShake)
      flip?.removeEventListener('click', onFlip)
      clearTimeout(rt)
    }
  }, [projects])

  return (
    <section id="tray" className="tray">
      <div className="tray-head">
        <h2 className="tray-title">
          The tray <span>/ grab a coin, throw it, click it</span>
        </h2>
        <div className="tray-btns">
          <button ref={shakeRef} className="btn btn-lime" data-cur="shake!">
            shake the tray
          </button>
          <button ref={flipRef} className="btn btn-white" data-cur="flip g">
            gravity: down
          </button>
        </div>
      </div>

      <div className="tray-box" ref={boxRef}>
        <canvas className="tray-cv" ref={cvRef} />
        <div className="tray-meta">
          <span ref={fpsRef}>60</span> fps · <span ref={nRef}>0</span> bodies ·
          hand-rolled integrator
        </div>
      </div>

      <div className="tray-open">
        <span className="hint">or just read them:</span>
        {projects.map((p) => (
          <button
            key={p.id}
            className="chip-btn"
            data-cur="open"
            onClick={() => onOpen(p.id)}
          >
            {p.name}
          </button>
        ))}
      </div>
    </section>
  )
}
