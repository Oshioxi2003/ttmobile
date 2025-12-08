<template>
  <div class="bg-background min-h-screen">
    <div class="bg-white border-b border-border">
      <div class="container-custom py-3">
        <nav class="flex items-center text-sm">
          <router-link to="/" class="text-secondary hover:text-secondary-hover">Trang chủ</router-link>
          <span class="mx-2 text-text-muted">/</span>
          <span class="text-text">{{ page?.title || 'Trang' }}</span>
        </nav>
      </div>
    </div>

    <div class="container-custom py-8" v-if="loaded">
      <div class="bg-white p-6">
        <h1 class="text-2xl font-bold text-primary mb-4">{{ page?.title }}</h1>
        <div v-if="page?.content" v-html="renderHtml(page.content)"></div>
        <div v-else class="text-text-muted">Chưa có nội dung.</div>
      </div>
    </div>

    <div v-else class="container-custom py-12 text-center">
      <div class="inline-block animate-spin">
        <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/services/api'

const route = useRoute()
const page = ref(null)
const loaded = ref(false)

const fetchPage = async () => {
  loaded.value = false
  try {
    const slug = route.params.slug
    const res = await api.get(`/pages/slug/${slug}`)
    page.value = res.data?.data || null
  } catch (e) {
    page.value = null
  } finally {
    loaded.value = true
  }
}

// Very light renderer for EditorJS-like content or raw HTML string
const renderHtml = (content) => {
  if (typeof content === 'string') return content
  try {
    const blocks = content?.blocks || []
    return blocks
      .map((b) => {
        if (b.type === 'header') {
          const lvl = Math.min(Math.max(b.data?.level || 2, 1), 6)
          return `<h${lvl} class='text-xl font-semibold my-4'>${b.data?.text || ''}</h${lvl}>`
        }
        if (b.type === 'paragraph') {
          return `<p class='my-2 leading-relaxed'>${b.data?.text || ''}</p>`
        }
        return ''
      })
      .join('')
  } catch {
    return ''
  }
}

onMounted(fetchPage)
watch(() => route.params.slug, fetchPage)
</script>

