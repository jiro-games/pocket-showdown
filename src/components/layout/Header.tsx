'use client';

import Link from 'next/link';
import { LanguageSelector } from '@/components/ui/LanguageSelector';
import { Button } from '../ui/Button';

export function Header() {
  const isAuthenticated = false;

  return (
    <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-2xl font-bold text-white hover:text-blue-200 transition-colors"
          >
            Pocket Showdown
          </Link>
          <nav className="hidden md:flex items-center gap-4">
            <Link
              href="/dex"
              className="text-white/80 hover:text-white transition-colors px-3 py-2 rounded-md hover:bg-white/10"
            >
              Card Dex
            </Link>
            <Link
              href="/deck-builder"
              className="text-white/80 hover:text-white transition-colors px-3 py-2 rounded-md hover:bg-white/10"
            >
              Deck Builder
            </Link>
            <Link
              href="/simulator"
              className="text-white/80 hover:text-white transition-colors px-3 py-2 rounded-md hover:bg-white/10"
            >
              Battle Simulator
            </Link>
          </nav>
        </div>

        <div className="flex gap-3">
          <LanguageSelector />
          {isAuthenticated ? (
            <>
              <span className="text-white">Welcome!</span>
              <Button variant="outline" size="sm">
                Profile
              </Button>
              <Button variant="ghost" size="sm">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" size="sm">
                Login
              </Button>
              <Button variant="primary" size="sm">
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
