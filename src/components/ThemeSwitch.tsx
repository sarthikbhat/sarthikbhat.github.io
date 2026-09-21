import { useEffect, useState } from 'react'
import {
  THEMES,
  THEME_ORDER,
  applyTheme,
  getThemeName,
  onTheme,
  type ThemeName,
} from '../lib/theme'

export function ThemeSwitch({ compact = false }: { compact?: boolean }) {
  const [name, setName] = useState<ThemeName>(getThemeName())

  useEffect(() => onTheme((n) => setName(n)), [])

  return (
    <span className={compact ? 'theme-switch bar-theme' : 'theme-switch'}>
      {!compact && (
        <span className="theme-label">
          theme: <span className="theme-name">{name}</span>
        </span>
      )}
      <span className="swatches">
        {THEME_ORDER.map((t) => (
          <button
            key={t}
            type="button"
            className={`swatch${t === name ? ' active' : ''}`}
            style={{ background: THEMES[t].a1 }}
            onClick={() => applyTheme(t)}
            aria-label={`${t} theme`}
            aria-pressed={t === name}
            data-cur={t}
          />
        ))}
      </span>
    </span>
  )
}
