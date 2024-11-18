<script lang="ts" setup>

const { isCreateOpen, closeCreate, createTenant, isLoading } = useTenant()

const form = ref({
  name: '',
  slug: '',
  description: '',
  status: 'active'
})

const handleSubmit = async () => {
  try {
    await createTenant(form.value)
    // Emit refresh event to parent
    emit('refresh')
  } catch (error) {
    console.error('Failed to create tenant:', error)
  }
}

const emit = defineEmits<{
  refresh: []
}>()
</script>

<template>
  <UiDialog :open="isCreateOpen" @update:open="closeCreate">
    <UiDialogContent class="sm:max-w-[425px]">
      <UiDialogHeader>
        <UiDialogTitle>Create Tenant</UiDialogTitle>
        <UiDialogDescription>
          Add a new tenant to your organization. Click save when you're done.
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
          <UiButton type="button" variant="ghost" @click="closeCreate">
            Cancel
          </UiButton>
          <UiButton type="submit" :disabled="isLoading">
            {{ isLoading ? 'Creating...' : 'Create Tenant' }}
          </UiButton>
        </UiDialogFooter>
      </form>
    </UiDialogContent>
  </UiDialog>
</template>
