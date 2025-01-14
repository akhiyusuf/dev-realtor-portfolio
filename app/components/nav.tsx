'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Developer', href: '/developer' },
  { name: 'Real Estate', href: '/real-estate' },
  { name: 'Contact', href: '/contact' },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex lg:flex-1">
        <Link href="/" className="text-xl font-bold">
          Dev+Realtor
        </Link>
      </div>
      <div className="hidden md:flex md:gap-x-6">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`text-sm font-semibold transition-colors hover:text-primary ${
              pathname === item.href
                ? 'text-primary'
                : 'text-muted-foreground'
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
