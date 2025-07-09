import type { NuxtPage } from 'nuxt/schema';
// https://nuxt.com/docs/api/configuration/nuxt-config

import { checkEnv } from "./config/env.config"
import { env } from "node:process";

checkEnv(env);

export default defineNuxtConfig({
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
    "@nuxt/fonts",
    '@vueuse/motion/nuxt',
    '@nuxtjs/i18n',
  ],
  i18n: {
    vueI18n: '~~/translation/i18n.config.ts',
    baseUrl: process.env.NUXT_APP_URL,
    locales: [
      { code: 'en', language: 'en-US', name: 'English' }
    ],
    defaultLocale: 'en',
    bundle: {
      optimizeTranslationDirective: false
    }
  },
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
    url: 'https://nuxt-better-auth.giessen.dev/',
    name: 'Nuxt setup with Better Auth module |  Drizzle + Nuxt + Tailwind CSS + content + FormKit',
    description: 'How to get started with Nuxt 4 and Better Auth| Step by step tutorial.',
    defaultLocale: 'en', // not needed if you have @nuxtjs/i18n installed
  },
  sitemap: {
    exclude: [
      '/app/**',
    ]
  },
  robots: {
    disallow: [
      '/app/**',
    ]
  },
  image: {
    quality: 75,
    format: ['webp'],
  },
  eslint: {
    config: {
      standalone: false
    }
  },
  ogImage: {
    componentOptions: {
      global: true
    }
  },
  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            // Default theme (same as single string)
            default: 'github-light',
            // Theme used if `html.dark`
            dark: 'monokai',
            // Theme used if `html.sepia`
            sepia: 'monokai'
          }
        }
      }
    }
  },
  hooks: {
    'pages:extend': function (pages) {
      const pagesToRemove: NuxtPage[] = []
      pages.forEach((page) => {
        if (page.path.includes('components') || page.path.includes('/api') || page.path.includes('composables')) {
          pagesToRemove.push(page)
        }
      })
      pagesToRemove.forEach((page: NuxtPage) => {
        pages.splice(pages.indexOf(page), 1)
      })
      /* Uncomment to show current Routes
      console.log(`\nCurrent Routes:`)
      console.log(pages)
      console.log(`\n`) */
    }
  },

})