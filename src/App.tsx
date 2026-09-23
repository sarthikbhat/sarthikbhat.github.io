import { useEffect } from 'react'
import { useContent } from './hooks/useContent'
import { initTheme } from './lib/theme'
import { Cursor } from './components/Cursor'
import { ScrollProgress } from './components/ScrollProgress'
import { JourneyApp } from './variants/journey/JourneyApp'

export default function App() {
  const { content } = useContent()

  useEffect(() => {
    initTheme()
  }, [])

  return (
    <div className="page">
      <div className="noise" aria-hidden="true" />
      <Cursor />
      <ScrollProgress />
      <JourneyApp content={content} />
    </div>
  )
}
