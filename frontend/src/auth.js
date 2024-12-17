import { SvelteKitAuth } from "@auth/sveltekit";
import Google from "@auth/sveltekit/providers/google";

export const { handle, signIn } = SvelteKitAuth({
  providers: [Google],
  trustHost: true,
  url: process.env.AUTH_URL
});
