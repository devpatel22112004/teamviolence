/**
 * Image helpers — used across pages.
 * Preserves the existing encode-spaces-in-path behavior from Home.jsx.
 */

export const FALLBACK_IMG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Crect fill='%231f2937' width='400' height='400'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='24' fill='%236b7280'%3EImage Loading%3C/text%3E%3C/svg%3E"

export function formatImagePath(path) {
  if (!path) return ''
  if (path.startsWith('http')) return path
  return path.split('/').map(part => (part ? encodeURIComponent(part) : part)).join('/')
}

export function handleImageError(e) {
  e.target.src = FALLBACK_IMG
}
