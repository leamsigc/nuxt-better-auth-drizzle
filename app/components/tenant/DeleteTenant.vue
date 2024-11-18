<script lang="ts" setup>

const { isDeleteOpen, closeDelete, deleteTenant, selectedTenant, isLoading } = useTenant()

const handleDelete = async () => {
  if (!selectedTenant.value) return
  
  try {
    await deleteTenant(selectedTenant.value.id)
    // Emit refresh event to parent
    emit('refresh')
  } catch (error) {
    console.error('Failed to delete tenant:', error)
  }
}

const emit = defineEmits<{
  refresh: []
}>()
</script>

<template>
  <UiDialog :open="isDeleteOpen" @update:open="closeDelete">
    <UiDialogContent>
      <UiDialogHeader>
        <UiDialogTitle>Delete Tenant</UiDialogTitle>
        <UiDialogDescription>
          Are you sure you want to delete this tenant? This action cannot be undone.
        </UiDialogDescription>
      </UiDialogHeader>
      <div class="py-4">
        <p class="text-sm text-muted-foreground">
          This will permanently delete <span class="font-medium text-foreground">{{ selectedTenant?.name }}</span>
          and all associated data.
        </p>
      </div>
      <UiDialogFooter>
        <UiButton type="button" variant="ghost" @click="closeDelete">
          Cancel
        </UiButton>
        <UiButton
          type="button"
          variant="destructive"
          :disabled="isLoading"
          @click="handleDelete"
        >
          {{ isLoading ? 'Deleting...' : 'Delete Tenant' }}
        </UiButton>
      </UiDialogFooter>
    </UiDialogContent>
  </UiDialog>
</template>
