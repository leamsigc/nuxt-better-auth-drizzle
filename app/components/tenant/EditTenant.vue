<script lang="ts" setup>

const { isEditOpen, closeEdit, updateTenant, selectedTenant, isLoading } = useTenant()

const form = ref({
  name: '',
  slug: '',
  description: '',
  status: 'active'
})

// Update form when selected tenant changes
watch(selectedTenant, (tenant) => {
  if (tenant) {
    form.value = {
      name: tenant.name,
      slug: tenant.slug,
      description: tenant.description || '',
      status: tenant.status
    }
  }
})

const handleSubmit = async () => {
  if (!selectedTenant.value) return
  
  try {
    await updateTenant(selectedTenant.value.id, form.value)
    // Emit refresh event to parent
    emit('refresh')
  } catch (error) {
    console.error('Failed to update tenant:', error)
  }
}

const emit = defineEmits<{
  refresh: []
}>()
</script>

<template>
  <UiDialog :open="isEditOpen" @update:open="closeEdit">
    <UiDialogContent class="sm:max-w-[425px]">
      <UiDialogHeader>
        <UiDialogTitle>Edit Tenant</UiDialogTitle>
        <UiDialogDescription>
          Make changes to the tenant. Click save when you're done.
        </UiDialogDescription>
      </UiDialogHeader>
      <form @submit.prevent="handleSubmit" class="grid gap-4 py-4">
        <div class="grid gap-2">
          <UiLabel for="name">Name</UiLabel>
          <UiInput
            id="name"
            v-model="form.name"
            placeholder="Enter tenant name"
            required
          />
        </div>
        <div class="grid gap-2">
          <UiLabel for="slug">Slug</UiLabel>
          <UiInput
            id="slug"
            v-model="form.slug"
            placeholder="tenant-slug"
            required
          />
        </div>
        <div class="grid gap-2">
          <UiLabel for="description">Description</UiLabel>
          <UiTextarea
            id="description"
            v-model="form.description"
            placeholder="Enter tenant description"
          />
        </div>
        <div class="grid gap-2">
          <UiLabel for="status">Status</UiLabel>
          <UiSelect v-model="form.status">
            <UiSelectTrigger>
              <UiSelectValue placeholder="Select status" />
            </UiSelectTrigger>
            <UiSelectContent>
              <UiSelectItem value="active">Active</UiSelectItem>
              <UiSelectItem value="inactive">Inactive</UiSelectItem>
            </UiSelectContent>
          </UiSelect>
        </div>
        <UiDialogFooter>
          <UiButton type="button" variant="ghost" @click="closeEdit">
            Cancel
          </UiButton>
          <UiButton type="submit" :disabled="isLoading">
            {{ isLoading ? 'Saving...' : 'Save Changes' }}
          </UiButton>
        </UiDialogFooter>
      </form>
    </UiDialogContent>
  </UiDialog>
</template>
