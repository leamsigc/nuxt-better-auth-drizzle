<script lang="ts" setup>
/**
 *
 * Only user that are authenticated can access this page
 *
 * @author Reflect-Media <reflect.media GmbH>
 * @version 0.0.1
 *
 * @todo [ ] Test the component
 * @todo [ ] Integration test.
 * @todo [✔] Update the typescript.
 */
const { data } = useNuxtData("tenants");

</script>

<template>
  <div class="container-lg mx-auto p-4">
     <div class="grid lg:grid-cols-4 gap-4 w-full">
        <ShinyCard
          v-for="({ logo, name, description,slug }, index) in data.tenants"
          :key="name"
          :show-bg="false"
        >
          <NuxtLink :href="`/app/tenant/${slug}`" >
            <UiCard
              class="bg-muted/90 dark:bg-card hover:bg-background dark:hover:bg-background transition-all delay-75 group/number h-full flex flex-col"
            >
              <UiCardHeader>
                <div class="flex justify-between">
                  <NuxtImg class="size-8 mb-6 text-primary" :src="logo" />
                  <span
                    class="text-5xl text-muted-foreground/15 font-medium transition-all delay-75 group-hover/number:text-muted-foreground/30"
                  >
                    0{{ index + 1 }}
                  </span>
                </div>
  
                <UiCardTitle>{{ name }}</UiCardTitle>
              </UiCardHeader>
  
              <UiCardContent class="text-muted-foreground flex-1">
                {{ description }}
              </UiCardContent>
            </UiCard>
          </NuxtLink>
        </ShinyCard>
      </div>
  </div>
</template>
<style scoped></style>
