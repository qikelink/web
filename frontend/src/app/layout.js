import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import "./globals.css";
import { AuthProvider } from "@/contexts/auth-context";
import { Toaster } from "@/components/ui/toaster";
import { UserProvider } from "@/contexts/user-context";


const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: "400",
});

export const metadata = {
  title: "Wissh",
  description: "Recieve message and presents from your friends anonymously ",
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
        <AuthProvider>
          <UserProvider>
            {children}
          </UserProvider>
        </AuthProvider>

        <Toaster />
      </body>
    </html>
  );
}
