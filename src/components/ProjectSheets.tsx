import { useEffect } from 'react'
import type { Project } from '../lib/types'
import { CountUp } from './CountUp'

export function ProjectSheets({
  projects,
  openId,
  onClose,
}: {
  projects: Project[]
  openId: string | null
  onClose: () => void
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = openId ? 'hidden' : ''
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [openId, onClose])

  return (
    <>
      <div
        className={`scrim${openId ? ' open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      {projects.map((p) => (
        <aside
          key={p.id}
          className={`sheet${openId === p.id ? ' open' : ''}`}
          aria-hidden={openId === p.id ? undefined : true}
        >
          <div className="sheet-head">
            <div>
              <div className="sheet-kind">
                {p.kind} · {p.year}
              </div>
              <h3 className="sheet-title">{p.name}</h3>
            </div>
            <button
              className="sheet-close"
              data-cur="close"
              onClick={onClose}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
          <p className="sheet-blurb">{p.blurb}</p>
          <div className="sheet-stats">
            {p.stats.map((s) => (
              <div key={s.k} className="stat">
                <div className="stat-v">
                  <CountUp value={s.v} active={openId === p.id} />
                </div>
                <div className="stat-k">{s.k}</div>
              </div>
            ))}
          </div>
          <div className="sheet-snippet">{p.snippet}</div>
          <div className="sheet-hard">{p.hard}</div>
        </aside>
      ))}
    </>
  )
}
