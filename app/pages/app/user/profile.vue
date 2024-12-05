<script lang="ts" setup>
/**
 *
 * User profile 
 *
 * @author Reflect-Media <reflect.media GmbH>
 * @version 0.0.1
 *
 * @todo [ ] Test the component
 * @todo [ ] Integration test.
 * @todo [✔] Update the typescript.
 */

const activeSection = ref<keyof typeof activeComponent>('profile')

// load component dinamically
const profileComponent = defineAsyncComponent(() => import('~/components/user/Profile.vue'))
const templatesComponent = defineAsyncComponent(() => import('~/components/user/Profile.vue'))
const deleteComponent = defineAsyncComponent(() => import('~/components/user/DeleteProfile.vue'))

const activeComponent = {
  profile: profileComponent,
  templates: templatesComponent,
  danger: deleteComponent
}
const navOptions: { label: string, value: keyof typeof activeComponent, icon: string }[] = [
  {
    label: 'Profile',
    value: 'profile',
    icon: 'heroicons:user-circle'
  },
  {
    label: 'Templates',
    value: 'templates',
    icon: 'lucide:layout-dashboard'
  },
  {
    label: 'Danger Zone',
    value: 'danger',
    icon: 'lucide:triangle-alert'
  }
]
</script>

<template>
  <main class="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
    <div class="mx-auto grid w-full  items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
      <nav class="grid gap-4 text-sm text-muted-foreground">
        <UiButton variant="ghost" class="w-full justify-start" v-for="{ label, value, icon } in navOptions"
          @click="activeSection = value">
          <Icon :name="icon" class="size-5" />
          {{ label }}
        </UiButton>
      </nav>
      <div class="grid gap-6">
        <!-- Main Content -->
        <div class="flex-1">
          <component :is="activeComponent[activeSection]" />
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.bg-background {
  background-color: var(--background);
}
</style>