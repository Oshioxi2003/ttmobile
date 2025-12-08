import api from './api'

let cached = null
let pending = null
const LS_KEY = 'settings_public_cache_v1'
function readLS() {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || '{}') } catch { return {} }
}
function writeLS(data) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(data || {})) } catch {}
}

const PUBLIC_ENDPOINT = import.meta?.env?.VITE_PUBLIC_SETTINGS_ENDPOINT // ví dụ '/settings/public'
// Chỉ dùng các endpoint public của backend
const SITE_ENDPOINTS = [
  import.meta?.env?.VITE_SETTINGS_SITE_ENDPOINT,
  '/settings/site'
].filter(Boolean)
const CONTACT_SOCIAL_ENDPOINTS = [
  import.meta?.env?.VITE_SETTINGS_CONTACT_ENDPOINT,
  '/settings/purchase-contact'
].filter(Boolean)

function toObject(raw) {
  if (!raw) return {}
  if (Array.isArray(raw)) {
    const out = {}
    for (const it of raw) {
      const k = it?.key || it?.name
      const v = it?.value ?? it?.val ?? it?.content
      if (k != null) out[k] = v
    }
    return out
  }
  return { ...raw }
}

async function safeGet(ep, params) {
  try {
    const res = await api.get(ep, {
      params: { ...(params || {}), _ts: Date.now() },
      __noRetry: true,
      skipAuthRedirect: true
    })
    // Một số proxy có thể vẫn trả 304
    if (res?.status === 304) {
      const cachedLS = readLS()
      return cachedLS
    }
    const data = res?.data?.data || res?.data || {}
    // lưu localStorage để lần sau 304 vẫn có dữ liệu
    try { if (Object.keys(data).length) writeLS(data) } catch {}
    return data
  } catch (e) {
    // fallback từ localStorage nếu có
    const cachedLS = readLS()
    if (cachedLS && Object.keys(cachedLS).length) return cachedLS
    return {}
  }
}

async function safeGetFirst(endpoints, params) {
  for (const ep of endpoints) {
    const data = await safeGet(ep, params)
    if (data && Object.keys(data).length) return data
  }
  return {}
}

const settingService = {
  // Lấy settings công khai cho client (có cache + chống bắn trùng, hợp nhất nhiều group)
  async getPublicSettings() {
    if (cached) return cached
    if (pending) return pending

    const run = async () => {
      if (PUBLIC_ENDPOINT) {
        const all = await safeGet(PUBLIC_ENDPOINT)
        let obj = toObject(all)
        // Nếu endpoint public không bao gồm contact/social thì gọi bổ sung (gom chung purchase-contact)
        const needContact = !obj.contact_phone && !obj.contact_email && !obj.contact_address
        const needSocial = !obj.facebook_url && !obj.zalo_phone && !obj.facebook_name
        const extra = (needContact || needSocial) ? await safeGetFirst(CONTACT_SOCIAL_ENDPOINTS) : {}
        cached = { ...obj, ...toObject(extra) }
        return cached
      }
      const [site, extra] = await Promise.all([
        safeGetFirst(SITE_ENDPOINTS),
        safeGetFirst(CONTACT_SOCIAL_ENDPOINTS)
      ])
      cached = { ...toObject(site), ...toObject(extra) }
      return cached
    }

    pending = run()
    try {
      return await pending
    } finally {
      pending = null
    }
  }
}

export default settingService

