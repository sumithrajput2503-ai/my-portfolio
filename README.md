# Sumith Kumar Singh P - Portfolio

A premium personal portfolio website built with React 19, Vite, TypeScript, TailwindCSS, Framer Motion, GSAP, and React Three Fiber.

## Tech Stack

- **React 19** + **Vite** + **TypeScript**
- **TailwindCSS v4** for styling
- **Framer Motion** & **GSAP** for animations
- **React Three Fiber** for 3D network visualization
- **Lucide Icons** + **Shadcn UI** components
- **React Helmet Async** for SEO

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build & Deploy

```bash
npm run build
npm run preview
```

Deploy to Vercel:

```bash
npx vercel
```

Or connect your GitHub repository to [Vercel](https://vercel.com) for automatic deployments.

## Customization

- Update content in `src/data/portfolio.ts`
- Replace `/public/resume.pdf` with your actual resume
- Update SEO URLs in `src/components/layout/SEO.tsx` and `public/sitemap.xml`

## Project Structure

```
src/
├── components/
│   ├── common/       # Reusable UI components
│   ├── effects/      # Visual effects (3D, particles, cursor)
│   ├── layout/       # Header, Footer, SEO
│   ├── sections/     # Page sections
│   └── ui/           # Shadcn UI primitives
├── data/             # Portfolio content
├── hooks/            # Custom React hooks
└── lib/              # Utilities
```

## License

MIT
