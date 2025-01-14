import { Navigation } from '../components/nav';

export default function RealEstatePage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navigation />
      <div className="container mx-auto px-4 py-8 md:py-16">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl">
              Featured Properties
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-[750px]">
              Discover exceptional properties in prime locations.
            </p>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Property cards */}
            <article className="group rounded-lg border bg-card overflow-hidden hover:shadow-lg transition-all">
              <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-sm text-white/90">Featured</p>
                </div>
              </div>
              <div className="p-4 md:p-6">
                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                  Modern City Apartment
                </h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="inline-flex items-center text-sm text-muted-foreground">
                    3 bed
                  </span>
                  <span className="inline-flex items-center text-sm text-muted-foreground">
                    •
                  </span>
                  <span className="inline-flex items-center text-sm text-muted-foreground">
                    2 bath
                  </span>
                  <span className="inline-flex items-center text-sm text-muted-foreground">
                    •
                  </span>
                  <span className="inline-flex items-center text-sm text-muted-foreground">
                    1,500 sqft
                  </span>
                </div>
                <p className="mt-4 text-lg font-semibold">$599,000</p>
                <button className="mt-4 w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                  View Details
                </button>
              </div>
            </article>

            <article className="group rounded-lg border bg-card overflow-hidden hover:shadow-lg transition-all">
              <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-sm text-white/90">New Listing</p>
                </div>
              </div>
              <div className="p-4 md:p-6">
                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                  Suburban Family Home
                </h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="inline-flex items-center text-sm text-muted-foreground">
                    4 bed
                  </span>
                  <span className="inline-flex items-center text-sm text-muted-foreground">
                    •
                  </span>
                  <span className="inline-flex items-center text-sm text-muted-foreground">
                    3 bath
                  </span>
                  <span className="inline-flex items-center text-sm text-muted-foreground">
                    •
                  </span>
                  <span className="inline-flex items-center text-sm text-muted-foreground">
                    2,200 sqft
                  </span>
                </div>
                <p className="mt-4 text-lg font-semibold">$799,000</p>
                <button className="mt-4 w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                  View Details
                </button>
              </div>
            </article>

            <article className="group rounded-lg border bg-card overflow-hidden hover:shadow-lg transition-all">
              <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-sm text-white/90">Luxury</p>
                </div>
              </div>
              <div className="p-4 md:p-6">
                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                  Luxury Penthouse
                </h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="inline-flex items-center text-sm text-muted-foreground">
                    2 bed
                  </span>
                  <span className="inline-flex items-center text-sm text-muted-foreground">
                    •
                  </span>
                  <span className="inline-flex items-center text-sm text-muted-foreground">
                    2.5 bath
                  </span>
                  <span className="inline-flex items-center text-sm text-muted-foreground">
                    •
                  </span>
                  <span className="inline-flex items-center text-sm text-muted-foreground">
                    1,800 sqft
                  </span>
                </div>
                <p className="mt-4 text-lg font-semibold">$1,299,000</p>
                <button className="mt-4 w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                  View Details
                </button>
              </div>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}
