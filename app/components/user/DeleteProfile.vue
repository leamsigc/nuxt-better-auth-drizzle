<script lang="ts" setup>
/**
 *
 * Delete profile
 *
 * @author Reflect-Media <reflect.media GmbH>
 * @version 0.0.1
 *
 * @todo [ ] Test the component
 * @todo [ ] Integration test.
 * @todo [✔] Update the typescript.
 */
 import { signOut, useSession } from "~~/lib/auth-client";
const { data: session } = await useSession(useFetch);

const { openEditUser, openDeleteUser } = useUser();
const user = computed(() => {
  return session.value?.user
})

</script>

<template>
  <div class="space-y-8" v-if="user">
    <div class="space-y-2">
        <h3 class="text-sm font-medium">Delete user account:</h3>
        <p class="text-sm text-muted-foreground">

      <UiButton @click="openDeleteUser" variant="destructive" class="flex items-center gap-2 min-w-[200px]"> <Icon name="lucide:trash" /> Delete account</UiButton>
        </p>
      </div>
    <DeleteUser v-if="user" :userId="user.id" :username="user.name" />
  </div>
</template>
<style scoped >

</style>