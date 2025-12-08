<template>
  <div>
    <div ref="holder" class="border border-gray-200 rounded-2xl p-3 bg-white"></div>
    <div v-if="error" class="text-red-600 text-sm mt-2">{{ error }}</div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, watch, nextTick } from 'vue'

const props = defineProps({
  modelValue: { type: Object, default: () => ({ time: Date.now(), blocks: [], version: '2.28.2' }) },
  placeholder: { type: String, default: 'Nhập nội dung...' }
})
const emit = defineEmits(['update:modelValue'])

const holder = ref(null)
let editor = null
const error = ref('')
const isEmitting = ref(false)

const initEditor = async () => {
  try {
    const EditorJS = (await import('@editorjs/editorjs')).default
    const Header = (await import('@editorjs/header')).default
    const List = (await import('@editorjs/list')).default
    const Paragraph = (await import('@editorjs/paragraph')).default

    editor = new EditorJS({
      holder: holder.value,
      placeholder: props.placeholder,
      data: props.modelValue || {},
      tools: {
        header: Header,
        list: List,
        paragraph: Paragraph
      },
      autofocus: false,
      onChange: async () => {
        try {
          const data = await editor.save()
          isEmitting.value = true
          emit('update:modelValue', data)
          await nextTick()
          isEmitting.value = false
        } catch (e) {
          // ignore save errors while typing
        }
      }
    })
  } catch (e) {
    error.value = 'Không thể khởi tạo Editor. Vui lòng kiểm tra gói @editorjs đã được cài đặt.'
    console.error(e)
  }
}

onMounted(initEditor)

onBeforeUnmount(async () => {
  if (editor && editor.destroy) {
    editor.destroy()
    editor = null
  }
})

// If external modelValue changes, update editor content
watch(() => props.modelValue, async (val) => {
  if (!editor || !val) return
  if (isEmitting.value) return // bỏ qua các thay đổi phát sinh từ chính editor
  try {
    await editor.isReady
    await editor.render(val)
  } catch {}
})
</script>

