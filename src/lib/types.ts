export interface Identity {
  name: string
  initials: string
  role: string
  location: string
  email: string
  resumeUrl: string
  footerNote: string
  year: string
}

export interface Hero {
  eyebrow: string
  line1: string
  line2: string
  line3: string
  badge: string
  blurb: string
}

export interface About {
  headingPre: string
  headingAccent: string
  headingPost: string
  p1: string
  p2: string
}

export interface Contact {
  eyebrow: string
  headingPre: string
  headingAccent: string
  blurb: string
}

export interface Stat {
  v: string
  k: string
}

export interface Project {
  id: string
  name: string
  kind: string
  year: string
  blurb: string
  snippet: string
  hard: string
  stats: Stat[]
}

export interface Note {
  rot: string
  tag: string
  body: string
}

export interface Stop {
  when: string
  role: string
  company: string
  detail: string
}

export interface Post {
  rot: string
  date: string
  title: string
  dek: string
}

export interface KitItem {
  n: string
  y: string
}

export interface StackGroup {
  group: string
  note: string
  items: KitItem[]
}

export type IconName = 'github' | 'linkedin' | 'bluesky' | 'email'

export interface Social {
  label: string
  handle: string
  href: string
  icon: IconName
  nav: boolean
}

export interface Content {
  identity: Identity
  hero: Hero
  about: About
  contact: Contact
  tags: string[]
  projects: Project[]
  notes: Note[]
  stops: Stop[]
  posts: Post[]
  stack: StackGroup[]
  socials: Social[]
}
