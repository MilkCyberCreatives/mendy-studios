'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { HiOutlineMenuAlt3, HiOutlineX } from 'react-icons/hi';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Motion', href: '/motion' },
  { name: 'Services', href: '/services' },
  { name: 'Areas', href: '/locations' },
  { name: 'Stories', href: '/stories' },
  { name: 'Contact', href: '/contact' },
];

export default function MainHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 border-b backdrop-blur-xl transition-all duration-300 ${
        scrolled
          ? 'bg-black/85 border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.35)]'
          : 'bg-black/35 border-white/15'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between gap-4">
        <Link href="/" aria-label="Mendy Studios home" className="shrink-0">
          <Image
            src="/mendy-studios-logo-white.svg"
            alt="Mendy Studios Logo"
            width={168}
            height={44}
            priority
            className="h-auto w-[140px] md:w-[168px]"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-white text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className={`group relative py-2 transition-colors ${
                  isActive ? 'text-[#F26722]' : 'hover:text-gray-300'
                }`}
              >
                {link.name}
                <span
                  className={`absolute left-0 -bottom-[1px] h-[2px] bg-[#F26722] transition-all ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="md:hidden text-white text-2xl">
          <button
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="p-2"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-main-nav"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-main-nav"
        className={`md:hidden bg-black/95 border-t border-white/10 overflow-hidden transition-[max-height,opacity] duration-300 ${
          mobileMenuOpen ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-3">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className={`block py-3 text-base border-b border-white/10 transition ${
                  isActive ? 'text-[#F26722]' : 'hover:text-gray-300'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
