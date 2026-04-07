const defaultApiBase = 'http://localhost:8787'

function resolveApiBaseUrl() {
  const value = import.meta.env.VITE_API_BASE_URL

  if (!value) {
    return defaultApiBase
  }

  return value.replace(/\/$/, '')
}

export async function fetchFullSiteContent(signal) {
  const baseUrl = resolveApiBaseUrl()
  const response = await fetch(`${baseUrl}/api/content/full`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
    signal,
  })

  if (!response.ok) {
    throw new Error(`Content API responded with status ${response.status}`)
  }

  const payload = await response.json()

  if (!payload || typeof payload !== 'object' || !payload.data) {
    throw new Error('Content API returned an invalid payload')
  }

  return payload.data
}
