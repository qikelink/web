import { Inter } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";
import { AuthProvider } from "@/contexts/auth-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Y project",
  description: "YC batch 24 july-august",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="text-foreground p-2">
      <body className={inter.className}>
        <AuthProvider>
          <Providers>{children}</Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
