'use client';

import { Calendar, Building2, Award, Clock, MapPin } from "lucide-react"
import { Navigation } from "../components/nav"

export default function RealEstatePage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navigation />
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="relative mb-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.1)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]" />
          <div className="relative max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-6xl font-bold tracking-tighter">
              Nigerian Real Estate Services
            </h1>
            <p className="text-xl text-foreground/80">
              Coming soon: Professional real estate services in Lagos and Abuja
            </p>
          </div>
        </section>

        {/* Main Content */}
        <div className="relative max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl bg-background/50 border p-8 md:p-12">
            {/* Icon */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex p-3 rounded-full bg-primary/10 text-primary">
                <Building2 className="w-8 h-8" />
              </div>
            </div>
            
            {/* Content */}
            <div className="space-y-12 text-center">
              <div>
                <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
                  I'm currently pursuing my real estate license to help you navigate the dynamic property markets of Lagos and Abuja.
                </p>
              </div>

              {/* Features */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-3 p-6 rounded-lg bg-background/50 border">
                  <Calendar className="w-6 h-6 text-primary mx-auto" />
                  <h3 className="font-semibold">Expected Timeline</h3>
                  <p className="text-sm text-foreground/70">Summer 2025</p>
                </div>
                
                <div className="space-y-3 p-6 rounded-lg bg-background/50 border">
                  <Award className="w-6 h-6 text-primary mx-auto" />
                  <h3 className="font-semibold">Certification</h3>
                  <p className="text-sm text-foreground/70">ESVARBON License</p>
                </div>
                
                <div className="space-y-3 p-6 rounded-lg bg-background/50 border">
                  <MapPin className="w-6 h-6 text-primary mx-auto" />
                  <h3 className="font-semibold">Service Areas</h3>
                  <p className="text-sm text-foreground/70">Lagos & Abuja</p>
                </div>
              </div>

              {/* Future Services */}
              <div>
                <h2 className="text-2xl font-semibold tracking-tighter mb-6">Future Services</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-6 rounded-lg bg-background/50 border text-left">
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <span className="text-primary">✓</span>
                        Residential & Commercial Properties
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-primary">✓</span>
                        Market Analysis & Trends
                      </li>
                    </ul>
                  </div>
                  <div className="p-6 rounded-lg bg-background/50 border text-left">
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <span className="text-primary">✓</span>
                        Investment Opportunities
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-primary">✓</span>
                        Property Development Consulting
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div>
                <p className="text-foreground/70">
                  Stay tuned for updates as I work towards bringing you professional real estate services in Nigeria's most dynamic cities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
