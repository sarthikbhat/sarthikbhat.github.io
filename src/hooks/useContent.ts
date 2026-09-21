import { useEffect, useState } from 'react'
import { defaults, loadContent } from '../lib/content'
import type { Content } from '../lib/types'

export function useContent(): { content: Content; loading: boolean } {
  const [content, setContent] = useState<Content>(defaults)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true
    loadContent().then((c) => {
      if (!alive) return
      setContent(c)
      setLoading(false)
    })
    return () => {
      alive = false
    }
  }, [])

  return { content, loading }
}
