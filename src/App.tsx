import { useCallback, useEffect, useState } from 'react'
import { useContent } from './hooks/useContent'
import { initTheme } from './lib/theme'
import { Cursor } from './components/Cursor'
import { ScrollProgress } from './components/ScrollProgress'
import { VariantToggle } from './components/VariantToggle'
import { ForgeApp } from './variants/forge/ForgeApp'
import { JourneyApp } from './variants/journey/JourneyApp'

export type Variant = 'forge' | 'journey'
const VKEY = 'portfolio-variant'

function initVariant(): Variant {
  const q = new URLSearchParams(location.search).get('v')
  if (q === 'forge' || q === 'journey') return q
  try {
    const s = localStorage.getItem(VKEY)
    if (s === 'forge' || s === 'journey') return s
  } catch {}
  return 'journey'
}

export default function App() {
  const { content } = useContent()
  const [variant, setVariant] = useState<Variant>(initVariant)

  useEffect(() => {
    initTheme()
  }, [])

  const changeVariant = useCallback((v: Variant) => {
    setVariant(v)
    try {
      localStorage.setItem(VKEY, v)
    } catch {}
    const url = new URL(location.href)
    url.searchParams.set('v', v)
    history.replaceState(null, '', url)
  }, [])

  return (
    <div className="page" data-variant={variant}>
      <div className="noise" aria-hidden="true" />
      <Cursor />
      <ScrollProgress />
      <VariantToggle variant={variant} onChange={changeVariant} />
      {variant === 'forge' ? (
        <ForgeApp content={content} />
      ) : (
        <JourneyApp content={content} />
      )}
    </div>
  )
}
