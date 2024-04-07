import { authConfig } from "@/lib/session";
import NextAuth from "next-auth/next";

// Check if the code is running in a Cloudflare Pages environment
const isCloudflarePages = process.env.VERCEL === '1';

// Set the runtime accordingly
export const runtime = isCloudflarePages ? 'edge' : undefined;

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
