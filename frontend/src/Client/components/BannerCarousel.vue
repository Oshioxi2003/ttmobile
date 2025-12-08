<template>
  <div v-if="banners.length > 0" class="relative w-full overflow-hidden bg-gray-200">
    <!-- Banner Container -->
    <div class="relative h-[300px] md:h-[450px] lg:h-[500px]">
      <!-- Banners -->
      <transition-group name="fade" tag="div" class="relative h-full">
        <div
          v-for="(banner, index) in [currentBanner]"
          :key="banner.id"
          class="absolute inset-0 transition-opacity duration-500"
        >
          <a
            :href="banner.linkUrl || '#'"
            :target="banner.linkUrl ? '_blank' : '_self'"
            class="block h-full w-full"
          >
            <img
              :src="asset(banner.image)"
              :alt="banner.title"
              class="h-full w-full object-cover"
            />
            <!-- Overlay with text -->
            <div v-if="banner.title || banner.description" class="absolute inset-0 bg-black/30 flex flex-col items-center justify-center">
              <h2 v-if="banner.title" class="text-white text-2xl md:text-4xl font-bold text-center px-4 mb-2">
                {{ banner.title }}
              </h2>
              <p v-if="banner.description" class="text-white text-sm md:text-lg text-center px-4 max-w-2xl">
                {{ banner.description }}
              </p>
            </div>
          </a>
        </div>
      </transition-group>

      <!-- Navigation Arrows -->
      <button
        v-if="banners.length > 1"
        @click="previousBanner"
        class="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/50 hover:bg-white/80 text-gray-800 p-2 rounded-full transition-colors"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>

      <button
        v-if="banners.length > 1"
        @click="nextBanner"
        class="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/50 hover:bg-white/80 text-gray-800 p-2 rounded-full transition-colors"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </button>

      <!-- Dots Navigation -->
      <div v-if="banners.length > 1" class="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        <button
          v-for="(banner, index) in banners"
          :key="banner.id"
          @click="currentIndex = index"
          :class="[
            'w-3 h-3 rounded-full transition-colors',
            currentIndex === index ? 'bg-white' : 'bg-white/50 hover:bg-white/70'
          ]"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { resolveAssetUrl as asset } from '@/utils/assets'
import bannerService from '@/services/bannerService'

const props = defineProps({
  position: {
    type: String,
    default: 'top'
  },
  autoRotate: {
    type: Boolean,
    default: true
  },
  rotateInterval: {
    type: Number,
    default: 5000
  }
})

const banners = ref([])
const currentIndex = ref(0)
const loading = ref(false)
let rotateTimer = null

const currentBanner = computed(() => banners.value[currentIndex.value])

const fetchBanners = async () => {
  try {
    loading.value = true
    const res = await bannerService.getBannersByPosition(props.position)
    banners.value = res.data?.data || []
  } catch (error) {
    console.error('Error fetching banners:', error)
    banners.value = []
  } finally {
    loading.value = false
  }
}

const nextBanner = () => {
  currentIndex.value = (currentIndex.value + 1) % banners.value.length
  resetTimer()
}

const previousBanner = () => {
  currentIndex.value = (currentIndex.value - 1 + banners.value.length) % banners.value.length
  resetTimer()
}

const startAutoRotate = () => {
  if (props.autoRotate && banners.value.length > 1) {
    rotateTimer = setInterval(() => {
      nextBanner()
    }, props.rotateInterval)
  }
}

const resetTimer = () => {
  if (rotateTimer) clearInterval(rotateTimer)
  startAutoRotate()
}

onMounted(() => {
  fetchBanners()
  startAutoRotate()
})

onUnmounted(() => {
  if (rotateTimer) clearInterval(rotateTimer)
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>

