import { useEffect, useRef, useState } from 'react'
import type { Content } from '../lib/types'
import { Icon } from './icons'
import { useMagnet } from '../hooks/useMagnet'

const LINKS = [
  { href: '#tray', label: 'work', cur: 'look' },
  { href: '#kit', label: 'kit', cur: 'stack' },
  { href: '#about', label: 'about', cur: 'hi' },
  { href: '#route', label: 'route', cur: '2017→' },
  { href: '#desk', label: 'desk', cur: 'read' },
]

export function Nav({ content }: { content: Content }) {
  const barRef = useRef<HTMLElement>(null)
  const cta = useMagnet<HTMLAnchorElement>()
  const [open, setOpen] = useState(false)
  const navSocials = content.socials.filter((s) => s.nav)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return
    let last = scrollY
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const y = scrollY
        bar.style.transform =
          y > last && y > 260 && !open ? 'translateY(-130%)' : 'translateY(0)'
        last = y
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [open])

  return (
    <header className="bar" ref={barRef}>
      <div className="bar-left">
        <a href="#top" className="logo" onClick={() => setOpen(false)}>
          <span className="logo-mark" />
          {content.identity.initials}
        </a>
        {/* <ThemeSwitch compact /> */}
      </div>

      <nav className="nav">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} className="nav-link" data-cur={l.cur}>
            {l.label}
          </a>
        ))}
        <span className="nav-sep" />
        {navSocials.map((s) => (
          <a
            key={s.icon}
            href={s.href}
            className="soc"
            data-cur={s.icon}
            aria-label={s.label}
            target="_blank"
            rel="noreferrer"
          >
            <Icon name={s.icon} />
          </a>
        ))}
        <a
          href="#contact"
          className="contact-btn"
          data-cur="say hi"
          ref={cta.ref}
          onPointerMove={cta.onPointerMove}
          onPointerLeave={cta.onPointerLeave}
        >
          contact me →
        </a>
      </nav>

      <button
        type="button"
        className="nav-toggle"
        aria-expanded={open}
        aria-label="Menu"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? 'close ✕' : 'menu ≡'}
      </button>

      {open && (
        <div className="nav-menu">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="menu-link"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <div className="nav-menu-socials">
            {navSocials.map((s) => (
              <a
                key={s.icon}
                href={s.href}
                aria-label={s.label}
                target="_blank"
                rel="noreferrer"
              >
                <Icon name={s.icon} />
              </a>
            ))}
          </div>
          <a
            href="#contact"
            className="menu-cta"
            onClick={() => setOpen(false)}
          >
            contact me →
          </a>
        </div>
      )}
    </header>
  )
}
