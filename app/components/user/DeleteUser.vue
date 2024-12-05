<script lang="ts" setup>
import { useToast } from "~/components/ui/toast/use-toast";
import { deleteUser } from "~~/lib/auth-client";

const props = defineProps<{
  userId: string;
  username: string;
}>();

const { toast } = useToast();
const  { isDeleteOpen, isLoading, closeDeleteUser } = useUser();

const handleDelete = async () => {
  try {
    isLoading.value = true;
    await deleteUser({ password: "123", fetchOptions: { method: "DELETE" } });
    toast({
      title: "Success",
      description: "User deleted successfully",
    });
    // Navigate to the login page
    navigateTo("/login");
  } catch (error: any) {
    toast({
      title: "Error",
      description: error.message || "Failed to delete user",
      variant: "destructive",
    });
  } finally {
    isLoading.value = false;
  }
};

const emit = defineEmits<{
  refresh: []
}>();
</script>

<template>
  <UiDialog :open="isDeleteOpen" @update:open="closeDeleteUser">
    <UiDialogContent>
      <UiDialogHeader>
        <UiDialogTitle>Delete User</UiDialogTitle>
        <UiDialogDescription>
          Are you sure you want to delete the user "{{ username }}"?
          This action cannot be undone.
        </UiDialogDescription>
      </UiDialogHeader>
      <div class="flex justify-end gap-3 mt-4">
        <UiButton type="button" variant="outline" @click="closeDeleteUser">
          Cancel
        </UiButton>
        <UiButton type="button" variant="destructive" :loading="isLoading" @click="handleDelete">
          Delete User
        </UiButton>
      </div>
    </UiDialogContent>
  </UiDialog>
</template>
