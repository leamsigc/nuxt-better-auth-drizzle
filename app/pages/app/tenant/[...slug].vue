<script lang="ts" setup>
/**
 *
 * Render the content from nuxt content folder
 *
 * @author Reflect-Media <reflect.media GmbH>
 * @version 0.0.1
 *
 * @todo [ ] Test the component
 * @todo [ ] Integration test.
 * @todo [✔] Update the typescript.
 */

const route = useRoute();
const slug = Array.isArray(route.params.slug)
  ? route.params.slug[0]
  : route.params.slug;

// Fetch tenant details
const { data } = await useAsyncData<{ tenant: Tenant, templates: Template[] }>(`tenant-${slug}`, () =>
  $fetch(`/api/v1/tenant/${slug}?slug=${slug}`)
);

// Handle loading and error states
const isLoading = ref(false);

const tenant = computed(() => {
  if (data.value?.tenant) {
    return data.value.tenant as {
      id: number;
      name: string;
      slug?: string;
      description?: string;
      theme?: string;
      logo?: string | null;
      status?: string;
    };
  } else {
    return null;
  }
});

const templates = computed(() => {
  if (data.value) {
    return data.value?.templates;
  } else {
    return null;
  }
});
</script>

<template>
  <div>
    <!-- Loading State -->
    <div v-if="isLoading" class="animate-pulse">
      <div class="h-48 bg-muted/50" />
    </div>

    <!-- Error State -->
    <div v-else-if="!tenant" class="py-20">
      <div class="container">
        <h1 class="text-2xl font-bold">Tenant not found</h1>
        <p class="text-muted-foreground">The tenant you're looking for doesn't exist.</p>
      </div>
    </div>

    <!-- Tenant Details -->
    <div v-else class="relative">
      <!-- Header Section -->
      <SingleTenantHero v-if="tenant" v-bind="tenant" />


      <!-- Content Section -->
      <div class="container py-8">
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <!-- Add content sections here (e.g., recent activity, settings, etc.) -->
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
