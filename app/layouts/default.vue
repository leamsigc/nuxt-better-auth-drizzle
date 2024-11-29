<script lang="ts" setup>
/**
 *
 * Default layout for the application
 *
 * @author Reflect-Media <reflect.media GmbH>
 * @version 0.0.1
 *
 * @todo [ ] Test the component
 * @todo [ ] Integration test.
 * @todo [✔] Update the typescript.
 */
</script>

<template>
  <main class="">
    <UiToastProvider>
      <Navbar />
      <slot />
      <LazyTheFooter />
    </UiToastProvider>
  </main>
</template>
<style scoped></style>
