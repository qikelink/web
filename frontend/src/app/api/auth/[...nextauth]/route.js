import { authConfig } from "@/lib/session";
import NextAuth from "next-auth/next";

export const runtime = process.env.AUTH_RUNTIME || "edge";

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
