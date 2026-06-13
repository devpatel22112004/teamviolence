/**
 * API base URL helper.
 * Vite dev server proxies /api → backend, so the empty-string default works locally.
 * Set VITE_API_BASE_URL (or VITE_API_URL) to override for production deployments.
 */
export function getApiBase() {
  const env = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL
  if (env) return String(env).replace(/\/$/, '')
  return ''
}

export function apiUrl(path) {
  const base = getApiBase()
  return `${base}${path.startsWith('/') ? path : `/${path}`}`
}
