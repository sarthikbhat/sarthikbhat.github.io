import type { Content } from './types'

/**
 * Where the editable content is loaded from at runtime.
 *
 * Phase 1 (now): the bundled `/content.json` in `public/`.
 * Phase 2 (no-redeploy edits): set VITE_CONTENT_URL to an npoint.io / jsonbin
 * raw URL. Edit the JSON there, and the live site picks it up on next load -
 * no rebuild, no redeploy. The `defaults` below always render if the fetch
 * fails, so the site never breaks.
 */
export const CONTENT_URL: string =
  import.meta.env.VITE_CONTENT_URL ?? '/content.json'

export const defaults: Content = {
  identity: {
    name: 'Sarthik Bhat',
    initials: 'S.B',
    role: 'Frontend Engineer',
    location: 'Mumbai',
    email: 'bhatsarthik28@gmail.com',
    resumeUrl: '#top',
    footerNote: 'hand-built, no framework was harmed',
    year: '2026',
  },
  hero: {
    eyebrow: 'Sarthik Bhat - FRONTEND ENGINEER, MUMBAI',
    line1: 'I MAKE THE WEB',
    line2: 'FEEL LIKE',
    line3: 'SOMETHING.',
    badge: '5 yrs\n3 teams\n1 keyboard',
    blurb:
      '5 years of interfaces that hold up under real traffic. I write the component and read the query plan behind it, which is most of why the frontend ends up fast.',
  },
  about: {
    headingPre: 'I like the part ',
    headingAccent: 'where it gets hard',
    headingPost: ' and everyone else has gone to lunch.',
    p1: 'Nine years on teams small enough that "frontend engineer" also meant the migration, the dashboard and the postmortem. Happiest refactoring the component nobody wants to open, then deleting half of it.',
    p2: 'Outside that: bouldering, keyboards nobody needs, and a folder of half-finished side projects I refuse to discuss.',
  },
  contact: {
    eyebrow: 'ONE TICKET, ADMIT ONE PROJECT',
    headingPre: 'Got something that needs ',
    headingAccent: 'shipping?',
    blurb:
      'or a second opinion on your render tree. I reply within a day, usually with too many questions.',
  },
  tags: ['TypeScript', 'React', 'Node', 'ExpressJS', 'Postgres', 'Java'],
  projects: [
    { id: 'kanban', name: 'KanBan Board', kind: 'SDLC', year: '2023', blurb: 'Kanban is a comprehensive web application to facilitate agile software delivery methodologies. It incorporates features like user authentication, project creation, task addition, task specific comments and collaboration.', snippet: 'await tickets.patch(doc, ops, okr)', hard: 'The hard part was not the CRDT. It was convincing a reconnecting client that the server was right without dropping the three edits the user made in a tunnel.', stats: [{ v: '40k/s', k: 'sustained ops' }, { v: '12ms', k: 'p99 latency' }, { v: '0', k: 'lost docs' }] },
    { id: 'coptime', name: 'Coptime', kind: 'SIH 2020', year: '2020', blurb: 'The project was to automate and digitalize the complaint filing process in a police station as well as an emergency SOS to notify the nearest police stations. It was built using react native and web dashboard', snippet: 'npx prism migrate v4\n✓ 412 files, 0 manual edits', hard: 'Nobody adopts a design system because it is good. They adopt it because migrating is easier than not migrating. So I shipped the migration first.', stats: [{ v: '112', k: 'components' }, { v: '9', k: 'teams' }, { v: '0', k: 'forks' }] },
    { id: 'motherboard', name: 'Motherboard', kind: 'side project', year: '2020', blurb: 'Created a student-teacher portal for enhancing the learning process with a WhatsApp type interface for sharing important information , attendance manager and a grievances portal.It is a real time chat application.', snippet: 'spans: 204,881\nframe budget used: 14.2ms', hard: 'Hit-testing 200k rectangles at pointer speed. Answer: a spatial index rebuilt on zoom, not on move. Obvious in hindsight, three days in practice.', stats: [{ v: '200k', k: 'spans' }, { v: '60fps', k: 'while panning' }, { v: '1.4mb', k: 'wasm' }] },
    { id: 'water', name: 'Water.io', kind: 'SIH 2019', year: '2019', blurb: 'An interactive webapp to predict groundwater level for the user specified region, for upcoming 10 years with an accuracy of 90%,(ARIMA Model). The data was scraped from data.gov.in using Flask.', snippet: '$ hog build\n✓ 34 pages in 181ms', hard: 'Shipped it to scratch my own itch, then three thousand people showed up with itches of their own. Saying no politely turned out to be the real skill.', stats: [{ v: '3.1k', k: 'stars' }, { v: '181ms', k: 'cold build' }, { v: '11kb', k: 'shipped js' }] },
  ],
  notes: [
    { rot: '-2.2', tag: 'THE RULE', body: 'If an animation cannot be cancelled mid-flight, it is a cutscene, and nobody asked for a cutscene.' },
    { rot: '1.8', tag: 'THE HABIT', body: 'Every effect ships with a frame budget. Nice is not a metric. Neither is smooth.' },
    { rot: '-1.2', tag: 'THE TELL', body: 'Show me your empty states and I can tell you how the rest of the product was built.' },
  ],
  stops: [
    { when: '2017 - 2018', role: 'Frontend engineer', company: 'Studio Ampere', detail: 'Twelve sites in a year. The fastest known way to develop opinions about CSS.' },
    { when: '2018 - 2020', role: 'Full-stack engineer', company: 'Merrow', detail: 'Two people, one Postgres box, far too many features. Learned what you carry when nobody hands you a diagram.' },
    { when: '2020 - 2023', role: 'Senior engineer, product', company: 'Kestrel Labs', detail: 'Collaborative editor from prototype to 90k daily users. Wrote the sync layer, then the runbook for the night it broke.' },
    { when: '2023 - NOW', role: 'Staff frontend engineer', company: 'Northlane', detail: 'Own the web platform. Cut initial load 4.2s to 1.1s, then wrote the CI budget that keeps it there.' },
  ],
  posts: [
    { rot: '-1.6', date: 'AUG 2026', title: 'Your virtual list is lying to you', dek: 'Measured rows beat estimated ones, and the three bugs you get free when they disagree.' },
    { rot: '1.4', date: 'JUN 2026', title: 'Springs beat easing curves', dek: 'Forty lines of integrator you can paste anywhere, and why it feels alive.' },
    { rot: '-0.9', date: 'MAR 2026', title: 'Design tokens are a build problem', dek: 'Stop shipping a theme object. Ship generated CSS and let the cascade work.' },
    { rot: '2.1', date: 'JAN 2026', title: 'The refactor nobody approved', dek: 'Deleting 8,000 lines in pieces small enough that review stays pleasant.' },
  ],
  stack: [
    { group: 'Interface', note: 'daily', items: [{ n: 'TypeScript', y: '5 yrs' }, { n: 'React', y: '5 yrs' }, { n: 'CSS architecture', y: '5 yrs' }, { n: 'Motion / springs', y: '3 yrs' }, { n: 'Accessibility (WCAG 2.2)', y: '4 yrs' }] },
    { group: 'Systems', note: 'weekly', items: [{ n: 'Node', y: '5 yrs' }, { n: 'Go', y: '2 yrs' }, { n: 'Postgres', y: '4 yrs' }, { n: 'REST / GraphQL', y: '4 yrs' }, { n: 'Schema + migrations', y: '3 yrs' }] },
    { group: 'Platform', note: 'monthly', items: [{ n: 'Docker', y: '4 yrs' }, { n: 'GitHub Actions', y: '4 yrs' }, { n: 'Kubernetes', y: '2 yrs' }, { n: 'Terraform', y: '2 yrs' }, { n: 'OpenTelemetry', y: '2 yrs' }] },
    { group: 'Sharp edges', note: 'when it matters', items: [{ n: 'Canvas / WebGL', y: '3 yrs' }, { n: 'Perf budgets', y: '3 yrs' }, { n: 'Incident response', y: '3 yrs' }, { n: 'Rust → WASM', y: '1 yr' }, { n: 'Mentoring by pairing', y: '2 yrs' }] },
  ],
  socials: [
    { label: "GitHub", handle: "@sarthikbhat", href: "https://github.com/sarthikbhat", icon: "github", nav: true },
    { label: "LinkedIn", handle: "/in/sarthik-bhat", href: "https://linkedin.com/in/sarthik-bhat", icon: "linkedin", nav: true },
    { label: "Email", handle: "bhatsarthik28@gmail.com", href: "mailto:bhatsarthik28@gmail.com", icon: "email", nav: false }
  ],
}

/** Fetch content at runtime, falling back to bundled defaults per top-level key. */
export async function loadContent(): Promise<Content> {
  try {
    const res = await fetch(CONTENT_URL, { cache: 'no-cache' })
    if (!res.ok) throw new Error(`content fetch ${res.status}`)
    const data = (await res.json()) as Partial<Content>
    return { ...defaults, ...data }
  } catch (err) {
    console.warn('[content] using bundled defaults:', err)
    return defaults
  }
}
