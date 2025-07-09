## How to use?
1. Click on the "Use this template" button 
2. click on the "Create repository from template" button.
3. Create your own repo
4. Clone the project locally
5. Crate the .env file base on the .env-example `cp .env-example .env`
6. Run `pnpm i`
7. Run `pnpm db:generate`
8. Run `pnpm db:migrate`
9. Run `pnpm dev`
10. To view the db studio run `pnpm db:studio`


#  Nuxt and Better Auth integration example | Step by step tutorial | Basic Setup 

1. User registration | email and password
2. User login | email and password
3. User logout



> Protected routes
`/app/`


> Unprotected routes
`/login`
`/register`
`/`

  - [x] Create new Nuxt 4 project
  - [x] Install Basic modules for the project
	  - [x] Tailwind css
	  - [x] SEO Module
	  - [x] Vue Use
	  - [x] Drizzle ORM
1. Install Drizzle ORM 
```shell
pnpm add drizzle-orm @libsql/client dotenv
pnpm add -D drizzle-kit tsx

```
2. Create `.env`
3. Create config Drizzle  
4. Create schema


	  - [x] Nuxt Image
	  - [x] Nuxt font
	  - [x] Nuxt scripts
	  - [x] Nuxt content
	  - [x] Formkit
6. Create the config file for the FormKit
7. Update the nuxt.config file 
8. Install the theme for the FormKit styles `npx formkit theme --theme=regenesis` 
9. Include the FormKit theme config to the tailwindcss configuration
10. There is a issue with Formkit and Nuxt when setting the `autimport:true` in the Formkit config to FormKitSchema have an issue with the data banding.

Optional Modules:

- [ ] tailwind-variants
- [ ] typographty → Tailwind css
- [ ] @unlighthouse/nuxt


`npx nuxi@latest module add tailwind seo vueuse image font scripts content formkit `

- [x] Install the  Better auth
- [x] Connect better auth
- [x] Create username and password example


###  Base on the documentation of Better Auth Follow the next steps 

1. Install the Better auth package `pnpm add better-auth`
2. Generate the env ```BETTER_AUTH_SECRET```
3. Create instance of the auth in `lib/auth.ts`
4. Connect to Drizzle orm
5. Create the tables and migrate
   `npx @better-auth/cli generate`  & `npx @better-auth/cli migrate`

##### Notes:
It seems like the import path for the drizzle config need to be relative and not the auto import from Nuxt `~~`  

The better auth CLI migrate is not compatible with Drizzle ORM Manual generate and migrate command from `drizzle-kit` need to be trigger.


The schema generated from Better auth you can move the content from that schema generated to the Drizzle schema

```js

export const user = sqliteTable("user", {
	id: text("id").primaryKey(),
	name: text('name').notNull(),
	firstName: text('firstName').notNull(),
	lastName: text('lastName').notNull(),
	email: text('email').notNull().unique(),
	emailVerified: integer('emailVerified', {
		mode: "boolean"
	}).notNull(),
	image: text('image'),
	createdAt: integer('createdAt', {
		mode: "timestamp"
	}).notNull(),
	updatedAt: integer('updatedAt', {
		mode: "timestamp"
	}).notNull()
});

export const session = sqliteTable("session", {
	id: text("id").primaryKey(),
	expiresAt: integer('expiresAt', {
		mode: "timestamp"
	}).notNull(),
	ipAddress: text('ipAddress'),
	userAgent: text('userAgent'),
	userId: text('userId').notNull().references(() => user.id)
});

export const account = sqliteTable("account", {
	id: text("id").primaryKey(),
	accountId: text('accountId').notNull(),
	providerId: text('providerId').notNull(),
	userId: text('userId').notNull().references(() => user.id),
	accessToken: text('accessToken'),
	refreshToken: text('refreshToken'),
	idToken: text('idToken'),
	expiresAt: integer('expiresAt', {
		mode: "timestamp"
	}),
	password: text('password')
});

export const verification = sqliteTable("verification", {
	id: text("id").primaryKey(),
	identifier: text('identifier').notNull(),
	value: text('value').notNull(),
	expiresAt: integer('expiresAt', {
		mode: "timestamp"
	}).notNull()
});

```

> Note: 

The firstName and lastName are fields that I added manually.


> Steps After installation



1. Create auth route on the server folder `/api/[...auth].ts`
```ts
import { auth } from "~~/lib/auth";

  

export default defineEventHandler(async (event) => {

return auth.handler(toWebRequest(event));

});

```


2. Create a `<root Project Directory>/lib` create the following files:

`auth.ts`

```ts
import { betterAuth, type User } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
//You can import the schema from where the drizzle schema is pointing
import * as schema from "../db/schema";

//You probabaly call this db or any other name to the drizzle connection
import { useDrizzle } from "../server/utils/drizzle";


export const auth = betterAuth({
    database: drizzleAdapter(useDrizzle(), {
        provider: "sqlite",
        schema: {
            ...schema
        }
    }),
    user: {
    //Add the extra fields that you have in the user table I created the fistName and last name sot need to add them here
        additionalFields: {
            firstName: {
                type: "string",
                fieldName: "firstName",
                returned: true,
                input: true,
                required: true,
            },
            lastName: {
                type: "string",
                fieldName: "lastName",
                returned: true,
                input: true,
                required: true,
            }
        }
    },
    emailAndPassword: {
        enabled: true,
        async sendResetPassword(url, user) {
            console.log("Reset password url:", url);
        },
    },
})
```



`auth-client.ts`

```ts
import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/vue";
import { auth } from "./auth"
export const authClient = createAuthClient({
	plugins: [inferAdditionalFields<typeof auth>()],
});

export const {
	signIn,
	signOut,
	signUp,
	useSession,
	forgetPassword,
	resetPassword,
} = authClient;

```

> The useDrizzle is coming from 

`<root Directory>/server/utils/drizzle.ts`


```ts
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
//If you have a config file if not this is not necessary
import { tursoConfig } from "../../config/turso.config";
//Point to the schema file from Drizzle 
import * as schema from "../../db/schema";

const tursoClient = createClient({
    url: tursoConfig.url,
    authToken: tursoConfig.authToken
})

//Instance of Drizzle to be use anywhere else
export const useDrizzle = () => {
    return drizzle(tursoClient)
}


export const tables = schema;



export const UserInsert = schema.user.$inferInsert;
export type UserRegisterType = Omit<typeof UserInsert, "createdAt" | "updatedAt" | "id" | "emailVerified">;
```




### Fork the project

[shadcn-vue-landing-page](https://shadcn-vue-landing-page.vercel.app/) to Nuxt for the home page




### Home Page

![Home page](./public/HomePage.png)


### Login Page

![Login Page](./public/loginPage.png)

### Register Page

![Register Page](./public/RegisterPage.png)


### Dashboard 

![Dashboard](./public/Dashboard.png)





## TODO

- [x] When a new user registered, send a verification email to the user
- [x] If the user is not verified show a verification screen
```ts
await authClient.signIn.emailAndPassword({
    email: "email@example.com",
    password: "password"
}, {
    onError: (ctx) => {
        // Handle the error
        if(ctx.error.status === 403) {
            // Display a verification overlay
        }
    }
});
```

- [x] Enforce email verification
```ts
export const auth = betterAuth({
    emailAndPassword: {
        requireEmailVerification: true
    }
})
```