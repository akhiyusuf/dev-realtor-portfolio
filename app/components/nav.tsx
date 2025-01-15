'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

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

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  return (
    <>
      <nav className="sticky top-0 z-50 w-full flex items-center justify-between p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="flex lg:flex-1">
          <Link href="/" className="text-xl font-bold">
            RE Agent + Dev
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:gap-x-6">
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
        </div>

        {/* Mobile Menu Button */}
        <button
          id="menu-button"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className="flex md:hidden flex-col justify-center items-center w-8 h-8 border-0 bg-transparent gap-1.5"
          aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
        >
          <span
            className={`block h-0.5 w-6 bg-current transform transition duration-200 ease-in-out ${
              isOpen ? 'rotate-45 translate-y-2' : 'rotate-0'
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-current transition duration-200 ease-in-out ${
              isOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-current transform transition duration-200 ease-in-out ${
              isOpen ? '-rotate-45 -translate-y-2' : 'rotate-0'
            }`}
          />
        </button>
      </nav>

      {/* Mobile Menu Sidebar */}
      <div
        id="mobile-menu"
        className={`fixed top-0 right-0 z-50 h-full w-[250px] bg-white transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden shadow-lg`}
      >
        <div className="flex flex-col p-4">
          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="self-end p-2 mb-4"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
          
          {/* Navigation links */}
          <div className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block w-full px-4 py-3 text-base font-medium rounded-md transition-colors ${
                  mounted && pathname === item.href
                    ? 'bg-primary/10 text-primary'
                    : 'text-gray-900 hover:bg-gray-100'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
