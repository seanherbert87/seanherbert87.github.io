import React, { useState, useEffect, useCallback, memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Sun, Moon, Menu, X } from 'lucide-react';
import { SocialLink } from '../types';

// Brand icons removed from lucide-react 1.x — using inline SVGs
const GithubIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedinIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const Header: React.FC = memo(() => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = useCallback(() => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);

    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }, [isMobileMenuOpen]);

  const socialLinks: SocialLink[] = [
    { href: 'https://github.com/seanherbert87/', icon: GithubIcon, label: 'GitHub' },
    { href: 'https://www.linkedin.com/in/seanmherbert/', icon: LinkedinIcon, label: 'LinkedIn' },
    { href: '/contact', icon: Mail, label: 'Email' },
  ];

  return (
    <header className="mb-12">
      <div className="flex items-center justify-between mb-8">
        {/* Profile Section */}
        <div className="flex items-center space-x-6">
          <Link href="/" className="group">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-4 border-white dark:border-gray-800 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 overflow-hidden bg-gradient-to-br from-gray-600 to-gray-800 dark:from-gray-700 dark:to-black flex items-center justify-center">
                <Image
                  src="/profile-photo.jpg"
                  alt="Sean Herbert"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                  priority
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                />
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-gray-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </Link>

          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              Sean Herbert
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">
              Senior PHP &amp; WordPress Developer
            </p>
          </div>
        </div>

        {/* Desktop Navigation & Controls */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="flex items-center space-x-4">
            {socialLinks.map(({ href, icon: Icon, label }) => {
              const isExternal = href.startsWith('http');
              const linkProps = {
                className: "p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg",
                'aria-label': label
              };

              if (isExternal) {
                return (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" {...linkProps}>
                    <Icon className="w-5 h-5" />
                  </a>
                );
              } else {
                return (
                  <Link key={label} href={href} {...linkProps}>
                    <Icon className="w-5 h-5" />
                  </Link>
                );
              }
            })}
          </div>

          <button
            onClick={toggleDarkMode}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Navigation</span>
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          <div className="flex items-center space-x-4">
            {socialLinks.map(({ href, icon: Icon, label }) => {
              const isExternal = href.startsWith('http');
              const linkProps = {
                className: "flex items-center space-x-2 p-3 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg flex-1 justify-center",
                'aria-label': label
              };

              if (isExternal) {
                return (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" {...linkProps}>
                    <Icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{label}</span>
                  </a>
                );
              } else {
                return (
                  <Link key={label} href={href} {...linkProps}>
                    <Icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{label}</span>
                  </Link>
                );
              }
            })}
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-800">
          <div className="text-2xl font-bold text-gray-700 dark:text-gray-300">
            {new Date().getFullYear() - 2012}+
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-800">
          <div className="text-2xl font-bold text-gray-700 dark:text-gray-300">700+</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">WordPress Sites</div>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-800">
          <div className="text-2xl font-bold text-gray-700 dark:text-gray-300">300+</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">WooCommerce Sites</div>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-800">
          <div className="text-2xl font-bold text-gray-700 dark:text-gray-300">100%</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Client Satisfaction</div>
        </div>
      </div>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;
