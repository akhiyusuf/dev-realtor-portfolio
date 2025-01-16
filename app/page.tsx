'use client';

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Sun, Moon } from "lucide-react";
import { Navigation } from './components/nav';

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="flex min-h-screen flex-col">
      <Navigation />
      <div className="container mx-auto px-4 py-8 md:py-16">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="flex max-w-[980px] flex-col items-start gap-2">
            <h1 className="text-3xl font-bold tracking-tight sm:text-6xl flex flex-col gap-2 sm:gap-3">
              <div className="flex items-center">
                <span className="inline-flex items-center">
                  <span className="mr-2 sm:mr-3">Agent</span>
                  <span className="mr-1 sm:mr-1.5">by</span>
                </span>
                <div className="relative inline-flex items-center">
                  <button 
                    onClick={() => setTheme('light')}
                    className={`
                      inline-flex items-center gap-1.5 px-2 py-0.5 sm:py-2 rounded-md text-[0.85em]
                      border transition-all duration-200 sm:text-[0.95em]
                      ${theme === 'light' 
                        ? 'border-primary bg-primary/10 text-primary' 
                        : 'border-transparent hover:border-primary/50 hover:bg-primary/5'
                      }
                    `}
                  >
                    <span>Day</span>
                    <Sun className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap items-start max-[340px]:gap-y-1">
                <span className="inline-flex items-center max-[340px]:w-full">
                  <span className="mr-2 sm:mr-3">Developer</span>
                  <span className="mr-1 sm:mr-1.5">by</span>
                </span>
                <div className="relative inline-flex items-center max-[340px]:-ml-2">
                  <button 
                    onClick={() => setTheme('dark')}
                    className={`
                      inline-flex items-center gap-1.5 px-2 py-0.5 sm:py-2 rounded-md text-[0.85em]
                      border transition-all duration-200 sm:text-[0.95em]
                      ${theme === 'dark' 
                        ? 'border-primary bg-primary/10 text-primary' 
                        : 'border-transparent hover:border-primary/50 hover:bg-primary/5'
                      }
                    `}
                  >
                    <span>Night</span>
                    <Moon className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            </h1>
            <p className="max-w-[750px] text-base text-muted-foreground sm:text-xl mt-4">
              Bridging the gap between technology and real estate. Bringing software expertise and property knowledge together.
            </p>
            <div className="mt-6 flex gap-2 sm:gap-3 items-start">
              <Link
                href="/developer"
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <span className="min-[455px]:hidden">See Projects</span>
                <span className="max-[455px]:hidden">View Development Projects</span>
              </Link>
              <Link
                href="/real-estate"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 underline decoration-2 underline-offset-4"
              >
                <span className="min-[455px]:hidden">Browse Homes</span>
                <span className="max-[455px]:hidden">Browse Properties</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Mobile-first feature grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 py-12">
          <div className="p-6 rounded-lg border bg-card">
            <h3 className="text-xl font-semibold mb-2">Development Expertise</h3>
            <p className="text-muted-foreground">
              Full-stack development with modern technologies. Building scalable solutions for web and mobile.
            </p>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <h3 className="text-xl font-semibold mb-2">Real Estate Knowledge</h3>
            <p className="text-muted-foreground">
              Expert guidance in property transactions. Understanding both market trends and client needs.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
