# Hybrid Real Estate + Developer Portfolio

A modern, responsive portfolio website showcasing both real estate and software development expertise. Built with Next.js 14, Tailwind CSS, and shadcn/ui components.

## Features

### Design & UI
- Clean, modern interface with responsive design
- Dynamic theme switching (Day/Night mode) using `next-themes`
- Mobile-first approach with breakpoint-specific optimizations
- Carefully crafted typography and spacing
- Smooth transitions and hover effects

### Navigation
- Responsive navigation with mobile sidebar
- Smart button text adaptation for different screen sizes:
  - < 455px: "Browse Homes" | "See Projects"
  - ≥ 455px: "Browse Properties" | "View Development Projects"
- Custom breakpoints for optimal layout:
  - < 340px: Stacked layout for developer section
  - < 640px: Mobile-optimized spacing and sizing
  - ≥ 640px: Desktop layout with enhanced button styling

### Theme System
- Seamless theme switching between Day and Night modes
- Theme-aware components with proper color transitions
- Persistent theme selection across sessions
- Theme-specific UI optimizations

## Technical Stack

### Core Technologies
- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Theme Management**: next-themes
- **Icons**: Lucide Icons

### Key Dependencies
```json
{
  "next": "^14.0.0",
  "react": "^18.0.0",
  "tailwindcss": "^3.0.0",
  "next-themes": "^0.2.0",
  "lucide-react": "latest"
}
```

## Project Structure

```
dev-realtor-portfolio/
├── app/
│   ├── components/
│   │   ├── nav.tsx          # Navigation component with theme toggle
│   │   └── ui/             # shadcn/ui components
│   ├── layout.tsx          # Root layout with theme provider
│   └── page.tsx           # Main landing page
├── public/                # Static assets
└── styles/               # Global styles and Tailwind config
```

## Development Journey

### UI/UX Improvements
- Implemented responsive text changes for improved mobile readability
- Added underline decoration for primary action buttons
- Optimized button spacing and alignment
- Created smooth theme transitions

### Mobile Optimizations
- Custom breakpoint handling for various screen sizes
- Smart component stacking on smaller screens
- Adjusted typography scaling
- Enhanced touch targets for mobile users

## Setup & Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000)

## Future Enhancements

- Property listing integration
- Development project showcase
- Contact form implementation
- Blog section for real estate and tech insights
- Advanced filtering and search capabilities

## Contributing

Feel free to submit issues and enhancement requests.

## License

MIT License - feel free to use this project as a template for your own portfolio.
