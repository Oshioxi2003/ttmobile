<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const router = useRouter()
const authStore = useAuthStore()

onMounted(async () => {
  if (authStore.token) {
    await authStore.fetchUser()
    if (!authStore.isAdmin) {
      router.push('/login')
    }
  }
})
</script>

