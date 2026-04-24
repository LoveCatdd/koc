"use client";
import React, { ReactNode } from "react";
import { Layout } from "@/components/Layout";
import { AuthProvider } from "@/utils/auth";
import { Toaster } from "@/components/ui/sonner";

interface ClientLayoutProps {
  children: ReactNode;
}

export const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  return (
    <AuthProvider>
      <Layout>{children}</Layout>
      <Toaster />
    </AuthProvider>
  );
};
