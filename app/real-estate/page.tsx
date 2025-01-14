import { Navigation } from '../components/nav';

export default function RealEstatePage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navigation />
      <div className="container mx-auto px-4 py-16">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10">
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl">
            Featured Properties
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover exceptional properties in prime locations.
          </p>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Property cards will go here */}
            <div className="rounded-lg border bg-card overflow-hidden">
              <div className="aspect-video bg-muted" />
              <div className="p-6">
                <h3 className="text-xl font-semibold">Modern City Apartment</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  3 bed • 2 bath • 1,500 sqft
                </p>
                <p className="text-lg font-semibold mt-4">$599,000</p>
              </div>
            </div>
            
            <div className="rounded-lg border bg-card overflow-hidden">
              <div className="aspect-video bg-muted" />
              <div className="p-6">
                <h3 className="text-xl font-semibold">Suburban Family Home</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  4 bed • 3 bath • 2,200 sqft
                </p>
                <p className="text-lg font-semibold mt-4">$799,000</p>
              </div>
            </div>
            
            <div className="rounded-lg border bg-card overflow-hidden">
              <div className="aspect-video bg-muted" />
              <div className="p-6">
                <h3 className="text-xl font-semibold">Luxury Penthouse</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  2 bed • 2.5 bath • 1,800 sqft
                </p>
                <p className="text-lg font-semibold mt-4">$1,299,000</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
