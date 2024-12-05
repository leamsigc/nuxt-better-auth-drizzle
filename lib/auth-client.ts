import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/vue";
import type { auth } from "./auth"
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
	deleteUser
} = authClient;
