import React, { ReactNode } from 'react';
import Link from 'next/link';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Chess Game
          </Link>
          <nav className="flex space-x-6">
            <Link href="/pk" className="text-gray-700 hover:text-blue-600">
              Play
            </Link>
            <Link href="/friends" className="text-gray-700 hover:text-blue-600">
              Friends
            </Link>
            <Link href="/record" className="text-gray-700 hover:text-blue-600">
              Records
            </Link>
            <Link href="/ranklist" className="text-gray-700 hover:text-blue-600">
              Rankings
            </Link>
            <Link href="/rule" className="text-gray-700 hover:text-blue-600">
              Rules
            </Link>
            <Link href="/login" className="text-gray-700 hover:text-blue-600">
              Login
            </Link>
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-white shadow mt-auto py-4">
        <div className="container mx-auto px-4 text-center text-gray-600">
          © 2026 Chess Game. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
