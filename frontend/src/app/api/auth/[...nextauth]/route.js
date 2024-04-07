import { authConfig } from "@/lib/session";
import NextAuth from "next-auth/next";

export const runtime = 'both';

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
