<template>
  <div class="bg-background min-h-screen">
    <div class="container-custom py-8">
      <div class="bg-white p-6">
        <div class="flex items-center justify-between mb-4">
          <h1 class="text-2xl font-bold">Sản phẩm yêu thích</h1>
          <router-link to="/products" class="text-secondary hover:text-secondary-hover">← Tiếp tục mua sắm</router-link>
        </div>

        <div v-if="loading" class="text-center text-text-muted py-10">Đang tải...</div>
        <div v-else-if="items.length === 0" class="text-center text-text-muted py-10">Danh sách yêu thích trống.</div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="p in items" :key="p.id" class="border border-border p-4 flex flex-col">
            <router-link :to="`/products/${p.id}`" class="block">
              <img :src="asset(p.thumbnail || p.image)" :alt="p.name" class="w-full aspect-square object-contain mb-3" />
              <h3 class="font-semibold line-clamp-2 min-h-[48px]">{{ p.name }}</h3>
            </router-link>
            <div class="mt-auto flex items-center justify-between pt-3">
              <div class="font-bold text-primary">{{ formatVND(p.price) }}</div>
              <button @click="remove(p.id)" class="text-red-600 hover:underline">Xóa</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useWishlistStore } from '@/stores/wishlistStore'
import { resolveAssetUrl as asset } from '@/utils/assets'
import { formatVND } from '@/utils/currency'

const store = useWishlistStore()
const loading = computed(() => store.loading)
const items = computed(() => store.items)

onMounted(() => {
  store.fetch()
})

const remove = async (id) => {
  await store.remove(id)
}
</script>

