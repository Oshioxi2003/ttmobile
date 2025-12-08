import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from '@/store'
import '@/assets/css/main.css'
import { useSettingStore } from '@/stores/settingStore'

const app = createApp(App)

app.use(pinia)
app.use(router)

// Preload settings then mount app (non-blocking mount if fails)
const settingStore = useSettingStore()
settingStore.fetch().finally(() => {
  app.mount('#app')
})

