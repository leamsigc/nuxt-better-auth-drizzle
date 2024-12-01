<script lang="ts" setup>
import { useToast } from "~/components/ui/toast/use-toast";
import type { InsertTemplate } from "~~/server/utils/template";
type InternalTemplate = InsertTemplate

const { toast } = useToast();
const { isCreateOpen, closeCreateTemplate, createTemplate, isLoading, currentTenant } = useTemplates();

const form = ref<Omit<InternalTemplate, 'id'|'createdAt'|'updatedAt'>>({
  title: '',
  description: '',
  slug: '',
  tenantId: 0,
  categoryId: 0,
  features: '',
  url: '',
  sourceUrl: '',
  pricingType: 'free',
  price: null,
  tags: '',
  status: 'draft',
});

const formSchema = computed(() => [
  {
    $formkit: 'text',
    name: 'title',
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
    name: 'features',
    label: 'Features',
    validation: 'required',
    placeholder: 'Enter template features'
  },
  {
    $formkit: 'text',
    name: 'url',
    label: 'URL',
    validation: 'required|url',
    placeholder: 'Enter template URL'
  },
  {
    $formkit: 'text',
    name: 'sourceUrl',
    label: 'Source URL',
    validation: 'url',
    placeholder: 'Enter source URL'
  },
  {
    $formkit: 'select',
    name: 'pricingType',
    label: 'Pricing Type',
    validation: 'required',
    options: [
      { label: 'Free', value: 'free' },
      { label: 'Paid', value: 'paid' }
    ]
  },
  {
    $formkit: 'text',
    name: 'price',
    label: 'Price',
    validation: 'number',
    if: '$get(pricingType).value === "paid"',
    placeholder: 'Enter price'
  },
  {
    $formkit: 'text',
    name: 'tags',
    label: 'Tags',
    placeholder: 'Enter tags (comma separated)'
  },
  {
    $formkit: 'select',
    name: 'status',
    label: 'Status',
    validation: 'required',
    options: [
      { label: 'Draft', value: 'draft' },
      { label: 'Published', value: 'published' }
    ]
  }
]);

const handleSubmit = async () => {
  try {
    form.value.description = JSON.stringify(contentData.value);
    const slug = form.value.slug;
    form.value.slug = slug.replace(/[^a-zA-Z0-9-]/g, '-').toLowerCase();
    await createTemplate(form.value);
    form.value = {
      title: '',
      description: '',
      slug: '',
      tenantId: 0,
      categoryId: 0,
      features: '',
      url: '',
      sourceUrl: '',
      pricingType: 'free',
      price: null,
      tags: '',
      status: 'draft',
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
  <UiDialog :open="isCreateOpen" @update:open="closeCreateTemplate" class="py-10">
    <UiDialogContent class="sm:max-w-[700px] max-h-[600px] overflow-y-scroll">
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
