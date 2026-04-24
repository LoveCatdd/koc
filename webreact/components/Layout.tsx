"use client";
import React, { ReactNode } from "react";
import Link from "next/link";
import { useAuth } from "@/utils/auth";

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Chess Game
          </Link>
          <nav className="flex space-x-6 items-center">
            <Link href="/pk" className="text-gray-700 hover:text-blue-600">
              Play
            </Link>
            <Link href="/friends" className="text-gray-700 hover:text-blue-600">
              Friends
            </Link>
            <Link href="/record" className="text-gray-700 hover:text-blue-600">
              Records
            </Link>
            <Link
              href="/ranklist"
              className="text-gray-700 hover:text-blue-600"
            >
              Rankings
            </Link>
            <Link href="/rule" className="text-gray-700 hover:text-blue-600">
              Rules
            </Link>
            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/user-info"
                  className="text-gray-700 hover:text-blue-600"
                >
                  {user.username}
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-red-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/login" className="text-gray-700 hover:text-blue-600">
                Login
              </Link>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
      <footer className="bg-white shadow-sm mt-auto py-4">
        <div className="container mx-auto px-4 text-center text-gray-600">
          © 2026 Chess Game. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
