import { useCallback, useState } from 'react'
import type { Content } from '../../lib/types'
import { Nav } from '../../components/Nav'
import { Hero } from '../../components/Hero'
import { Tray } from '../../components/Tray'
import { ProjectSheets } from '../../components/ProjectSheets'
import { Kit } from '../../components/Kit'
import { About } from '../../components/About'
import { RouteTimeline } from '../../components/RouteTimeline'
import { Desk } from '../../components/Desk'
import { Contact } from '../../components/Contact'

export function ForgeApp({ content }: { content: Content }) {
  const [openId, setOpenId] = useState<string | null>(null)
  const openSheet = useCallback((id: string) => setOpenId(id), [])
  const closeSheets = useCallback(() => setOpenId(null), [])

  return (
    <>
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
    </>
  )
}
