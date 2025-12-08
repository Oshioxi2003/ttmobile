<template>
  <div class="product-card group cursor-pointer" @click="goToProduct">
    <!-- Image Container -->
    <div class="relative mb-4 overflow-hidden">
      <!-- Badge -->
      <span
        v-if="product.badge"
        :class="[
          'badge absolute top-2 left-2 z-10',
          product.badge === 'HOT' ? 'badge-hot' :
          product.badge === 'NEW' ? 'badge-new' : 'badge-sale'
        ]"
      >
        {{ product.badge }}
      </span>

      <!-- Product Image -->
      <div class="aspect-square bg-background flex items-center justify-center" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
        <img
          v-if="displayedImage"
          :src="asset(displayedImage)"
          :alt="product.name"
          class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
        >
        <div v-else class="w-full h-full bg-gray-100 flex items-center justify-center">
          <svg class="w-16 h-16 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M5.5 2C4.12 2 3 3.12 3 4.5v15C3 20.88 4.12 22 5.5 22h13c1.38 0 2.5-1.12 2.5-2.5v-15C21 3.12 19.88 2 18.5 2h-13zM12 20c-.83 0-1.5-.67-1.5-1.5S11.17 17 12 17s1.5.67 1.5 1.5S12.83 20 12 20z"/>
          </svg>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="absolute bottom-0 left-0 right-0 bg-black/60 py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center gap-2">
        <button
          @click.stop="addToWishlist"
          class="p-2 bg-white rounded-full hover:bg-primary hover:text-white transition-colors"
          title="Thêm vào yêu thích"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
        </button>
        <button
          @click.stop="quickView"
          class="p-2 bg-white rounded-full hover:bg-primary hover:text-white transition-colors"
          title="Xem nhanh"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Product Info -->
    <div>
      <h3 class="font-semibold text-text mb-2 line-clamp-2 min-h-[48px] group-hover:text-primary transition-colors">
        {{ product.name }}
      </h3>

      <!-- Condition -->
      <p v-if="product.condition" class="text-text-muted text-sm mb-2">
        {{ product.condition }}
      </p>

      <!-- Price -->
      <div class="flex items-center gap-2 mb-3">
        <span class="price">{{ formatVND(product.price) }}</span>
        <span v-if="product.oldPrice" class="price-old">{{ formatVND(product.oldPrice) }}</span>
      </div>

      <!-- Add to Cart Button -->
      <button
        @click.stop="addToCart"
        class="btn btn-primary w-full text-xs py-2"
      >
        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
        </svg>
        Thêm vào giỏ
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { resolveAssetUrl as asset } from '@/utils/assets'
import { formatVND } from '@/utils/currency'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['add-to-cart', 'add-to-wishlist', 'quick-view'])

const primaryImage = ref(props.product.thumbnail || props.product.image)
const displayedImage = ref(primaryImage.value)

watch(() => props.product, (newProduct) => {
  primaryImage.value = newProduct.thumbnail || newProduct.image
  displayedImage.value = primaryImage.value
}, { deep: true })

const handleMouseEnter = () => {
  const secondaryImage = props.product.images?.[1]
  if (secondaryImage) {
    displayedImage.value = secondaryImage
  }
}

const handleMouseLeave = () => {
  displayedImage.value = primaryImage.value
}

const router = useRouter()

const goToProduct = () => {
  router.push(`/products/${props.product.id}`)
}

const addToCart = () => {
  emit('add-to-cart', props.product)
}

const addToWishlist = () => {
  emit('add-to-wishlist', props.product)
}

const quickView = () => {
  emit('quick-view', props.product)
}
</script>

