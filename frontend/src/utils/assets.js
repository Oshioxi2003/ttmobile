export function resolveAssetUrl(path) {
  if (!path) return ''
  // Absolute URL
  if (/^https?:\/\//i.test(path)) return path

  // Use VITE_ASSET_BASE if provided (e.g., http://localhost:3000)
  const base = import.meta.env.VITE_ASSET_BASE
  if (base) {
    const cleanBase = String(base).replace(/\/$/, '')
    const cleanPath = String(path).startsWith('/') ? path : `/${path}`
    return `${cleanBase}${cleanPath}`
  }

  // Fallback: ensure leading slash so dev proxy can handle /uploads
  return String(path).startsWith('/') ? path : `/${path}`
}

export default resolveAssetUrl

