import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import "./globals.css";
import { AuthProvider } from "@/contexts/auth-context";
import { Toaster } from "@/components/ui/toaster";
import HuddleContextProvider from "@/contexts/HuddleContextProvider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: "400",
});

export const metadata = {
  title: "Y project",
  description: "YC batch 24 july-august",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          " bg-background font-poppins text-foreground",
          fontSans.variable
        )}>
        <AuthProvider>
          <HuddleContextProvider>{children}</HuddleContextProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
