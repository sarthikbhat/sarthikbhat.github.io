import type { Content } from '../lib/types'
import { Reveal } from './Reveal'

export function About({ content }: { content: Content }) {
  const { about, notes } = content
  return (
    <section id="about" className="about">
      <div className="about-grid">
        <div>
          <h2 className="about-title">
            {about.headingPre}
            <span className="about-accent">{about.headingAccent}</span>
            {about.headingPost}
          </h2>
          <p className="about-p1">{about.p1}</p>
          <p className="about-p2">{about.p2}</p>
        </div>
        <div className="notes">
          {notes.map((n, i) => (
            <Reveal
              key={n.tag + i}
              className="note"
              rot={parseFloat(n.rot)}
              delay={i * 0.06}
              hover
            >
              <div className="note-tape" />
              <div className="note-tag">{n.tag}</div>
              <div className="note-body">{n.body}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
