<script lang="ts" setup>
/**
 *
 * Component Description:Desc
 *
 * @author Reflect-Media <reflect.media GmbH>
 * @version 0.0.1
 *
 * @todo [ ] Test the component
 * @todo [ ] Integration test.
 * @todo [✔] Update the typescript.
 */
interface TenantProps {
    id: number;
    name: string;
    slug?: string;
    description?: string;
    theme?: string;
    logo?: string | null;
    status?: string;
}
const { openCreateTemplate } = useTemplates();
const props = withDefaults(
    defineProps<TenantProps>(),
    {
        id: 0,
        name: '',
        slug: '',
        description: '',
        theme: 'light',
        logo: '',
        status: 'active'
    }
);
const OpenCreateTemplateModal = () => {
    openCreateTemplate()
}
</script>


<template>
    <div>
        <slot name="image">
            <NuxtImg v-if="props.logo" :src="props.logo" class="h-[180px] w-full object-cover md:h-[250px]" />
        </slot>
        <section class="container-fluid mx-auto p-4 md:px-8 md:py-6">
            <div class="hidden md:block">
                <slot name="crumbs">
                    <UiBreadcrumb>
                        <UiBreadcrumbList>
                            <UiBreadcrumbItem class="hidden md:block">
                                <UiBreadcrumbLink as-child>
                                    <NuxtLink to="/app/">
                                        Home
                                    </NuxtLink>
                                </UiBreadcrumbLink>
                            </UiBreadcrumbItem>
                            <UiBreadcrumbSeparator class="hidden md:block" />
                            <UiBreadcrumbItem>
                                <UiBreadcrumbLink as-child>
                                    <NuxtLink to="/app/tenants">
                                        Tenants
                                    </NuxtLink>
                                </UiBreadcrumbLink>
                            </UiBreadcrumbItem>
                            <UiBreadcrumbSeparator class="hidden md:block" />
                            <UiBreadcrumbItem>
                                <UiBreadcrumbPage>Tenants</UiBreadcrumbPage>
                            </UiBreadcrumbItem>
                        </UiBreadcrumbList>
                    </UiBreadcrumb>
                </slot>
            </div>
            <slot name="back-link">
                <NuxtLink class="mb-5 flex items-center gap-3 text-sm underline-offset-2 hover:underline md:hidden"
                    to="/app/">
                    <Icon name="lucide:arrow-left" class="size-4" />
                    Back
                </NuxtLink>
            </slot>
            <div class="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div class="flex items-center gap-5">
                    <slot name="avatar">
                        <UiAvatar v-if="props.logo">
                            <UiAvatarImage :src="props.logo" :alt="props.name" />
                            <UiAvatarFallback>{{ props.name.slice(0, 1) }}</UiAvatarFallback>
                        </UiAvatar>
                    </slot>
                    <div>
                        <slot name="title">
                            <h1 v-if="props.name" class="text-2xl font-bold lg:text-3xl" v-html="props.name" />
                        </slot>
                        <slot name="description">
                            <p v-if="props.description" class="text-muted-foreground" v-html="props.description" />
                        </slot>
                    </div>
                </div>

                <div class="flex flex-wrap items-center gap-3">
                    <slot>
                        <UiButton size="sm" variant="outline">View as public</UiButton>
                        <UiButton size="sm" @click="OpenCreateTemplateModal">Add new template</UiButton>
                    </slot>
                </div>
            </div>
            <UiSeparator class="my-8" />
        </section>
    </div>
</template>
