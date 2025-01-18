'use client';

import { useState, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { Combobox } from './ui/combobox';

interface ProjectType {
  name: string;
  basePrice: number;
  features: {
    basic: string[];
    recommended: string[];
    premium: string[];
  };
}

const projectTypes: Record<string, ProjectType> = {
  website: {
    name: 'Website',
    basePrice: 2500,
    features: {
      basic: [
        'Responsive Design',
        'Up to 5 Pages',
        'Contact Form',
        'Basic SEO',
        'Social Media Integration'
      ],
      recommended: [
        'Everything in Basic',
        'Custom Animations',
        'Blog Integration',
        'Newsletter Signup',
        'Advanced SEO',
        'Analytics Integration'
      ],
      premium: [
        'Everything in Recommended',
        'Custom CMS',
        'Multi-language Support',
        'Advanced Analytics',
        'Performance Optimization',
        'Security Hardening'
      ]
    }
  },
  webApplication: {
    name: 'Web Application',
    basePrice: 5000,
    features: {
      basic: [
        'User Authentication',
        'Basic CRUD Operations',
        'Responsive Design',
        'Basic API Integration',
        'Data Storage'
      ],
      recommended: [
        'Everything in Basic',
        'Advanced User Roles',
        'Real-time Updates',
        'File Upload',
        'Search Functionality',
        'API Documentation'
      ],
      premium: [
        'Everything in Recommended',
        'Third-party Integrations',
        'Advanced Analytics',
        'Custom Workflows',
        'Automated Testing',
        'Performance Monitoring'
      ]
    }
  },
  mobileApplication: {
    name: 'Mobile Application',
    basePrice: 7500,
    features: {
      basic: [
        'Native iOS/Android',
        'User Authentication',
        'Basic CRUD Operations',
        'Push Notifications',
        'Offline Support'
      ],
      recommended: [
        'Everything in Basic',
        'Social Login',
        'In-app Purchases',
        'Analytics Integration',
        'Custom UI Components',
        'Advanced State Management'
      ],
      premium: [
        'Everything in Recommended',
        'Real-time Features',
        'AR/VR Integration',
        'Advanced Security',
        'CI/CD Pipeline',
        'Cross-platform Support'
      ]
    }
  },
  ecommerce: {
    name: 'E-commerce',
    basePrice: 4000,
    features: {
      basic: [
        'Product Catalog',
        'Shopping Cart',
        'Secure Checkout',
        'Order Management',
        'Basic Analytics'
      ],
      recommended: [
        'Everything in Basic',
        'Product Reviews',
        'Wishlist',
        'Multiple Payment Gateways',
        'Inventory Management',
        'Advanced Search'
      ],
      premium: [
        'Everything in Recommended',
        'Multi-vendor Support',
        'AI Product Recommendations',
        'Advanced Analytics',
        'Loyalty Program',
        'Multi-currency Support'
      ]
    }
  }
};

const timelineOptions = [
  { value: 'rush', label: 'Rush (1-2 weeks, 1.5x)' },
  { value: 'standard', label: 'Standard (2-4 weeks, 1.3x)' },
  { value: 'extended', label: 'Extended (1-2 months, 1.0x)' }
];

const complexityOptions = [
  { value: 'basic', label: 'Basic (1.0x)' },
  { value: 'recommended', label: 'Recommended (1.5x)' },
  { value: 'premium', label: 'Premium (2.0x)' }
];

const pagesOptions = [
  { value: '1-5', label: '1-5 pages/screens (1.0x)' },
  { value: '6-10', label: '6-10 pages/screens (1.4x)' },
  { value: '11-20', label: '11-20 pages/screens (1.8x)' },
  { value: '20+', label: '20+ pages/screens (2.2x)' }
];

const revisionOptions = [
  { value: 'basic', label: 'Basic (5 revisions, 1.0x)' },
  { value: 'recommended', label: 'Recommended (10 revisions, 1.5x)' },
  { value: 'premium', label: 'Premium (Unlimited revisions, 2.0x)' }
];

const projectTypeOptions = Object.entries(projectTypes).map(([value, { name }]) => ({
  value,
  label: name
}));

export default function ProjectCalculator() {
  const [projectType, setProjectType] = useState('website');
  const [pages, setPages] = useState('1-5');
  const [timeline, setTimeline] = useState('extended');
  const [revisions, setRevisions] = useState('basic');
  const [complexity, setComplexity] = useState('basic');
  const [estimatedCost, setEstimatedCost] = useState(0);
  
  const springConfig = { 
    stiffness: 300,  
    damping: 20,     
    mass: 0.2,       
    duration: 600   
  };
  const count = useSpring(0, springConfig);
  const rounded = useTransform(count, latest => Math.round(latest));
  const formatted = useTransform(rounded, latest => latest.toLocaleString());

  const getMultiplier = (option: string, type: string) => {
    const multipliers = {
      pages: {
        '1-5': 1.0,
        '6-10': 1.4,
        '11-20': 1.8,
        '20+': 2.2
      },
      timeline: {
        rush: 1.5,
        standard: 1.3,
        extended: 1.0
      },
      revisions: {
        basic: 1.0,
        recommended: 1.5,
        premium: 2.0
      },
      complexity: {
        basic: 1.0,
        recommended: 1.5,
        premium: 2.0
      }
    };
    return multipliers[type as keyof typeof multipliers][option as keyof typeof multipliers[keyof typeof multipliers]] || 1;
  };

  useEffect(() => {
    const basePrice = projectTypes[projectType].basePrice;
    const pagesMultiplier = getMultiplier(pages, 'pages');
    const timelineMultiplier = getMultiplier(timeline, 'timeline');
    const revisionsMultiplier = getMultiplier(revisions, 'revisions');
    const complexityMultiplier = getMultiplier(complexity, 'complexity');

    const calculatedCost = basePrice * pagesMultiplier * timelineMultiplier * revisionsMultiplier * complexityMultiplier;
    const finalCost = Math.round(calculatedCost);
    setEstimatedCost(finalCost);
    
    // Animate the counter
    count.set(finalCost);
  }, [projectType, pages, timeline, revisions, complexity]);

  return (
    <div className="w-full max-w-4xl mx-auto rounded-xl bg-background p-6 shadow-lg border">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          Project Cost Calculator
        </h2>
        <span className="text-sm text-foreground">All prices in USD</span>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-4">
          <Combobox
            label="Project Type"
            value={projectType}
            onChange={setProjectType}
            options={projectTypeOptions}
          />
          <Combobox
            label="Timeline"
            value={timeline}
            onChange={setTimeline}
            options={timelineOptions}
          />
          <Combobox
            label="Complexity Level"
            value={complexity}
            onChange={setComplexity}
            options={complexityOptions}
          />
        </div>
        <div className="space-y-4">
          <Combobox
            label="Pages/Screens"
            value={pages}
            onChange={setPages}
            options={pagesOptions}
          />
          <Combobox
            label="Revision Package"
            value={revisions}
            onChange={setRevisions}
            options={revisionOptions}
          />
          <div className="bg-foreground dark:bg-background rounded-lg p-4">
            <div className="text-sm text-background dark:text-foreground font-medium mb-1">Estimated Cost</div>
            <motion.div 
              className="text-3xl font-bold text-background dark:text-foreground"
            >
              <span>$</span>
              <motion.span>
                {formatted}
              </motion.span>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-muted/30 backdrop-blur-sm rounded-xl p-3">
          <div className="flex items-center justify-center space-x-2 text-sm font-mono">
            <motion.div 
              className="flex items-center bg-background/50 px-2 py-1 rounded-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-muted-foreground font-medium">Base</span>
              <span className="ml-1.5 text-foreground font-bold">${projectTypes[projectType].basePrice.toLocaleString()}</span>
            </motion.div>
            <span className="text-muted-foreground font-medium">×</span>
            <motion.div 
              className="flex items-center bg-background/50 px-2 py-1 rounded-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <span className="text-muted-foreground font-medium">Screens</span>
              <span className="ml-1.5 text-foreground font-bold">{getMultiplier(pages, 'pages')}x</span>
            </motion.div>
            <span className="text-muted-foreground font-medium">×</span>
            <motion.div 
              className="flex items-center bg-background/50 px-2 py-1 rounded-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <span className="text-muted-foreground font-medium">Timeline</span>
              <span className="ml-1.5 text-foreground font-bold">{getMultiplier(timeline, 'timeline')}x</span>
            </motion.div>
            <span className="text-muted-foreground font-medium">×</span>
            <motion.div 
              className="flex items-center bg-background/50 px-2 py-1 rounded-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <span className="text-muted-foreground font-medium">Revisions</span>
              <span className="ml-1.5 text-foreground font-bold">{getMultiplier(revisions, 'revisions')}x</span>
            </motion.div>
            <span className="text-muted-foreground font-medium">×</span>
            <motion.div 
              className="flex items-center bg-background/50 px-2 py-1 rounded-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <span className="text-muted-foreground font-medium">Complexity</span>
              <span className="ml-1.5 text-foreground font-bold">{getMultiplier(complexity, 'complexity')}x</span>
            </motion.div>
            <span className="text-muted-foreground font-medium">=</span>
            <motion.div 
              className="flex items-center bg-foreground/10 px-2 py-1 rounded-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <span className="text-foreground font-extrabold">${estimatedCost.toLocaleString()}</span>
            </motion.div>
          </div>
        </div>
        <div className="border-t pt-8">
          <h3 className="text-lg font-semibold mb-6 text-foreground">Features Included</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {['basic', 'recommended', 'premium'].map((tier) => (
              <div 
                key={tier} 
                onClick={() => setComplexity(tier)}
                className={`relative rounded-xl overflow-hidden cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                  tier === complexity 
                    ? 'border-2 border-foreground bg-foreground dark:bg-background' 
                    : 'border border-border hover:border-foreground/50 hover:shadow-lg'
                }`}
              >
                <div className="p-5">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className={`font-semibold capitalize ${
                      tier === complexity ? 'text-background dark:text-foreground' : 'text-foreground'
                    }`}>{tier}</h4>
                    {tier === complexity && (
                      <span className="text-sm px-2 py-1 rounded-full bg-background dark:bg-foreground text-foreground dark:text-background font-medium">
                        Selected
                      </span>
                    )}
                  </div>
                  <ul className="space-y-3">
                    {projectTypes[projectType].features[tier as keyof typeof projectTypes[typeof projectType]['features']].map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <svg 
                          className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                            tier === complexity ? 'text-background dark:text-foreground' : 'text-foreground'
                          }`}
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className={
                          tier === complexity ? 'text-background dark:text-foreground' : 'text-foreground'
                        }>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                {tier === complexity && (
                  <div className="px-5 py-3 border-t border-background/20 dark:border-foreground/20">
                    <p className="text-sm text-background dark:text-foreground text-center font-medium">
                      Current Selection
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <button className="text-sm text-foreground hover:underline font-medium transition-colors">
          Need a custom quote? Contact me
        </button>
      </div>
    </div>
  );
}
