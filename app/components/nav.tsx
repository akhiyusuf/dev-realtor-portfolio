'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Developer', href: '/developer' },
  { name: 'Real Estate', href: '/real-estate' },
  { name: 'Contact', href: '/contact' },
];

export function Navigation() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest('#mobile-menu') && !target.closest('#menu-button')) {
        setIsOpen(false);
      }
    };

    // Close menu when pressing escape
    const handleEscape = (event: KeyboardEvent) => {
      if (isOpen && event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <>
      <nav className="sticky top-0 z-50 w-full flex items-center justify-between p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="flex lg:flex-1">
          <Link href="/" className="text-xl font-bold">
            Agent + Dev
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:gap-x-6 items-center">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-semibold transition-colors hover:text-primary ${
                mounted && pathname === item.href
                  ? 'text-primary'
                  : 'text-muted-foreground'
              }`}
            >
              {item.name}
            </Link>
          ))}
          
          {/* Desktop Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="ml-4 p-2 rounded-md hover:bg-accent"
            aria-label="Toggle theme"
          >
            {mounted && (
              theme === 'dark' ? (
                <Sun className="h-[1.2rem] w-[1.2rem]" />
              ) : (
                <Moon className="h-[1.2rem] w-[1.2rem]" />
              )
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Fixed Controls */}
      <div className="fixed top-3 right-4 flex items-center gap-2 z-[100] md:hidden">
        {/* Mobile Theme Toggle */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-md hover:bg-accent text-foreground"
          aria-label="Toggle theme"
        >
          {mounted && (
            theme === 'dark' ? (
              <Sun className="h-[1.2rem] w-[1.2rem]" />
            ) : (
              <Moon className="h-[1.2rem] w-[1.2rem]" />
            )
          )}
        </button>

        {/* Hamburger/Close Button */}
        <button
          id="menu-button"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className="w-10 h-10 flex justify-center items-center text-foreground transition-colors duration-200"
          aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
        >
          <div className="relative flex overflow-hidden items-center justify-center w-8 h-8">
            <div className="flex flex-col justify-between w-6 h-5 transform transition-all duration-300 origin-center">
              <div className={`bg-current h-[2px] w-6 transform transition-all duration-300 origin-left ${isOpen ? 'rotate-45 translate-x-[2px] translate-y-[8px]' : ''}`} />
              <div className={`bg-current h-[2px] w-6 transform transition-all duration-300 ${isOpen ? 'opacity-0 translate-x-4' : ''}`} />
              <div className={`bg-current h-[2px] w-6 transform transition-all duration-300 origin-left ${isOpen ? '-rotate-45 translate-x-[2px] -translate-y-[8px]' : ''}`} />
            </div>
          </div>
        </button>
      </div>

      {/* Mobile Menu Sidebar */}
      <div
        id="mobile-menu"
        className={`fixed top-0 right-0 z-[90] h-full w-[250px] transform transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      >
        {/* Sidebar Background with Theme Support */}
        <div className="absolute inset-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-l border-border shadow-xl" />
        
        {/* Sidebar Content */}
        <div className="relative h-full flex flex-col p-6">
          <div className="space-y-3 mt-14">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block py-2 text-base font-medium transition-colors ${
                  mounted && pathname === item.href
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-background/80 backdrop-blur-sm z-[80] transform transition-all duration-300 md:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />
    </>
  );
}
