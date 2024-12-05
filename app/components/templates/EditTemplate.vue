<script lang="ts" setup>
import { useToast } from "~/components/ui/toast/use-toast";
import type { Template } from "~~/server/utils/template";
type InternalTemplate = Template;
const props = defineProps<{
  template: InternalTemplate;
}>();

const { toast } = useToast();
const { isEditOpen, closeEditTemplate, updateTemplate, isLoading, currentTenant } = useTemplates();

const form = ref<InternalTemplate>({
  id: props.template.id,
  slug: props.template.slug,
  description: props.template.description,
  status: props.template.status,
  tenantId: props.template.tenantId,
  categoryId: props.template.categoryId,
  features: props.template.features,
  title: props.template.title,
  tags: props.template.tags,
  sourceUrl: props.template.sourceUrl,
  url: props.template.url,
  price: props.template.price,
  pricingType: props.template.pricingType,
  updatedAt: props.template.updatedAt,
  createdAt: props.template.createdAt

});

const formSchema = computed(() => [

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
    $formkit: 'select',
    name: 'status',
    label: 'Status',
    validation: 'required',
    options: [
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' }
    ]
  },
  {
    $formkit: 'select',
    name: 'categoryId',
    label: 'Category',
    validation: 'required',
    options: [
      { label: 'Web', value: 'web' },
      { label: 'Mobile', value: 'mobile' },
      { label: 'Desktop', value: 'desktop' },
      { label: 'Other', value: 'other' }
    ]
  },
  {
    $formkit: 'text',
    name: 'title',
    label: 'Title',
    validation: 'required|length:3,50',
    placeholder: 'Enter template title'
  },
  {
    $formkit: 'text',
    name: 'tags',
    label: 'Tags',
    validation: 'required|length:3,50',
    placeholder: 'Enter template tags'
  },
  {
    $formkit: 'text',
    name: 'sourceUrl',
    label: 'Source URL',
    validation: 'required|length:3,50',
    placeholder: 'Enter template source URL'
  },
  {
    $formkit: 'text',
    name: 'url',
    label: 'URL',
    validation: 'required|length:3,50',
    placeholder: 'Enter template URL'
  },
  {
    $formkit: 'text',
    name: 'price',
    label: 'Price',
    validation: 'required|length:3,50',
    placeholder: 'Enter template price'
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
    name: 'features',
    label: 'Features',
    validation: 'required|length:3,50',
    placeholder: 'Enter template features'
  }
]);

const handleSubmit = async () => {
  try {
    await updateTemplate(form.value);
    emit('refresh');
    closeEditTemplate();
    toast({
      title: "Success",
      description: "Template updated successfully",
    });
  } catch (error: any) {
    toast({
      title: "Error",
      description: error.message || "Failed to update template",
      variant: "destructive",
    });
  }
};

const emit = defineEmits<{
  refresh: []
}>();
</script>

<template>
  <UiDialog :open="isEditOpen" @update:open="closeEditTemplate">
    <UiDialogContent class="sm:max-w-[600px]">
      <UiDialogHeader>
        <UiDialogTitle>Edit Template</UiDialogTitle>
        <UiDialogDescription>
          Update template information for {{ currentTenant?.name || 'your organization' }}. Click save when you're done.
        </UiDialogDescription>
      </UiDialogHeader>
      <FormKit type="form" id="edit-template" :actions="false" v-model="form" @submit="handleSubmit">
        <FormKitSchema :schema="formSchema" />
        <div class="flex justify-end gap-3 mt-4">
          <UiButton type="button" variant="outline" @click="closeEditTemplate">
            Cancel
          </UiButton>
          <UiButton type="submit" :loading="isLoading">
            Update Template
          </UiButton>
        </div>
      </FormKit>
    </UiDialogContent>
  </UiDialog>
</template>
