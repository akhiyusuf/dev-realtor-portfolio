'use client';

import ProjectCalculator from "../components/project-calculator";
import { Navigation } from "../components/nav";

export default function DeveloperPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navigation />
      <div className="container mx-auto px-4 py-16 space-y-20">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.1)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]" />
          <div className="relative max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-6xl font-bold tracking-tighter">
              Development Projects
            </h1>
            <p className="text-xl text-foreground/80">
              A showcase of my software development work and technical expertise.
            </p>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((project) => (
            <div 
              key={project}
              className="group relative overflow-hidden rounded-2xl border border-foreground/10 hover:border-foreground/20 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/5 group-hover:to-background/10 transition-all duration-300" />
              <div className="relative p-8 h-[300px] flex flex-col">
                <div className="mb-auto">
                  <h3 className="text-2xl font-bold mb-4">Project {project}</h3>
                  <p className="text-foreground/60">Description coming soon...</p>
                </div>
                <div className="flex justify-between items-center pt-6 border-t border-foreground/10">
                  <span className="text-sm font-medium">View Details</span>
                  <svg 
                    className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Cost Estimator Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.1)_0%,transparent_70%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.1)_0%,transparent_70%)]" />
          <div className="relative max-w-3xl mx-auto text-center mb-12 space-y-4">
            <h2 className="text-4xl font-bold">Project Cost Estimator</h2>
            <p className="text-lg text-foreground/80">
              Get an instant estimate for your next development project. Choose your project type and requirements below.
            </p>
          </div>
          <div className="relative">
            <ProjectCalculator />
          </div>
        </section>
      </div>
    </main>
  );
}
