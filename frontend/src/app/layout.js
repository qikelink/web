

import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import "./globals.css";
import { AuthProvider } from "@/contexts/auth-context";
import { Toaster } from "@/components/ui/toaster";
import { UserProvider } from "@/contexts/user-context";
import HuddleContextProvider from "@/contexts/HuddleContextProvider";
// import {SessionContextProvider} from "@/contexts/session-context";
// import { SessionProvider } from "next-auth/react";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: "400",
});

export const metadata = {
  title: "Qikelink.com || AirBnb for consulting",
  description: "Connecting You To Your Next Level Growth",
  icons:
    "https://bafkreif7fy6ndk7v7zqpmcbsngr5fnohjgvdpappfr7r3c33h6ie7oda7a.ipfs.nftstorage.link/",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          " bg-background font-poppins text-foreground invisible-scrollbar",
          fontSans.variable
        )}
      >
          {/* <SessionProvider>
          <SessionContextProvider> */}
            <AuthProvider>
              <UserProvider>
                <HuddleContextProvider>{children}</HuddleContextProvider>
              </UserProvider>
            </AuthProvider>
          {/* </SessionContextProvider>
        </SessionProvider> */}
        <Toaster />
      </body>
    </html>
  );
}
