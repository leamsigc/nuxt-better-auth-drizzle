<script lang="ts" setup>
import { useToast } from "~/components/ui/toast/use-toast";
import { signUp, signIn } from "~~/lib/auth-client";
/**
 *
 * Register view
 *
 * @author Reflect-Media <reflect.media GmbH>
 * @version 0.0.1
 *
 * @todo [ ] Test the component
 * @todo [ ] Integration test.
 * @todo [✔] Update the typescript.
 */

const userInformation = ref({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  password_confirm: "",
});

const selectedRegisterMethod = ref<'none' | 'email' | 'google'>('none');

const registerForm = computed(() => [
  {
    $cmp: "FormKit",
    props: {
      type: "text",
      name: "firstName",
      label: "First name",
      validation: "required",
    },
  },
  {
    $formkit: "text",
    name: "lastName",
    label: "Last name",
    validation: "required|length:3,30",
  },
  {
    $formkit: "text",
    name: "email",
    label: "Email",
    validation: "required|email",
  },
  {
    $formkit: "password",
    name: "password",
    label: "Password",
    validation: "required|length:5,16",
  },
  {
    $formkit: "password",
    name: "password_confirm",
    label: "Confirm password",
    validation: "required|confirm",
    validationLabel: "password confirmation",
  },
]);
const { toast } = useToast();
const HandleRegisterUser = async () => {
  await signUp.email({
    email: userInformation.value.email,
    password: userInformation.value.password,
    name: `${userInformation.value.firstName} ${userInformation.value.lastName}`
      .toUpperCase()
      .replaceAll(" ", "-"),
    firstName: userInformation.value.firstName,
    lastName: userInformation.value.lastName,
    callbackURL: "/app/",
    fetchOptions: {
      onError: (context) => {
        toast({
          title: "Please try again",
          description: context?.error?.message || "Please check your email and password",
          variant: "destructive",
        });
      },
    },
  });
};

const signInWithGoogle = async () => {
  await signIn.social({
    provider: "google",
    callbackURL: "/app/",
    fetchOptions: {
      onError: (context) => {
        toast({
          title: "Please try again",
          description: context?.error?.message || "Please check your email and password",
          variant: "destructive",
        });
      },
    }
  })
}

</script>

<template>
  <div class="container py-24">
    <UiToaster />
    <UiCard class="w-full max-w-md mx-auto">
      <UiCardHeader>
        <UiCardTitle class="text-2xl"> Register </UiCardTitle>
        <UiCardDescription>
          Choose your preferred registration method.
        </UiCardDescription>
      </UiCardHeader>
      <UiCardContent class="grid gap-4">
        <div v-if="selectedRegisterMethod === 'none'" class="grid gap-4">
          <UiButton class="w-full" @click="selectedRegisterMethod = 'email'">
            <Icon class="size-4" name="heroicons:envelope" />
            <span class="ml-2">Continue with Email</span>
          </UiButton>
          <UiButton variant="outline" class="w-full" @click="signInWithGoogle">
            <Icon class="size-4" name="logos:google-icon" />
            <span class="ml-2">Continue with Google</span>
          </UiButton>
        </div>

        <FormKit v-else-if="selectedRegisterMethod === 'email'" id="register-form" v-slot="{ state: { valid } }"
          v-model="userInformation" type="form" :actions="false" @submit="HandleRegisterUser">
          <FormKitSchema :schema="registerForm" />
          <UiButton class="w-full" type="submit" :disabled="!valid"> Register </UiButton>
          <UiButton variant="ghost" class="w-full mt-2" @click="selectedRegisterMethod = 'none'">
            Back to registration options
          </UiButton>
        </FormKit>

        <UiSeparator />
        <UiButton variant="ghost" class="w-full">
          <NuxtLink to="/login">
            Already have an account?
            <span class="underline">Login</span>
          </NuxtLink>
        </UiButton>
      </UiCardContent>
    </UiCard>
  </div>
</template>
<style scoped></style>
