<script lang="ts" setup>
/**
 *
 * Tenants 
 *
 * @author Reflect-Media <reflect.media GmbH>
 * @version 0.0.1
 *
 * @todo [ ] Test the component
 * @todo [ ] Integration test.
 * @todo [✔] Update the typescript.
 */

interface Tenant {
  id: number
  name: string
  slug: string
  description: string | null
  logo: string | null
  theme: string | null
  status: string
  createdAt: number
  updatedAt: number
}

const tenants = ref<Tenant[]>([])
const { openCreate, openEdit, openDelete } = useTenant()

const formatDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const { data, pending, refresh } = await useFetch<Tenant[]>('/api/v1/tenant')


onMounted(() => {
  if (data.value) {
    tenants.value = data.value
  }
})
</script>

<template>
  <div class="p-6">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-semibold tracking-tight">Tenants</h1>
      <UiButton @click="openCreate">New Tenant</UiButton>
    </div>

    <div v-if="pending" class="flex items-center justify-center p-8 text-muted-foreground">
      Loading tenants...
    </div>
    
    <div v-else>
      <UiTable>
        <UiTableHeader>
          <UiTableRow>
            <UiTableHead>Name</UiTableHead>
            <UiTableHead>Slug</UiTableHead>
            <UiTableHead>Description</UiTableHead>
            <UiTableHead>Status</UiTableHead>
            <UiTableHead>Created</UiTableHead>
            <UiTableHead>Updated</UiTableHead>
            <UiTableHead class="text-right">Actions</UiTableHead>
          </UiTableRow>
        </UiTableHeader>
        <UiTableBody>
          <UiTableRow v-for="tenant in tenants" :key="tenant.id">
            <UiTableCell class="font-medium">
              <div class="flex items-center gap-2">
                <img 
                  v-if="tenant.logo" 
                  :src="tenant.logo" 
                  :alt="tenant.name"
                  class="w-6 h-6 rounded-sm object-cover"
                />
                {{ tenant.name }}
              </div>
            </UiTableCell>
            <UiTableCell>{{ tenant.slug }}</UiTableCell>
            <UiTableCell class="max-w-[200px] truncate">
              {{ tenant.description || '-' }}
            </UiTableCell>
            <UiTableCell>
              <UiBadge :variant="tenant.status === 'active' ? 'default' : 'destructive'">
                {{ tenant.status }}
              </UiBadge>
            </UiTableCell>
            <UiTableCell>{{ formatDate(tenant.createdAt) }}</UiTableCell>
            <UiTableCell>{{ formatDate(tenant.updatedAt) }}</UiTableCell>
            <UiTableCell class="text-right">
              <div class="flex items-center justify-end gap-2">
                <UiButton variant="ghost" size="sm" @click="openEdit(tenant)">
                  Edit
                </UiButton>
                <UiButton variant="ghost" size="sm" @click="openDelete(tenant)">
                  Delete
                </UiButton>
              </div>
            </UiTableCell>
          </UiTableRow>
          <UiTableRow v-if="tenants.length === 0">
            <UiTableCell colspan="7" class="text-center h-24 text-muted-foreground">
              No tenants found.
            </UiTableCell>
          </UiTableRow>
        </UiTableBody>
      </UiTable>
    </div>

    <!-- Tenant Management Dialogs -->
    <CreateTenant @refresh="refresh" />
    <EditTenant @refresh="refresh" />
    <DeleteTenant @refresh="refresh" />
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>
