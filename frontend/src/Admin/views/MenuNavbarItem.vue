<template>
  <div class="bg-gray-50" :style="{ paddingLeft: `${(level + 1) * 3}rem` }">
    <draggable
      :model-value="item.children"
      @update:model-value="updateChildren"
      item-key="_key"
      handle=".drag-handle"
      ghost-class="opacity-50"
      class="divide-y divide-gray-200"
    >
      <template #item="{ element: child, index: childIdx }">
        <div class="group hover:bg-gray-100 transition-colors">
          <div class="flex items-center justify-between px-4 py-3">
            <div class="flex items-center gap-3 flex-1">
              <span class="drag-handle cursor-move text-gray-400 hover:text-gray-600">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16"/>
                </svg>
              </span>
              <button
                v-if="child.children && child.children.length > 0"
                @click="$emit('toggle', [...parentPath, childIdx])"
                class="text-gray-400 hover:text-gray-600"
              >
                <svg
                  class="w-4 h-4 transition-transform"
                  :class="{ 'rotate-90': isExpanded([...parentPath, childIdx]) }"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </button>
              <span v-else class="w-4"></span>
              <span class="text-gray-700">{{ child.label || 'Chưa có tên' }}</span>
            </div>
            <div class="flex items-center gap-2">
              <button
                @click="$emit('edit', [...parentPath, childIdx])"
                class="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                title="Sửa"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
              </button>
              <button
                @click="$emit('remove', [...parentPath, childIdx])"
                class="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                title="Xóa"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>
            </div>
          </div>
          
          <!-- Recursive children -->
          <MenuNavbarItem
            v-if="child.children && child.children.length > 0 && isExpanded([...parentPath, childIdx])"
            :item="child"
            :parent-path="[...parentPath, childIdx]"
            :level="level + 1"
            @edit="$emit('edit', $event)"
            @remove="$emit('remove', $event)"
            @toggle="$emit('toggle', $event)"
          />
        </div>
      </template>
    </draggable>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import draggable from 'vuedraggable'
import MenuNavbarItem from './MenuNavbarItem.vue'

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  parentPath: {
    type: Array,
    required: true
  },
  level: {
    type: Number,
    default: 0
  },
  expandedItems: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['edit', 'remove', 'toggle'])

const isExpanded = (path) => {
  const key = path.join('-')
  return props.expandedItems[key] || false
}

const updateChildren = (newChildren) => {
  props.item.children = newChildren
}
</script>

