import { useEffect, useRef } from 'react'
import type { Content } from '../lib/types'
import { Icon } from './icons'
import { useMagnet } from '../hooks/useMagnet'
import { ThemeSwitch } from './ThemeSwitch'

export function Contact({ content }: { content: Content }) {
  const { contact, identity, socials } = content
  const clockRef = useRef<HTMLSpanElement>(null)
  const email = useMagnet<HTMLAnchorElement>()
  const resume = useMagnet<HTMLAnchorElement>()

  useEffect(() => {
    const el = clockRef.current
    if (!el) return
    const tick = () => {
      const d = new Date(Date.now() + (330 + new Date().getTimezoneOffset()) * 60000)
      el.textContent =
        [d.getHours(), d.getMinutes(), d.getSeconds()]
          .map((n) => String(n).padStart(2, '0'))
          .join(':') + ' IST'
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="contact" className="contact">
      <div className="contact-card">
        <div className="contact-eyebrow">{contact.eyebrow}</div>
        <h2 className="contact-title">
          {contact.headingPre}
          <span className="contact-accent">{contact.headingAccent}</span>
        </h2>
        <div className="contact-row">
          <p className="contact-blurb">{contact.blurb}</p>
          <div className="contact-actions">
            <a
              className="btn-lg primary"
              data-cur="✉"
              href={`mailto:${identity.email}`}
              ref={email.ref}
              onPointerMove={email.onPointerMove}
              onPointerLeave={email.onPointerLeave}
            >
              {identity.email}
            </a>
            <a
              className="btn-lg ghost"
              data-cur="pdf"
              href={identity.resumeUrl}
              target={identity.resumeUrl.startsWith('#') ? undefined : '_blank'}
              rel="noreferrer"
              ref={resume.ref}
              onPointerMove={resume.onPointerMove}
              onPointerLeave={resume.onPointerLeave}
            >
              résumé
            </a>
          </div>
        </div>
        <div className="socials-row">
          {socials.map((s) => (
            <a
              key={s.icon}
              className="social-pill"
              data-cur={s.icon}
              href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
            >
              <Icon name={s.icon} size={16} />
              {s.label}
              <span className="social-handle">{s.handle}</span>
            </a>
          ))}
        </div>
      </div>
      <div className="footer">
        <span>
          © {identity.year} {identity.name} - {identity.footerNote}
        </span>
        <span ref={clockRef}>--:--:-- IST</span>
        <ThemeSwitch />
      </div>
    </section>
  )
}
