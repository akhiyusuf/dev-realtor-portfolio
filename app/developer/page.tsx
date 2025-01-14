import { Navigation } from '../components/nav';

export default function DeveloperPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navigation />
      <div className="container mx-auto px-4 py-16">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10">
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl">
            Development Projects
          </h1>
          <p className="text-lg text-muted-foreground">
            A showcase of my software development work and technical expertise.
          </p>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Project cards will go here */}
            <div className="rounded-lg border bg-card p-6">
              <h3 className="text-xl font-semibold">Project 1</h3>
              <p className="text-sm text-muted-foreground">Description coming soon</p>
            </div>
            <div className="rounded-lg border bg-card p-6">
              <h3 className="text-xl font-semibold">Project 2</h3>
              <p className="text-sm text-muted-foreground">Description coming soon</p>
            </div>
            <div className="rounded-lg border bg-card p-6">
              <h3 className="text-xl font-semibold">Project 3</h3>
              <p className="text-sm text-muted-foreground">Description coming soon</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
