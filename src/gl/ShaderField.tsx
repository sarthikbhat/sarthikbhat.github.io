import { useEffect, useRef } from 'react'
import { getPalette, onTheme, type Palette } from '../lib/theme'
import { useGL } from './useGL'
import { VERT } from './shaders/common'
import { FRAG } from './shaders/field.frag'

export type ShaderMode = 'ink' | 'grid' | 'circuit' | 'dusk'
const MODE_INDEX: Record<ShaderMode, number> = {
  ink: 0,
  grid: 1,
  circuit: 2,
  dusk: 3,
}

export interface ShaderFieldProps {
  mode?: ShaderMode
  intensity?: number
  className?: string
}

function hexToRGB(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16)
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
}

function prefersReduced() {
  return (
    typeof matchMedia !== 'undefined' &&
    matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}
function hasWebGL() {
  return !!document.createElement('canvas').getContext('webgl')
}

interface Handles {
  uRes: WebGLUniformLocation | null
  uTime: WebGLUniformLocation | null
  uMode: WebGLUniformLocation | null
  uIntensity: WebGLUniformLocation | null
  uPointer: WebGLUniformLocation | null
  uPaper: WebGLUniformLocation | null
  uInk: WebGLUniformLocation | null
  uA1: WebGLUniformLocation | null
  uA2: WebGLUniformLocation | null
  uA3: WebGLUniformLocation | null
}

export function ShaderField({
  mode = 'ink',
  intensity = 1,
  className,
}: ShaderFieldProps) {
  const cvRef = useRef<HTMLCanvasElement>(null)
  const modeRef = useRef(MODE_INDEX[mode])
  const targetRef = useRef(MODE_INDEX[mode])
  const lastTRef = useRef(0)
  const intensityRef = useRef(intensity)
  const palRef = useRef<Palette>(getPalette())
  const ptr = useRef({ x: 0.5, y: 0.5 })
  const disabled =
    typeof window !== 'undefined' && (prefersReduced() || !hasWebGL())

  targetRef.current = MODE_INDEX[mode]
  intensityRef.current = intensity

  useEffect(() => {
    const off = onTheme((_n, p) => (palRef.current = p))
    return off
  }, [])

  useEffect(() => {
    if (disabled) return
    const onMove = (e: PointerEvent) => {
      ptr.current.x = e.clientX / innerWidth
      ptr.current.y = 1 - e.clientY / innerHeight
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [disabled])

  useGL<Handles>(cvRef, {
    deps: [disabled],
    init: (gl) => {
      if (disabled) return null
      const compile = (type: number, src: string) => {
        const s = gl.createShader(type)!
        gl.shaderSource(s, src)
        gl.compileShader(s)
        return s
      }
      const prog = gl.createProgram()!
      gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT))
      gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG))
      gl.linkProgram(prog)
      gl.useProgram(prog)
      const buf = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, buf)
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 3, -1, -1, 3]),
        gl.STATIC_DRAW,
      )
      const loc = gl.getAttribLocation(prog, 'aPos')
      gl.enableVertexAttribArray(loc)
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
      const u = (n: string) => gl.getUniformLocation(prog, n)
      return {
        uRes: u('uRes'),
        uTime: u('uTime'),
        uMode: u('uMode'),
        uIntensity: u('uIntensity'),
        uPointer: u('uPointer'),
        uPaper: u('uPaper'),
        uInk: u('uInk'),
        uA1: u('uA1'),
        uA2: u('uA2'),
        uA3: u('uA3'),
      }
    },
    frame: (gl, h, t, w, hgt) => {
      const dt = Math.min(0.05, Math.max(0, t - lastTRef.current))
      lastTRef.current = t
      const diff = targetRef.current - modeRef.current
      if (Math.abs(diff) > 1.2) modeRef.current = targetRef.current
      else modeRef.current += diff * (1 - Math.exp(-dt * 3.5))
      const p = palRef.current
      gl.uniform2f(h.uRes, w, hgt)
      gl.uniform1f(h.uTime, t)
      gl.uniform1f(h.uMode, modeRef.current)
      gl.uniform1f(h.uIntensity, intensityRef.current)
      gl.uniform2f(h.uPointer, ptr.current.x, ptr.current.y)
      gl.uniform3fv(h.uPaper, hexToRGB(p.paper))
      gl.uniform3fv(h.uInk, hexToRGB(p.ink))
      gl.uniform3fv(h.uA1, hexToRGB(p.a1))
      gl.uniform3fv(h.uA2, hexToRGB(p.a2))
      gl.uniform3fv(h.uA3, hexToRGB(p.a3))
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    },
  })

  if (disabled) {
    return (
      <div
        className={`shader-fallback ${className ?? ''}`}
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(160deg, var(--a2), var(--paper) 60%, var(--a3))',
        }}
      />
    )
  }
  return (
    <canvas
      ref={cvRef}
      className={`shader-field ${className ?? ''}`}
      aria-hidden="true"
    />
  )
}
