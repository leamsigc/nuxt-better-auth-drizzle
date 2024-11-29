import type { NuxtPage } from 'nuxt/schema';
import { OgImage } from './.nuxt/components.d';
// https://nuxt.com/docs/api/configuration/nuxt-config

import { checkEnv } from "./config/env.config"
import { env } from "node:process";

checkEnv(env);

export default defineNuxtConfig({
  // hooks: {
  //   'pages:extend'(pages) {
  //     // add a route
  //     const routesToSameComponent = ['accessories', 'makeup'];
  //     for (const route of routesToSameComponent) {
  //       pages.push({
  //         name: route,
  //         path: `/${route}/:id`,
  //         file: '~/pages/collection/index.vue'
  //       })
  //     }
  //   }
  // },
  compatibilityDate: '2024-04-03',
  future: { compatibilityVersion: 4 },
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/seo",
    "@vueuse/nuxt",
    "@nuxt/content",
    "@formkit/nuxt",
    "nuxt-auth-utils",
    "shadcn-nuxt",
    "@nuxt/eslint",
    "radix-vue/nuxt",
    "@nuxt/image",
    "@nuxtjs/color-mode",
    "@nuxt/icon",
    '@unlighthouse/nuxt',
    "nuxt-content-assets",
    "@nuxt/fonts"
  ],
  formkit: {
    // autoImport: true,
    configFile: './config/formkit.config.ts',
  },
  tailwindcss: {
    exposeConfig: true,
    editorSupport: true,
    configPath: "./config/tailwind.config.ts"
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: 'Ui',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './app/components/ui'
  },
  colorMode: {
    classSuffix: ''
  },
  components: [
    {
      path: "~/components",
      pathPrefix: false
    }
  ],
  site: {
    url: 'https://nuxt-better-auth-drizzle.vercel.app',
    name: 'Nuxt setup with Better Auth module |  Drizzle + Nuxt + Tailwind CSS + content + FormKit',
    description: 'How to get started with Nuxt 4 and Better Auth| Step by step tutorial.',
    defaultLocale: 'en', // not needed if you have @nuxtjs/i18n installed
  },
  image: {
    quality: 75,
    format: ['webp'],
  },
  ogImage: {
    componentOptions: {
      global: true
    }
  },
  content: {
    documentDriven: true,
    ignores: [
      "/login",
      "/register",
      "/app/"
    ]
  }
})