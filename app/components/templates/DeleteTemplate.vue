<script lang="ts" setup>
import { useToast } from "~/components/ui/toast/use-toast";

const props = defineProps<{
  id: number;
  title: string;
}>();

const { toast } = useToast();
const { isDeleteOpen, closeDeleteTemplate, deleteTemplate, isLoading, currentTenant } = useTemplates();

const handleDelete = async () => {
  try {
    await deleteTemplate(props.id);
    emit('refresh');
    closeDeleteTemplate();
    toast({
      title: "Success",
      description: "Template deleted successfully",
    });
  } catch (error: any) {
    toast({
      title: "Error",
      description: error.message || "Failed to delete template",
      variant: "destructive",
    });
  }
};

const emit = defineEmits<{
  refresh: []
}>();
</script>

<template>
  <UiDialog :open="isDeleteOpen" @update:open="closeDeleteTemplate">
    <UiDialogContent>
      <UiDialogHeader>
        <UiDialogTitle>Delete Template</UiDialogTitle>
        <UiDialogDescription>
          Are you sure you want to delete the template "{{ title }}" from
          {{ currentTenant?.name || 'your organization' }}
          ? This action cannot be undone.
        </UiDialogDescription>
      </UiDialogHeader>
      <div class="flex justify-end gap-3 mt-4">
        <UiButton type="button" variant="outline" @click="closeDeleteTemplate">
          Cancel
        </UiButton>
        <UiButton type="button" variant="destructive" :loading="isLoading" @click="handleDelete">
          Delete Template
        </UiButton>
      </div>
    </UiDialogContent>
  </UiDialog>
</template>
