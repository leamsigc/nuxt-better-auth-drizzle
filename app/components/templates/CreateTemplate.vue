<script lang="ts" setup>
import { useToast } from "~/components/ui/toast/use-toast";

const { toast } = useToast();
const { isCreateOpen, closeCreateTemplate, createTemplate, isLoading, currentTenant } = useTemplates();

const form = ref({
  name: '',
  slug: '',
  description: '',
  content: '',
  status: 'active',
  tenantId: null as number | null
});

const formSchema = computed(() => [
  {
    $formkit: 'text',
    name: 'name',
    label: 'Template Name',
    validation: 'required|length:3,50',
    placeholder: 'Enter template name'
  },
  {
    $formkit: 'text',
    name: 'slug',
    label: 'Slug',
    validation: 'required|length:3,50',
    placeholder: 'template-slug'
  },
  {
    $formkit: 'textarea',
    name: 'description',
    label: 'Description',
    validation: 'required',
    placeholder: 'Enter template description'
  },
  {
    $formkit: 'textarea',
    name: 'content',
    label: 'Template Content',
    validation: 'required',
    placeholder: 'Enter template content'
  },
  {
    $formkit: 'select',
    name: 'status',
    label: 'Status',
    validation: 'required',
    options: [
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' }
    ]
  }
]);

const handleSubmit = async () => {
  try {
    await createTemplate(form.value);
    form.value = {
      name: '',
      slug: '',
      description: '',
      content: '',
      status: 'active',
      tenantId: null
    };
    emit('refresh');
    closeCreateTemplate();
    toast({
      title: "Success",
      description: "Template created successfully",
    });
  } catch (error: any) {
    toast({
      title: "Error",
      description: error.message || "Failed to create template",
      variant: "destructive",
    });
  }
};

const emit = defineEmits<{
  refresh: []
}>();
const contentData = ref({});
const savedContent = () => {
  console.log("Data saved");
  
}
</script>

<template>
  <UiDialog :open="isCreateOpen" @update:open="closeCreateTemplate">
    <UiDialogContent class="sm:max-w-[600px]">
      <UiDialogHeader>
        <UiDialogTitle>Create Template</UiDialogTitle>
        <UiDialogDescription>
          Add a new template to {{ currentTenant?.name || 'your organization' }}. Click save when you're done.
        </UiDialogDescription>
      </UiDialogHeader>
      <FormKit type="form" id="create-template" :actions="false" v-model="form" @submit="handleSubmit">
        <FormKitSchema :schema="formSchema" />
        <div class="my-4 bg-slate-100 px-5 min-h-28">
          <clientOnly>
            <EditorView :data="contentData" @saved="savedContent" />
          </clientOnly>
        </div>
        <div class="flex justify-end gap-3 mt-4">
          <UiButton type="button" variant="outline" @click="closeCreateTemplate">
            Cancel
          </UiButton>
          <UiButton type="submit" :loading="isLoading">
            Create Template
          </UiButton>
        </div>
      </FormKit>
    </UiDialogContent>
  </UiDialog>
</template>
