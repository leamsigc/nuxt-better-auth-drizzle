<script lang="ts" setup>
/**
 *
 * The user details View
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
  <div class="max-w-3xl">
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-2xl font-bold">Profile details</h1>
      <UiButton variant="outline">Update profile</UiButton>

      <UiButton @click="signOut">Sign out</UiButton>
      <UiButton @click="openEditUser">Edit</UiButton>
    </div>

    <!-- Profile Section -->
    <div class="space-y-8" v-if="user">
      <!-- Profile Info -->
      <div class="flex items-center gap-4">
        <UiAvatar class="h-8 w-8 rounded-lg">
          <UiAvatarImage :src="user.image || ''" :alt="user.name" />
          <UiAvatarFallback class="rounded-lg"> {{ user.name.slice(0, 1) }} </UiAvatarFallback>
        </UiAvatar>
        <div>
          <h2 class="text-xl font-semibold">{{ user.name }}</h2>
        </div>
      </div>

      <!-- Username -->
      <div class="space-y-2">
        <h3 class="text-sm font-medium">Username</h3>
        <p class="text-sm text-muted-foreground">{{ user.firstName }} {{ user.lastName }}</p>
      </div>

      <!-- Email Addresses -->
      <div class="space-y-2">
        <h3 class="text-sm font-medium">Email addresses</h3>
        <div class="flex items-center gap-2">
          <p class="text-sm text-muted-foreground">{{ user.email }}</p>
          <UiBadge variant="secondary" size="sm">Primary</UiBadge>
        </div>
        <UiButton variant="outline" size="sm" class="mt-2">
          Add email address
        </UiButton>
      </div>

      <!-- Connected Accounts -->
      <div class="space-y-2">
        <h3 class="text-sm font-medium">Connected accounts</h3>
        <div class="flex items-center gap-2">
          <UiIcon name="github" class="w-5 h-5" />
          <p class="text-sm text-muted-foreground">{{ user.emailVerified }}</p>
        </div>
        <UiButton variant="outline" size="sm" class="mt-2">
          Connect account
        </UiButton>
      </div>
    </div>
    <EditProfile />
    <DeleteUser v-if="user" :userId="user.id" :username="user.name" />
  </div>
</template>
<style scoped></style>