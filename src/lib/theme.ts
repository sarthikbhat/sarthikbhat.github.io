export type ThemeName =
  | 'clay'
  | 'ferrous'
  | 'oxblood'
  | 'brine'
  | 'plaster'
  | 'inkwell'

export interface Palette {
  paper: string
  ink: string
  a1: string
  a2: string
  a3: string
  card: string
  m1: string
  m2: string
  m3: string
  m4: string
  m5: string
}

export const THEMES: Record<ThemeName, Palette> = {
  clay: { paper: '#F3EDE1', ink: '#15120E', a1: '#FF4A1C', a2: '#4B2BE8', a3: '#CBFF3A', card: '#FFFFFF', m1: '#78716C', m2: '#A8A29E', m3: '#57534E', m4: '#44403C', m5: '#D6D3D1' },
  ferrous: { paper: '#EAE3D7', ink: '#221C18', a1: '#A8402A', a2: '#2F4A3C', a3: '#D9A441', card: '#F7F3EB', m1: '#5C5349', m2: '#6B6154', m3: '#4A423A', m4: '#3B342D', m5: '#D3C9B9' },
  oxblood: { paper: '#E7E4DE', ink: '#1A1418', a1: '#7B2438', a2: '#3F4F5E', a3: '#C5D64B', card: '#F6F4F0', m1: '#5B5354', m2: '#675F60', m3: '#4A4346', m4: '#3B3437', m5: '#CFC9C6' },
  brine: { paper: '#DFE7E3', ink: '#101A1E', a1: '#14646E', a2: '#8F3F20', a3: '#E3C87A', card: '#F3F7F5', m1: '#4F5C5C', m2: '#5D6A6A', m3: '#414D4D', m4: '#333D3D', m5: '#C4D0CB' },
  plaster: { paper: '#EDE3DC', ink: '#1F1A1A', a1: '#A84A33', a2: '#4A2B4A', a3: '#B8C98A', card: '#F9F3EE', m1: '#63564F', m2: '#71635B', m3: '#4F443E', m4: '#3E3531', m5: '#D8C9C0' },
  inkwell: { paper: '#E3E7E6', ink: '#131A22', a1: '#C25E00', a2: '#1B3A5C', a3: '#9FC6C0', card: '#F4F7F7', m1: '#515C61', m2: '#5E696E', m3: '#424C51', m4: '#353D41', m5: '#C6D0D0' },
}

export const THEME_ORDER: ThemeName[] = [
  'clay',
  'ferrous',
  'oxblood',
  'brine',
  'plaster',
  'inkwell',
]

const KEY = 'portfolio-theme'
export const DEFAULT_THEME: ThemeName = 'inkwell'
let currentName: ThemeName = DEFAULT_THEME
let current: Palette = THEMES[DEFAULT_THEME]
const listeners = new Set<(name: ThemeName, p: Palette) => void>()

export function getPalette(): Palette {
  return current
}
export function getThemeName(): ThemeName {
  return currentName
}

export function onTheme(fn: (name: ThemeName, p: Palette) => void): () => void {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

export function applyTheme(name: ThemeName): void {
  const p = THEMES[name]
  currentName = name
  current = p
  const r = document.documentElement.style
  for (const k of Object.keys(p) as (keyof Palette)[]) {
    r.setProperty(`--${k}`, p[k])
  }
  try {
    localStorage.setItem(KEY, name)
  } catch {}
  listeners.forEach((l) => l(name, p))
}

export function initTheme(): void {
  let saved: string | null = null
  try {
    saved = localStorage.getItem(KEY)
  } catch {}
  if (saved && saved in THEMES) applyTheme(saved as ThemeName)
}

export function lum(hex: string): number {
  const n = parseInt(hex.slice(1), 16)
  return (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255
}
