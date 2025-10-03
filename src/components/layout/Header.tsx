'use client';

import Link from 'next/link';
import { LanguageSelector } from '@/components/ui/LanguageSelector';
import { Button } from '../ui/Button';
import { Logo } from '../ui/Logo';
import './Header.css';

export function Header() {
  const isAuthenticated = false;

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__brand-nav">
          <Link href="/" className="header__logo">
            <Logo size="md" />
            <span className="header__logo-text">Pocket Showdown</span>
          </Link>
          <nav className="header__nav">
            <Link href="/dex" className="header__nav-link">
              Card Dex
            </Link>
            <Link href="/deck-builder" className="header__nav-link">
              Deck Builder
            </Link>
            <Link href="/simulator" className="header__nav-link">
              Battle Simulator
            </Link>
          </nav>
        </div>

        <div className="header__actions">
          <LanguageSelector />
          {isAuthenticated ? (
            <>
              <span className="header__welcome-text">Welcome!</span>
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
