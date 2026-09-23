import type { Content } from '../../../lib/types'
import { Icon } from '../../../components/icons'

export function Dusk({
  index,
  content,
}: {
  index: number
  content: Content
}) {
  const { contact, identity, socials } = content
  return (
    <section id="j-dusk" data-scene={index} className="scene scene-dusk">
      <div className="dusk-inner">
        <span className="dusk-eyebrow">{contact.eyebrow}</span>
        <h2 className="dusk-title">
          {contact.headingPre}
          <span className="hero-accent">{contact.headingAccent}</span>
        </h2>
        <p className="dusk-blurb">{contact.blurb}</p>
        <div className="dusk-actions">
          <a
            className="btn-lg primary"
            href={`mailto:${identity.email}`}
            data-cur="✉"
          >
            {identity.email}
          </a>
          <a
            className="btn-lg ghost"
            href={identity.resumeUrl}
            target={identity.resumeUrl.startsWith('#') ? undefined : '_blank'}
            rel="noreferrer"
            data-cur="pdf"
          >
            résumé
          </a>
        </div>
        <div className="dusk-socials">
          {socials.map((s) => (
            <a
              key={s.icon}
              className="social-pill"
              href={s.href}
              data-cur={s.icon}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
            >
              <Icon name={s.icon} size={16} />
              {s.label}
              <span className="social-handle">{s.handle}</span>
            </a>
          ))}
        </div>
        <div className="dusk-foot">
          © {identity.year} {identity.name} — {identity.footerNote}
        </div>
      </div>
    </section>
  )
}
