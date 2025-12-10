<template>
  <router-view v-slot="{ Component, route }">
    <keep-alive :include="['Dashboard', 'Products', 'Users', 'Pages', 'Settings', 'Categories', 'Banners']">
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="route.path" />
      </transition>
    </keep-alive>
  </router-view>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const router = useRouter()
const authStore = useAuthStore()

onMounted(async () => {
  if (authStore.token) {
    try {
      await authStore.fetchUser()
      if (!authStore.isAdmin) {
        router.push('/login')
      }
    } catch (error) {
      console.error('Failed to fetch user:', error)
      router.push('/login')
    }
  }
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

