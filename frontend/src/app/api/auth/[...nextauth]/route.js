import { authConfig } from "@/lib/session";
import NextAuth from "next-auth/next";

export const runtime = 'edge';

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };

