import { Navigation } from '../components/nav';

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navigation />
      <div className="container mx-auto px-4 py-16">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10">
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl">
            Get in Touch
          </h1>
          <p className="text-lg text-muted-foreground">
            Whether you're interested in development work or real estate, I'm here to help.
          </p>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border bg-card p-6">
              <h2 className="text-2xl font-semibold mb-4">Development Inquiries</h2>
              <p className="text-muted-foreground mb-4">
                Looking for a developer for your next project? Let's discuss how I can help bring your ideas to life.
              </p>
              <button className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                Schedule a Call
              </button>
            </div>
            
            <div className="rounded-lg border bg-card p-6">
              <h2 className="text-2xl font-semibold mb-4">Real Estate Services</h2>
              <p className="text-muted-foreground mb-4">
                Interested in buying, selling, or investing in property? Let's talk about your real estate goals.
              </p>
              <button className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                Book a Consultation
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
