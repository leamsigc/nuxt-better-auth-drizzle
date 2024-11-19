import { ref } from 'vue'
import { useFetch } from '#app'

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

interface TenantFormData {
  name: string
  slug: string
  description?: string
  logo?: string
  theme?: string
  status: string
}

const isCreateOpen = ref(false)
const isEditOpen = ref(false)
const isDeleteOpen = ref(false)
const selectedTenant = ref<Tenant | null>(null)
const isLoading = ref(false)

export function useTenant() {

  const openCreate = () => {

    // All other modals should be closed
    isEditOpen.value = false
    isDeleteOpen.value = false
    selectedTenant.value = null
    isCreateOpen.value = true


  }

  const closeCreate = () => {
    isCreateOpen.value = false
  }

  const openEdit = (tenant: Tenant) => {
    selectedTenant.value = tenant
    isEditOpen.value = true
  }

  const closeEdit = () => {
    selectedTenant.value = null
    isEditOpen.value = false
  }

  const openDelete = (tenant: Tenant) => {
    selectedTenant.value = tenant
    isDeleteOpen.value = true
  }

  const closeDelete = () => {
    selectedTenant.value = null
    isDeleteOpen.value = false
  }

  const createTenant = async (data: TenantFormData) => {
    isLoading.value = true
    try {
      const { data: newTenant, error } = await useFetch('/api/v1/tenant', {
        method: 'POST',
        body: data
      })

      if (error.value) throw error.value
      return newTenant.value
    } catch (error) {
      console.error('Error creating tenant:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const updateTenant = async (id: number, data: Partial<TenantFormData>) => {
    isLoading.value = true
    try {
      const { data: updatedTenant, error } = await useFetch(`/api/v1/tenant/${id}`, {
        method: 'PATCH',
        body: data
      })

      if (error.value) throw error.value
      return updatedTenant.value
    } catch (error) {
      console.error('Error updating tenant:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const deleteTenant = async (id: number) => {
    isLoading.value = true
    try {
      const { error } = await useFetch(`/api/v1/tenant/${id}`, {
        method: 'DELETE'
      })

      if (error.value) throw error.value
      closeDelete()
      return true
    } catch (error) {
      console.error('Error deleting tenant:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  return {
    isCreateOpen,
    isEditOpen,
    isDeleteOpen,
    selectedTenant,
    isLoading,
    openCreate,
    closeCreate,
    openEdit,
    closeEdit,
    openDelete,
    closeDelete,
    createTenant,
    updateTenant,
    deleteTenant,
  }
}

