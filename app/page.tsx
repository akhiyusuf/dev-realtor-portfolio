import { Navigation } from './components/nav';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navigation />
      <div className="container mx-auto px-4 py-8 md:py-16">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="flex max-w-[980px] flex-col items-start gap-2">
            <h1 className="text-4xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
              Developer by Day,{' '}
              <span className="block text-3xl md:text-5xl text-muted-foreground mt-2">
                Real Estate Agent by Choice
              </span>
            </h1>
            <p className="max-w-[750px] text-base text-muted-foreground sm:text-xl mt-4">
              Bridging the gap between technology and real estate. 
              Bringing software expertise and property knowledge together.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link
              href="/developer"
              className="w-full sm:w-auto text-center inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              View Development Projects
            </Link>
            <Link
              href="/real-estate"
              className="w-full sm:w-auto text-center inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Browse Properties
            </Link>
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
