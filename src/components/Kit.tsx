import type { StackGroup } from '../lib/types'
import { Reveal } from './Reveal'

export function Kit({ stack }: { stack: StackGroup[] }) {
  return (
    <section id="kit" className="kit">
      <div className="kit-head">
        <h2 className="kit-title">
          The kit <span>/ what I reach for, and how often</span>
        </h2>
        <span className="kit-legend">daily → occasionally</span>
      </div>
      <div className="kit-grid">
        {stack.map((g, i) => (
          <Reveal key={g.group} className="kit-card" delay={(i % 4) * 0.06}>
            <div className="kit-card-head">
              <span className="kit-group">{g.group}</span>
              <span className="kit-note">{g.note}</span>
            </div>
            {g.items.map((it) => (
              <div className="kit-item" key={it.n}>
                <span className="kit-n">{it.n}</span>
                <span className="kit-y">{it.y}</span>
              </div>
            ))}
          </Reveal>
        ))}
      </div>
    </section>
  )
}
