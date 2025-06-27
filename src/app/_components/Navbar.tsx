// src/components/navbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Shield, Menu, X } from "lucide-react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-border sticky top-0 z-50 border-b backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Shield className="text-primary h-8 w-8" />
              <span className="text-foreground text-xl font-bold">
                TruthCheck
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden items-center space-x-8 md:flex">
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <Link
              href="/submit"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Submit for Analysis
            </Link>
            <Link
              href="/about"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              href="/admin"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 transition-colors"
            >
              Admin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-muted-foreground hover:text-foreground"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="border-border space-y-1 border-t px-2 pt-2 pb-3 sm:px-3">
              <Link
                href="/"
                className="text-muted-foreground hover:text-foreground block px-3 py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/submit"
                className="text-muted-foreground hover:text-foreground block px-3 py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Submit for Analysis
              </Link>
              <Link
                href="/about"
                className="text-muted-foreground hover:text-foreground block px-3 py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/admin"
                className="bg-primary text-primary-foreground hover:bg-primary/90 block rounded-md px-3 py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
