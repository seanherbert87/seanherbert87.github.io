import React, { useState, useEffect, useCallback, memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Github, Linkedin, Mail, Sun, Moon, Menu, X } from 'lucide-react';
import { SocialLink, Theme } from '../types';

const Header: React.FC = memo(() => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
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
    { href: 'https://github.com/seanherbert87/', icon: Github, label: 'GitHub' },
    { href: 'https://www.linkedin.com/in/seanmherbert/', icon: Linkedin, label: 'LinkedIn' },
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
              Senior PHP & WordPress Developer
            </p>
          </div>
        </div>

        {/* Desktop Navigation & Controls */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map(({ href, icon: Icon, label }) => {
              const isExternal = href.startsWith('http');
              const linkProps = {
                className: "p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg",
                'aria-label': label
              };

              if (isExternal) {
                return (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    {...linkProps}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              } else {
                return (
                  <Link
                    key={label}
                    href={href}
                    {...linkProps}
                  >
                    <Icon className="w-5 h-5" />
                  </Link>
                );
              }
            })}
          </div>

          {/* Dark Mode Toggle */}
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
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    {...linkProps}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{label}</span>
                  </a>
                );
              } else {
                return (
                  <Link
                    key={label}
                    href={href}
                    {...linkProps}
                  >
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
