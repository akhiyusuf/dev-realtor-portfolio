import Image from "next/image";
import { Navigation } from './components/nav';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navigation />
      <div className="container mx-auto px-4 py-16">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="flex max-w-[980px] flex-col items-start gap-2">
            <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
              Developer by Day,<br />
              Real Estate Agent by Choice
            </h1>
            <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
              Bridging the gap between technology and real estate. 
              Bringing software expertise and property knowledge together.
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              href="/developer"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              View Development Projects
            </Link>
            <Link
              href="/real-estate"
              className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Browse Properties
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
