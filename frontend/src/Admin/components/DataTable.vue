<template>
  <div class="overflow-x-auto">
    <table class="w-full">
      <thead>
        <tr class="border-b">
          <th 
            v-for="column in columns" 
            :key="column.key"
            class="text-left py-3 px-4"
          >
            {{ column.label }}
          </th>
          <th v-if="$slots.actions" class="text-left py-3 px-4">Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr 
          v-for="(item, index) in data" 
          :key="item.id || index"
          class="border-b hover:bg-gray-50"
        >
          <td 
            v-for="column in columns" 
            :key="column.key"
            class="py-3 px-4"
          >
            <slot :name="column.key" :item="item" :value="item[column.key]">
              {{ item[column.key] }}
            </slot>
          </td>
          <td v-if="$slots.actions" class="py-3 px-4">
            <slot name="actions" :item="item"></slot>
          </td>
        </tr>
        <tr v-if="data.length === 0">
          <td :colspan="columns.length + ($slots.actions ? 1 : 0)" class="py-8 text-center text-gray-500">
            Không có dữ liệu
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  columns: {
    type: Array,
    required: true
  },
  data: {
    type: Array,
    default: () => []
  }
})
</script>

