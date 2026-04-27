"use client";

import React, { ReactNode } from "react";
import { AuthProvider } from "@/utils/auth";
import { Layout } from "@/components/Layout";
import { Toaster } from "@/components/ui/sonner";

interface ProvidersProps {
  children: ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <AuthProvider>
      <Layout>{children}</Layout>
      <Toaster />
    </AuthProvider>
  );
};
