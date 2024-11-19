<script setup lang="ts">
/**
 *
 * Layout for user that are authentificated only
 *
 * @author Reflect-Media <reflect.media GmbH>
 * @version 0.0.1
 *
 * @todo [ ] Test the component
 * @todo [ ] Integration test.
 * @todo [✔] Update the typescript.
 */
const { openCreate } = useTenant();
const $emit = defineEmits(["refresh"]);

</script>


<template>
  <div class="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
    <h2 class="text-2xl font-bold">Create Your First Tenant</h2>
    <p class="text-muted-foreground text-center max-w-md">
      Get started by creating your first tenant to manage your authentication resources
    </p>
    <UiButton size="lg" @click="openCreate">
      <Icon name="lucide:plus"  class=" size-4" />
      Create New Tenant
    </UiButton>
    <CreateTenant @refresh="$emit('refresh')" />
  </div>
</template>

