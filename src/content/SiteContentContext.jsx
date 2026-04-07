import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { emptySiteContent } from './emptySiteContent'
import { fetchFullSiteContent } from './contentApi'

const SiteContentContext = createContext({
  content: emptySiteContent,
  isLoading: true,
  error: null,
})

export function SiteContentProvider({ children }) {
  const [content, setContent] = useState(emptySiteContent)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function loadContent() {
      try {
        const nextContent = await fetchFullSiteContent(controller.signal)
        setContent(nextContent)
        setError(null)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError('Vsebine trenutno ni mogoce naložiti. Poskusi znova cez nekaj minut.')
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadContent()

    return () => controller.abort()
  }, [])

  const contextValue = useMemo(
    () => ({
      content,
      isLoading,
      error,
    }),
    [content, isLoading, error],
  )

  return <SiteContentContext.Provider value={contextValue}>{children}</SiteContentContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSiteContent() {
  return useContext(SiteContentContext)
}
