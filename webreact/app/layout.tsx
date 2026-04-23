import type { Metadata } from "next";
import "./globals.css";
import { Layout } from "@/components/Layout";
import { AuthProvider } from "@/utils/auth";

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
    <html lang="en">
      <body>
        <AuthProvider>
          <Layout>{children}</Layout>
        </AuthProvider>
      </body>
    </html>
  );
}
