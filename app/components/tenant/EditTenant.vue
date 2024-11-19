<script lang="ts" setup>

const { isEditOpen, closeEdit, updateTenant, selectedTenant, isLoading } = useTenant()
const { themes } = useThemes()

const form = ref({
  name: '',
  slug: '',
  description: '',
  status: 'active',
  theme: 'light',
  logo: ''
})

// Update form when selected tenant changes
watch(selectedTenant, (tenant) => {
  if (tenant) {
    form.value = {
      name: tenant.name,
      slug: tenant.slug,
      description: tenant.description || '',
      status: tenant.status,
      theme: tenant.theme || 'light',
      logo: tenant.logo || ''
    }
  }
})

const handleSubmit = async () => {
  if (!selectedTenant.value) return
  
  try {
    await updateTenant(selectedTenant.value.id, form.value)
    // Emit refresh event to parent
    emit('refresh')
    closeEdit()
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
          <UiLabel for="logo">Logo URL</UiLabel>
          <UiInput
            id="logo"
            v-model="form.logo"
            type="url"
            placeholder="https://example.com/logo.png"
          />
          <div v-if="form.logo" class="mt-2">
            <p class="text-sm text-muted-foreground mb-2">Preview:</p>
            <div class="w-12 h-12 rounded-sm overflow-hidden">
              <img 
                :src="form.logo" 
                :alt="form.name"
                class="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        <div class="grid gap-2">
          <UiLabel for="theme">Theme</UiLabel>
          <UiSelect v-model="form.theme">
            <UiSelectTrigger>
              <UiSelectValue placeholder="Select theme" />
            </UiSelectTrigger>
            <UiSelectContent>
              <UiSelectItem
                v-for="theme in themes"
                :key="theme.id"
                :value="theme.value"
              >
                {{ theme.name }}
              </UiSelectItem>
            </UiSelectContent>
          </UiSelect>
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
