import { useEffect, type RefObject } from 'react'

export interface GLHooks<T> {
  init: (gl: WebGLRenderingContext) => T | null
  frame: (
    gl: WebGLRenderingContext,
    handles: T,
    tSec: number,
    w: number,
    h: number,
  ) => void
  deps?: unknown[]
}

export function useGL<T>(
  canvasRef: RefObject<HTMLCanvasElement>,
  hooks: GLHooks<T>,
) {
  useEffect(() => {
    const cv = canvasRef.current
    if (!cv) return
    const gl = cv.getContext('webgl', {
      antialias: true,
      alpha: true,
      premultipliedAlpha: false,
    })
    if (!gl) return
    const dpr = Math.min(2, devicePixelRatio || 1)
    const handles = hooks.init(gl)
    if (!handles) return

    let w = 0
    let h = 0
    const resize = () => {
      w = cv.clientWidth
      h = cv.clientHeight
      cv.width = Math.round(w * dpr)
      cv.height = Math.round(h * dpr)
      gl.viewport(0, 0, cv.width, cv.height)
    }
    resize()

    let raf = 0
    let start = 0
    let running = false
    const loop = (now: number) => {
      if (!start) start = now
      hooks.frame(gl, handles, (now - start) / 1000, cv.width, cv.height)
      raf = requestAnimationFrame(loop)
    }
    const play = () => {
      if (running) return
      running = true
      raf = requestAnimationFrame(loop)
    }
    const stop = () => {
      running = false
      if (raf) cancelAnimationFrame(raf)
      raf = 0
    }

    const io = new IntersectionObserver(
      (es) => es.forEach((e) => (e.isIntersecting ? play() : stop())),
      { threshold: 0.01 },
    )
    io.observe(cv)

    let rt: ReturnType<typeof setTimeout>
    const onResize = () => {
      clearTimeout(rt)
      rt = setTimeout(resize, 150)
    }
    window.addEventListener('resize', onResize)

    return () => {
      io.disconnect()
      stop()
      window.removeEventListener('resize', onResize)
      clearTimeout(rt)
    }
  }, hooks.deps ?? [])
}
