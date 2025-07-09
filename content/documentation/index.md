---
layout: blog-layout
title: NuxtZzle Documentation | From file structure to db schema
description: Nuxt 4, tailwind css, Better auth, Drizzle ORM| From file structure to db schema.

ogImage:
  component: Pergel
  props:
    title: NuxtZzle Documentation
    description: Nuxt 4, tailwind css, Better auth, Drizzle ORM.
    heading: Nuxt 4

head:
  htmlAttrs:
    lang: en
  bodyAttrs:
    class: ""
  meta:
    - name: keywords
      content: NuxtZzle Documentation| From file structure to db schema
    - name: robots
      content: index, follow
    - name: author
      content: NuxtZzle Documentation| From file structure to db schema
    - name: description
      content: Base template for enterprise project Better Auth & Nuxt.
    - name: twitter:title
      content: NuxtZzle Documentation| From file structure to db schema
    - name: twitter:card
      content: summary_large_image
    - name: twitter:title
      content: NuxtZzle Documentation| From file structure to db schema
    - name: twitter:description
      content: Base template for enterprise project Better Auth & Nuxt.
---

## Introduction

NuxtZzle is a base template for enterprise project Better Auth & Nuxt.

## Nuxt Configuration (`nuxt.config.ts`)

The `nuxt.config.ts` file is the central configuration file for your NuxtZzle project. It defines how your Nuxt application behaves, including modules, build settings, and various integrations.

### Key Configurations:

*   **`compatibilityDate`**: Set to `2024-04-03` for compatibility with Nuxt 4 features.
*   **`future.compatibilityVersion`**: Set to `4` to enable future compatibility features.
*   **`devtools.enabled`**: `true` to enable Nuxt DevTools for enhanced development experience.

### Modules:

NuxtZzle leverages a comprehensive set of modules to provide a rich development environment:

*   **`@nuxtjs/tailwindcss`**: Integrates Tailwind CSS for utility-first styling.
*   **`@nuxtjs/seo`**: Provides SEO-related functionalities.
*   **`@vueuse/nuxt`**: Adds a collection of VueUse utility functions.
*   **`@nuxt/content`**: Enables writing content in Markdown, YAML, CSV, XML, and JSON files.
*   **`@formkit/nuxt`**: Integrates FormKit for building robust forms.
*   **`nuxt-auth-utils`**: Provides utilities for authentication.
*   **`shadcn-nuxt`**: Integrates Shadcn UI components for a beautiful design system.
*   **`@nuxt/eslint`**: ESLint integration for code linting.
*   **`radix-vue/nuxt`**: Integrates Radix Vue components.
*   **`@nuxt/image`**: Optimizes images for performance.
*   **`@nuxtjs/color-mode`**: Manages color modes (light/dark).
*   **`@nuxt/icon`**: Provides an icon component.
*   **`@unlighthouse/nuxt`**: Integrates Unlighthouse for website audits.
*   **`@nuxt/fonts`**: Manages web fonts.
*   **`@vueuse/motion/nuxt`**: Adds motion and animation capabilities.
*   **`@nuxtjs/i18n`**: Provides internationalization (i18n) support.

### Module-Specific Configurations:

*   **`i18n`**: Configured to use `translation/i18n.config.ts` for Vue I18n, with `en` as the default locale.
*   **`formkit`**: Uses `./config/formkit.config.ts` for its configuration.
*   **`tailwindcss`**: Exposes configuration and uses `./config/tailwind.config.ts`.
*   **`shadcn`**: Components are prefixed with `Ui` and located in `./app/components/ui`.
*   **`colorMode`**: No class suffix is added.
*   **`components`**: Configured to auto-import components from `~/components`.
*   **`site`**: Defines global SEO metadata like URL, name, description, and default locale.
*   **`sitemap` & `robots`**: Excludes `/app/**` paths from sitemap generation and robots disallow rules.
*   **`image`**: Sets default quality to 75 and format to `webp`.
*   **`eslint`**: Configured for standalone mode.
*   **`ogImage`**: Enables global component options for Open Graph images.
*   **`content`**: Configures markdown highlighting themes for default, dark, and sepia modes.

### Hooks:

*   **`pages:extend`**: 
A hook that modifies Nuxt pages. It removes pages that include `components`, `/api`, or `composables` in their paths,
 preventing them from being registered as routes.

## Project File Structure

NuxtZzle follows a well-organized file structure to separate concerns and improve maintainability. Below is a breakdown of the main directories and their purposes:

```
.
├── .dockerignore
├── .env-example
├── .gitignore
├── components.json
├── content.config.ts
├── docker-compose.dev.yml
├── docker-compose.yml
├── Dockerfile
├── Dockerfile.dev
├── eslint.config.mjs
├── nuxt.config.ts
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── README.md
├── tsconfig.json
├── app/
│   ├── app.vue
│   ├── assets/
│   │   └── css/
│   │       └── tailwind.css
│   ├── components/
│   │   ├── TableLoading.vue
│   │   ├── content/             # Content-specific Vue components
│   │   ├── OgImage/             # Open Graph image components
│   │   ├── table/               # Table-related components and logic
│   │   └── ui/                  # Shadcn UI components
│   ├── composables/             # Reusable Vue Composition API functions
│   │   ├── useConfetti.ts
│   │   ├── useUser.ts
│   │   └── useUserManagement.ts
│   ├── layouts/                 # Nuxt layouts for different page structures
│   │   ├── BlogLayout.vue
│   │   ├── DashboardLayout.vue
│   │   └── default.vue
│   ├── middleware/              # Nuxt middleware for route protection and logic
│   │   ├── 00.auth.global.ts
│   │   ├── 000.redirect.global.ts
│   │   ├── 01.layout.global.ts
│   │   └── 02.admin.global.ts
│   └── pages/                   # Nuxt pages (routes)
│       ├── [...slug].vue
│       ├── login.vue
│       ├── register.vue
│       └── app/
├── config/                      # Configuration files for various tools
│   ├── app.config.ts            # Application-specific configuration
│   ├── drizzle.config.ts        # Drizzle ORM configuration
│   ├── env.config.ts            # Environment variable validation
│   ├── formkit.config.ts        # FormKit configuration
│   ├── tailwind.config.ts       # Tailwind CSS configuration
│   └── turso.config.ts          # Turso database configuration
├── content/                     # Markdown content for Nuxt Content module
│   ├── _nav.md
│   ├── index.md
│   ├── blog/                    # Blog posts
│   ├── documentation/           # Project documentation
│   │   └── index.md
│   └── nav/                     # Navigation links and site metadata
│       ├── headerLinks.yml
│       ├── links.yml
│       └── siteMeta.yml
├── db/                          # Database-related files
│   ├── migrate.ts               # Database migration script
│   ├── schema.ts                # Drizzle ORM database schema
│   ├── auth/                    # Authentication-related database schema
│   │   └── auth.ts
│   └── migrations/              # Drizzle migration files
│       ├── 0000_square_hemingway.sql
│       └── meta/
├── formkit/                     # FormKit theme configuration
│   └── formkit.theme.ts
├── lib/                         # Utility functions and client-side authentication
│   ├── auth-client.ts
│   ├── auth.ts
│   └── utils.ts
├── public/                      # Static assets served directly by the web server
│   ├── Dashboard.png
│   ├── favicon.ico
│   ├── HomePage.png
│   ├── loginPage.png
│   ├── logo.png
│   ├── logo.svg
│   ├── RegisterPage.png
│   ├── img/                     # Images
│   └── media/                   # Media files
│   └── users/                   # User-related assets
├── server/                      # Server-side API routes and utilities
│   ├── tsconfig.json
│   ├── api/                     # Server API endpoints
│   │   └── auth/
│   └── utils/                   # Server-side utility functions
│       ├── drizzle.ts
│       ├── email.ts
│       └── emailTemplates.ts
├── sqld/                        # SQL database related files (if any)
├── translation/                 # Internationalization (i18n) files
│   ├── global.json
│   └── i18n.config.ts
└── types/                       # TypeScript type definitions
    └── BlueSkyTypes.ts
```

### Directory Breakdown:

*   **`app/`**: Contains the core Nuxt application code. This is where your Vue components, pages, layouts, and other client-side logic reside.
*   **`config/`**: Houses various configuration files for modules and tools used in the project, ensuring a centralized place for settings.
*   **`content/`**: Dedicated to markdown and other content files managed by the `@nuxt/content` module. This is ideal for blogs, documentation, and static pages.
*   **`db/`**: Stores all database-related files, including schema definitions, migration scripts, and authentication schemas, crucial for Drizzle ORM integration.
*   **`formkit/`**: Contains custom FormKit theme configurations.
*   **`lib/`**: A general-purpose directory for utility functions and client-side authentication logic that can be shared across the application.
*   **`public/`**: For static assets like images, favicons, and other files that need to be served directly without processing by Nuxt.
*   **`server/`**: Contains server-side code, including API routes and utility functions that run on the server.
*   **`translation/`**: Holds JSON files and configuration for internationalization, allowing the application to support multiple languages.
*   **`types/`**: For custom TypeScript type definitions, enhancing code clarity and maintainability.

### Root Files:

*   **`.dockerignore`, `Dockerfile`, `docker-compose.yml`, `docker-compose.dev.yml`, `Dockerfile.dev`**: Docker-related files for containerization and deployment.
*   **`.env-example`**: An example file for environment variables.
*   **`.gitignore`**: Specifies files and directories to be ignored by Git.
*   **`components.json`**: Configuration for Shadcn UI components.
*   **`content.config.ts`**: Configuration for the Nuxt Content module.
*   **`eslint.config.mjs`**: ESLint configuration for code linting.
*   **`nuxt.config.ts`**: The main Nuxt configuration file (detailed above).
*   **`package.json`**: Defines project metadata and dependencies.
*   **`pnpm-lock.yaml`, `pnpm-workspace.yaml`**: PNPM lockfile and workspace configuration.
*   **`README.md`**: Project README file.
*   **`tsconfig.json`**: TypeScript configuration file.

[Content components](/documentation/components)