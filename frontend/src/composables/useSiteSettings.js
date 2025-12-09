import { ref } from 'vue'
import api from '@/services/api'
import { useSettingStore } from '@/stores/settingStore'

const siteSettings = ref({
  site_name: 'T&T Mobile',
  site_description: '',
  site_logo: '',
  nav_config: '',
  contact_phone: '',
  contact_email: '',
  contact_address: '',
  working_hours: '',
  facebook_url: '',
  facebook_name: '',
  zalo_phone: '',
  zalo_url: '',
  purchase_message: ''
})

const isLoaded = ref(false)

export function useSiteSettings() {
  const settingStore = useSettingStore()

  const loadSettings = async () => {
    if (isLoaded.value) return siteSettings.value

    // Prefer public settings store (cached + merged) to avoid extra calls
    try {
      await settingStore.fetch()
      const name = settingStore.get?.('site_name')
      const desc = settingStore.get?.('site_description')
      const logo = settingStore.get?.('site_logo')
      const nav = settingStore.get?.('nav_config')
      // Contact & social from public store (already merged by settingService)
      const contact_phone = settingStore.get?.('contact_phone')
      const contact_email = settingStore.get?.('contact_email')
      const contact_address = settingStore.get?.('contact_address')
      const working_hours = settingStore.get?.('working_hours')
      const facebook_url = settingStore.get?.('facebook_url')
      const facebook_name = settingStore.get?.('facebook_name')
      const zalo_phone = settingStore.get?.('zalo_phone')
      const zalo_url = settingStore.get?.('zalo_url')
      const purchase_message = settingStore.get?.('purchase_message')

      if (name || desc || logo || nav || contact_phone || contact_email || contact_address || working_hours || facebook_url || facebook_name || zalo_phone || zalo_url || purchase_message) {
        siteSettings.value = {
          site_name: name || siteSettings.value.site_name,
          site_description: desc || siteSettings.value.site_description,
          site_logo: logo || siteSettings.value.site_logo,
          nav_config: nav || siteSettings.value.nav_config,
          contact_phone: contact_phone || siteSettings.value.contact_phone,
          contact_email: contact_email || siteSettings.value.contact_email,
          contact_address: contact_address || siteSettings.value.contact_address,
          working_hours: working_hours || siteSettings.value.working_hours,
          facebook_url: facebook_url || siteSettings.value.facebook_url,
          facebook_name: facebook_name || siteSettings.value.facebook_name,
          zalo_phone: zalo_phone || siteSettings.value.zalo_phone,
          zalo_url: zalo_url || siteSettings.value.zalo_url,
          purchase_message: purchase_message || siteSettings.value.purchase_message
        }
        isLoaded.value = true
      }
    } catch {}

    // Fallback to direct site endpoint if store did not yield values
    if (!isLoaded.value) {
      try {
        const response = await api.get('/settings/site', { skipAuthRedirect: true })
        const data = response.data?.data || response.data || {}
        siteSettings.value = {
          site_name: data.site_name || siteSettings.value.site_name,
          site_description: data.site_description || siteSettings.value.site_description,
          site_logo: data.site_logo || siteSettings.value.site_logo,
          nav_config: data.nav_config || siteSettings.value.nav_config,
          contact_phone: data.contact_phone || siteSettings.value.contact_phone,
          contact_email: data.contact_email || siteSettings.value.contact_email,
          contact_address: data.contact_address || siteSettings.value.contact_address,
          working_hours: data.working_hours || siteSettings.value.working_hours,
          facebook_url: data.facebook_url || siteSettings.value.facebook_url,
          facebook_name: data.facebook_name || siteSettings.value.facebook_name,
          zalo_phone: data.zalo_phone || siteSettings.value.zalo_phone,
          zalo_url: data.zalo_url || siteSettings.value.zalo_url,
          purchase_message: data.purchase_message || siteSettings.value.purchase_message
        }
        isLoaded.value = true
      } catch (error) {
        console.error('Failed to load site settings:', error)
      }
    }

    return siteSettings.value
  }

  return {
    siteSettings,
    loadSettings,
    isLoaded
  }
}
