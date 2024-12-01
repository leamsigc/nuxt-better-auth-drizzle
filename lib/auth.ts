import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "../db/schema";
import { useDrizzle } from "../server/utils/drizzle";

import { sendUserVerificationEmail } from "../server/utils/email";

export const auth = betterAuth({
    database: drizzleAdapter(useDrizzle(), {
        provider: "sqlite",
        schema: {
            ...schema
        }
    }),
    user: {
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
    emailVerification: {
        async sendVerificationEmail({ user, url }) {
            await sendUserVerificationEmail(user, url);
        },
        sendOnSignUp: true,
    },
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        async sendResetPassword(url) {
            console.log("Reset password url:", url);
        },
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }
    }
})