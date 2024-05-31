import { Inter as FontSans } from "next/font/google";

import { cn, constructMetadata } from "@/lib/utils";
import "./globals.css";
import { AuthProvider } from "@/contexts/auth-context";
import { Toaster } from "@/components/ui/toaster";
import { UserProvider } from "@/contexts/user-context";
import HuddleContextProvider from "@/contexts/HuddleContextProvider";
import NextAuthProvider from "@/contexts/SessionProvider";

const fontSans = FontSans({
  subsets: ["vietnamese"],
  variable: "--font-sans",
  weight: "400",
});

export const metadata = constructMetadata();

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="google-site-verification"
          content="xsjX5FC2oPFgWCsgWb8LyLmMD3HhGG5sOsXdIMaiJV0"
        />
      </head>
      <body
        className={cn(
          " bg-background font-Inter text-foreground invisible-scrollbar",
          fontSans.variable
        )}>
        <NextAuthProvider>
          <AuthProvider>
            <UserProvider>
              <HuddleContextProvider>{children}</HuddleContextProvider>
            </UserProvider>
          </AuthProvider>
        </NextAuthProvider>

        <Toaster />
      </body>
    </html>
  );
}
