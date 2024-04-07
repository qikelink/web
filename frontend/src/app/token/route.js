import { AccessToken, Role } from "@huddle01/server-sdk/auth";

import { authConfig } from "@/lib/session";
import NextAuth from "next-auth/next";

// Check if the code is running in a Cloudflare Pages environment
const isCloudflarePages = process.env.VERCEL === '1';

// Set the runtime accordingly
export const runtime = isCloudflarePages ? 'edge' : process.env.NODE_ENV === 'development' ? undefined : 'edge';

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };


export const dynamic = "force-dynamic";

const getCorsHeaders = (origin) => {
  const headers = {
    "Access-Control-Allow-Methods": `${process.env.ALLOWED_METHODS}`,
    "Access-Control-Allow-Headers": `${process.env.ALLOWED_HEADERS}`,
    "Access-Control-Allow-Origin": `${process.env.DOMAIN_URL}`,
  };

  if (!process.env.ALLOWED_ORIGIN || !origin) return headers;

  const allowedOrigins = process.env.ALLOWED_ORIGIN.split(",");

  if (allowedOrigins.includes("*")) {
    headers["Access-Control-Allow-Origin"] = "*";
  } else if (allowedOrigins.includes(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
  }
  return headers;
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const roomId = searchParams.get("roomId");

  if (!roomId) {
    return new Response("Missing roomId", { status: 400 });
  }

  const accessToken = new AccessToken({
    apiKey: process.env.API_KEY,
    roomId: roomId,
    role: Role.HOST,
    permissions: {
      admin: true,
      canConsume: true,
      canProduce: true,
      canProduceSources: {
        cam: true,
        mic: true,
        screen: true,
      },
      canRecvData: true,
      canSendData: true,
      canUpdateMetadata: true,
    },
  });

  const token = await accessToken.toJwt();

  return new Response(token, {
    status: 200,
    headers: getCorsHeaders(request.headers.get("origin") || ""),
  });
}
