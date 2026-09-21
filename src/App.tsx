import { useCallback, useEffect, useState } from 'react'
import { useContent } from './hooks/useContent'
import { initTheme } from './lib/theme'
import { Cursor } from './components/Cursor'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Tray } from './components/Tray'
import { ProjectSheets } from './components/ProjectSheets'
import { Kit } from './components/Kit'
import { About } from './components/About'
import { RouteTimeline } from './components/RouteTimeline'
import { Desk } from './components/Desk'
import { Contact } from './components/Contact'

export default function App() {
  const { content } = useContent()
  const [openId, setOpenId] = useState<string | null>(null)

  useEffect(() => {
    initTheme()
  }, [])

  const openSheet = useCallback((id: string) => setOpenId(id), [])
  const closeSheets = useCallback(() => setOpenId(null), [])

  return (
    <div className="page">
      <div className="noise" aria-hidden="true" />
      <Cursor />
      <Nav content={content} />
      <Hero content={content} />
      <Tray projects={content.projects} onOpen={openSheet} />
      <ProjectSheets
        projects={content.projects}
        openId={openId}
        onClose={closeSheets}
      />
      <Kit stack={content.stack} />
      <About content={content} />
      <RouteTimeline stops={content.stops} />
      <Desk content={content} />
      <Contact content={content} />
    </div>
  )
}
