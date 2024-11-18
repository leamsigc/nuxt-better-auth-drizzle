export function checkEnv(env: NodeJS.ProcessEnv) {
    const required = [
        "MAIL_FROM_EMAIL",
        "NUXT_TURSO_DATABASE_URL",
        "NUXT_TURSO_AUTH_TOKEN",
        "BETTER_AUTH_SECRET",
        "NUXT_BETTER_AUTH_URL",
        "BETTER_AUTH_URL",
        "MAILGUN_API_KEY",
        "MAILGUN_DOMAIN",
        "MAIL_FROM_EMAIL",
        "GOOGLE_CLIENT_ID",
        "GOOGLE_CLIENT_SECRET",
    ];

    const missing = required.filter((key) => !env[key]);

    if (missing.length > 0) {
        console.log("Missing required environment variables:", missing);

        throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
    }
}

