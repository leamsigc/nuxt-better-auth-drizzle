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