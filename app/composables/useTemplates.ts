import { inject } from 'vue';
const isCreateOpen = ref(false);
const isEditOpen = ref(false);
const isDeleteOpen = ref(false);
const isLoading = ref(false);

export const useTemplates = () => {
  const activeTenantName = inject('ACTIVE_TENANT_NAME');
  const { data: tenantData } = useNuxtData(activeTenantName as string);
  const currentTenant = computed(() => {
    if (!tenantData.value?.tenant) return null;
    return tenantData.value.tenant;
  });

  const closeOtherModals = () => {
    isCreateOpen.value = false;
    isEditOpen.value = false;
    isDeleteOpen.value = false;
  };

  const openCreateTemplate = () => {
    closeOtherModals();
    isCreateOpen.value = true;

  };

  const closeCreateTemplate = () => {
    isCreateOpen.value = false;
  };

  const openEditTemplate = () => {
    closeOtherModals();
    isEditOpen.value = true;
  };

  const closeEditTemplate = () => {
    isEditOpen.value = false;
  };

  const openDeleteTemplate = () => {
    closeOtherModals();
    isDeleteOpen.value = true;
  };

  const closeDeleteTemplate = () => {
    isDeleteOpen.value = false;
  };

  const createTemplate = async (template: any) => {
    if (!currentTenant.value?.id) {
      throw new Error('No active tenant selected');
    }

    isLoading.value = true;
    try {
      const response = await $fetch('/api/v1/templates', {
        method: 'POST',
        body: {
          ...template,
          tenantId: currentTenant.value.id
        },
      });
      return response;
    } finally {
      isLoading.value = false;
    }
  };

  const updateTemplate = async (template: any) => {
    if (!currentTenant.value?.id) {
      throw new Error('No active tenant selected');
    }

    isLoading.value = true;
    try {
      const response = await $fetch(`/api/v1/templates/${template.id}`, {
        method: 'PUT',
        body: {
          ...template,
          tenantId: currentTenant.value.id
        },
      });
      return response;
    } finally {
      isLoading.value = false;
    }
  };

  const deleteTemplate = async (id: number) => {
    isLoading.value = true;
    try {
      const response = await $fetch(`/api/v1/templates/${id}`, {
        method: 'DELETE',
      });
      return response;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    // State
    isCreateOpen,
    isEditOpen,
    isDeleteOpen,
    isLoading,
    currentTenant,

    // Methods
    openCreateTemplate,
    closeCreateTemplate,
    openEditTemplate,
    closeEditTemplate,
    openDeleteTemplate,
    closeDeleteTemplate,
    createTemplate,
    updateTemplate,
    deleteTemplate,
  };
};
