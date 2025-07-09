```shell
├── app
│   ├── app.vue
│   ├── assets
│   │   └── css
│   │       └── tailwind.css
│   ├── components
│   │   ├── content/ #All components that are available globally to the Nuxt content
│   │   ├── OgImage # Custom Og images components
│   │   │   └── BlogOgImage.vue
│   │   ├── table/ #Table related components
│   │   ├── TableLoading.vue
│   │   ├── ui/ #shadcn-vue components
│   │   └── user #User related componenes is the same for other features as well example if we have SocialMediaPost feature this folder will contain the CRUD for the social media post
│   │       ├── CreateUser.vue
│   │       ├── DeleteProfile.vue
│   │       ├── DeleteUser.vue
│   │       ├── EditProfile.vue
│   │       ├── Profile.vue
│   │       ├── UpdateUser.vue
│   │       └── UserLogin.vue
│   ├── composables #Each feature will have it own composable for single item and for Managment as well
│   │   ├── useConfetti.ts
│   │   ├── useUserManagement.ts
│   │   └── useUser.ts
│   ├── layouts
│   │   ├── BlogLayout.vue
│   │   ├── DashboardLayout.vue
│   │   └── default.vue
│   ├── middleware
│   │   ├── 000.redirect.global.ts
│   │   ├── 00.auth.global.ts
│   │   ├── 01.layout.global.ts
│   │   └── 02.admin.global.ts
│   └── pages
│       ├── app # All proctected pages will go here
│       │   ├── admin
│       │   │   └── users
│       │   │       └──index.json #All translation related to the index.vue will go here and if there is another page we create it own <pagename>.json for the translation
│       │   │       └── index.vue
│       │   ├── index.vue
│       │   └── user
│       │       └── profile.vue
│       ├── login.vue
│       ├── register.vue
│       └── [...slug].vue
├── components.json
├── config
│   ├── app.config.ts
│   ├── drizzle.config.ts
│   ├── env.config.ts
│   ├── formkit.config.ts
│   ├── tailwind.config.ts
│   └── turso.config.ts
├── content
│   ├── blog
│   │   ├── how-to-add-GIF-to-dev-dot-to-article.md

├── content.config.ts
├── db # Database related schemas will go here
│   ├── auth
│   │   └── auth.ts
│   ├── migrate.ts
│   ├── migrations
│   │   ├── 0000_square_hemingway.sql
│   │   └── meta
│   │       ├── 0000_snapshot.json
│   │       └── _journal.json
│   └── schema.ts
├── docker-compose.dev.yml
├── docker-compose.yml
├── Dockerfile
├── Dockerfile.dev
├── .dockerignore
├── .env
├── .env-example
├── eslint.config.mjs
├── formkit
│   └── formkit.theme.ts
├── .gitignore
├── lib # Better auth related files
│   ├── auth-client.ts
│   ├── auth.ts
│   └── utils.ts
├── nuxt.config.ts
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── public #Public files will go here and all static assets as well
├── README.md
├── server #All server related 
│   ├── api
│   │   └── auth
│   │       └── [...all].ts
│   │   └──v1/ #Every feature api will go here base on version 1 and if there are new version for that api we create a folder for v2 compatible with v1
│   ├── tsconfig.json
│   └── utils #All utility schemas or actions example the email templates for the project
│       ├── drizzle.ts
│       ├── emailTemplates.ts
│       └── email.ts
├── translation
│   ├── global.json
│   └── i18n.config.ts
├── tsconfig.json
├── types
│   └── BlueSkyTypes.ts

```


### Rules must follow
      You are an expert in TypeScript, Node.js, NuxtJS 4, Vue 3, Shadcn Vue, Radix Vue, VueUse, and Tailwind.
      
      Code Style and Structure
      - Write concise, technical TypeScript code with accurate examples.
      - Use composition API and declarative programming patterns; avoid options API.
      - Prefer iteration and modularization over code duplication.
      - Use descriptive variable names with auxiliary verbs (e.g., isLoading, hasError).
      - Structure files: exported component, composables, helpers, static content, types.
      
      Naming Conventions
      - Use lowercase with dashes for directories (e.g., components/auth-wizard).
      - Use PascalCase for component names (e.g., AuthWizard.vue).
      - Use camelCase for composables (e.g., useAuthState.ts).
      
      TypeScript Usage
      - Use TypeScript for all code; prefer types over interfaces.
      - Avoid enums; use const objects instead.
      - Use Vue 3 with TypeScript, leveraging defineComponent and PropType.
      
      Syntax and Formatting
      - Use arrow functions for methods and computed properties.
      - Avoid unnecessary curly braces in conditionals; use concise syntax for simple statements.
      - Use template syntax for declarative rendering.
      
      UI and Styling
      - Use Shadcn Vue, Radix Vue, and Tailwind for components and styling.
      - Implement responsive design with Tailwind CSS; use a mobile-first approach.
      
      Performance Optimization
      - Leverage Nuxt's built-in performance optimizations.
      - Use Suspense for asynchronous components.
      - Implement lazy loading for routes and components.
      - Optimize images: use WebP format, include size data, implement lazy loading.
      
      Key Conventions
      - Use VueUse for common composables and utility functions.
      - Use Pinia for state management.
      - Optimize Web Vitals (LCP, CLS, FID).
      - Utilize Nuxt's auto-imports feature for components and composables.
      
      Nuxt-specific Guidelines
      - Follow Nuxt 3 directory structure (e.g., pages/, components/, composables/).
      - Use Nuxt's built-in features:
        - Auto-imports for components and composables.
        - File-based routing in the pages/ directory.
        - Server routes in the server/ directory.
        - Leverage Nuxt plugins for global functionality.
      - Use useFetch and useAsyncData for data fetching.
      - Implement SEO best practices using Nuxt's useHead and useSeoMeta.
      
      Vue 3 and Composition API Best Practices
      - Use <script setup> syntax for concise component definitions.
      - Leverage ref, reactive, and computed for reactive state management.
      - Use provide/inject for dependency injection when appropriate.
      - Implement custom composables for reusable logic.
      
      Follow the official Nuxt.js and Vue.js documentation for up-to-date best practices on Data Fetching, Rendering, and Routing.
      

# When creating a new vue files use the following as templated

```vue
<script lang="ts" setup>
/**
 *
 * Component Description:<The component description>
 *
 * @author Ismael Garcia <leamsigc@leamsigc.com>
 * @version 0.0.1
 *>
 * @todo [ ] Test the component
 * @todo [ ] Integration test.
 * @todo [✔] Update the typescript.
 */
</script>

<template>
  <Content here>
</template>
<style scoped >

</style>
```

### When asked to create a new feature follow the following steps

1. Create the <FEATURE> directory in the `./app/pages/app/<FEATURE>/` and all the new vue routes that you need example index, create, update as well create the translation json for each file  
2. Create the <FEATURE>.ts file in the `./app/composables/use<FEATURE>.ts` file the ingle Use<FEATURE>.ts and the use<FEATURE>Management.ts
3. If the feature required a api request create the <FEATURE>.ts file in the `./server/api/v1/<FEATURE>/` file for each action CRUD base 
4. if the feature required a api request create the <FEATURE>.ts file in the `./server/services/<FEATURE>.ts`
5. If there are files created in the server folder then the following need to be handle 
    - /<FEATURE>/[action].ts CRUD base will use the ./server/services/<FEATURE>.ts to make any business logic or database operations
    - /<FEATURE>/index.ts will use the ./server/services/<FEATURE>.ts to get all the data for the <FEATURE>

Example:

User ask for new feature: `Create a feature to handle comments`
Desired folder structure

```shell
- app
    - pages
        - app
            - comments #All comments related pages will go here
                - Components/ #All comments related components will go here
                    - Comments.vue
                - index.vue
                - index.json
                - create.vue
                - create.json
                - update.vue
                - update.json
            - admin #All admin related pages will go here 
                - comments # The admin will use the components that are located in the ./app/pages/app/comments/Components/
                    - index.json
                    - index.vue
- composables
    - useComments.ts
    - useCommentsManagement.ts
- server
    - api
        - v1
            - comments
                - index.ts
                - create.ts
                - update.ts
    - services
        - comments.ts
```
