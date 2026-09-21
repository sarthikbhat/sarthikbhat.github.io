import type { Content } from '../lib/types'
import { Reveal } from './Reveal'

export function Desk({ content }: { content: Content }) {
  const { posts } = content
  return (
    <section id="desk" className="desk">
      <div className="desk-head">
        <h2 className="desk-title">On the desk</h2>
        <span className="desk-sub">things I wrote down</span>
      </div>
      <div className="desk-soon" aria-hidden="true">
        <div className="desk-soon-card">
          <span className="desk-soon-cursor">
            nothing here yet<span className="desk-soon-blink">▋</span>
          </span>
          <span className="desk-soon-sub">
            drafts are brewing - words incoming soon
          </span>
        </div>
      </div>
      <div className="posts">
        {posts.map((a, i) => (
          <Reveal
            key={a.title + i}
            className="post"
            rot={parseFloat(a.rot)}
            delay={(i % 4) * 0.07}
            hover
            data-cur="read"
          >
            <div>
              <div className="post-date">{a.date}</div>
              <div className="post-title">{a.title}</div>
            </div>
            <div className="post-foot">
              <span className="post-dek">{a.dek}</span>
              <span className="post-arrow">→</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
