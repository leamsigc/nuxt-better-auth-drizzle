<script setup lang="ts">
import type { Column } from '@tanstack/vue-table'
import { cn } from '@@/lib/utils'


interface DataTableColumnHeaderProps {
  column: Column<any>
  title: string
}

defineProps<DataTableColumnHeaderProps>()
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <div v-if="column.getCanSort()" :class="cn('flex items-center space-x-2', $attrs.class ?? '')">
    <UiDropdownMenu>
      <UiDropdownMenuTrigger as-child>
        <UiButton variant="ghost" size="sm" class="-ml-3 h-8 data-[state=open]:bg-accent">
          <span>{{ title }}</span>
          <Icon name="lucide:arrow-down" v-if="column.getIsSorted() === 'desc'" class="ml-2 h-4 w-4" />
          <Icon name="lucide:arrow-up" v-else-if="column.getIsSorted() === 'asc'" class="ml-2 h-4 w-4" />
          <Icon name="lucide:arrow-down-up" v-else class="ml-2 h-4 w-4" />
        </UiButton>
      </UiDropdownMenuTrigger>
      <UiDropdownMenuContent align="start">
        <UiDropdownMenuItem @click="column.toggleSorting(false)">
          <Icon name="lucide:arrow-up" class="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Asc
        </UiDropdownMenuItem>
        <UiDropdownMenuItem @click="column.toggleSorting(true, true)">
          <Icon name="lucide:arrow-down" class="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Desc
        </UiDropdownMenuItem>
        <UiDropdownMenuSeparator />
        <UiDropdownMenuItem @click="column.toggleVisibility(false)">
          <Icon name="lucide:eye-off" class="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Hide
        </UiDropdownMenuItem>
      </UiDropdownMenuContent>
    </UiDropdownMenu>
  </div>

  <div v-else :class="$attrs.class">
    {{ title }}
  </div>
</template>
