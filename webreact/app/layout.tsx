import type { Metadata } from "next";
import "./globals.css";
import { Layout } from "@/components/Layout";
import { AuthProvider } from "@/utils/auth";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Chess Game",
  description: "Online chess game with real-time matching and chat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body>
        <AuthProvider>
          <Layout>{children}</Layout>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
