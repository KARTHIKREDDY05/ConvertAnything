# ConvertAnything - SEO-First Unit Conversion Website

A high-performance, SEO-optimized unit conversion website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **12 Conversion Categories**: Length, Weight, Temperature, Area, Volume, Speed, Time, Digital Storage, Pressure, Energy, Power, and Angles
- **Generic Conversion Engine**: Converts between any units in the same category
- **Dynamic URL Generation**: Supports both generic converter pages and specific value conversions
- **Automatic SEO Optimization**: Dynamic metadata, automatic sitemap, robots.txt, optimized linking
- **Fast Performance**: Server-side rendering with minimal JavaScript
- **Responsive Design**: Mobile-first, works on all devices
- **No Authentication Required**: Open to all users
- **Conversion Tables**: Common value conversions at a glance
- **Related Conversions**: Automatic suggestions for better UX and SEO

## Getting Started

### Prerequisites
- Node.js 18+
- npm, yarn, or pnpm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### Build

```bash
npm run build
npm start
```

## URL Patterns

- `/` - Homepage
- `/convert/kg-to-pound` - Convert 1 kg to pounds
- `/convert/100-kg-to-pound` - Convert 100 kg to pounds
- `/category/length` - All length conversions
- `/sitemap.xml` - Dynamic XML sitemap

## Conversion Categories

Length, Weight, Temperature, Area, Volume, Speed, Time, Digital Storage, Pressure, Energy, Power, Angles

## Project Structure

```
src/
├── app/              # Next.js App Router
├── components/       # React components
├── lib/              # Conversion logic and utilities
└── types/            # TypeScript interfaces
```

## SEO Features

- Dynamic metadata for all pages
- Automatic sitemap generation (~100,000+ URLs)
- Internal linking system
- Responsive design
- Fast performance optimization
- Open Graph tags
- Robots.txt configuration

## Deploy

Works on any platform supporting Node.js 18+. Recommended: Vercel

