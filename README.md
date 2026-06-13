# frankdoka.com

Source for my personal portfolio at **[frankdoka.com](https://frankdoka.com/)**.

## Tech stack

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · MDX · Pagefind · Cloudflare Pages

## Features

- MDX blog with syntax highlighting, reading time, table of contents, and tag filtering
- Project pages with SVG architecture diagrams
- Pagefind full-text search with keyboard shortcut (Ctrl/Cmd+K)
- Dark/light theme toggle with localStorage persistence
- Dynamic OG images per page
- RSS 2.0 feed with full content
- PWA with service worker for offline access
- Copy-to-clipboard code blocks
- View Transitions API for smooth navigation
- Zod schema validation for all MDX metadata
- JSON-LD structured data, dynamic sitemap, canonical URLs
- Security headers (CSP, HSTS, X-Frame-Options, Referrer-Policy)
- Skip-to-content link and focus-visible accessibility

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
```

## Testing

```bash
npm test             # Unit and integration tests (Vitest)
npm run test:coverage  # With coverage report
```

## Build

```bash
npm run build        # Static export (out/) + Pagefind index
```

## Project structure

```
src/
  app/               Routes — blog posts, projects, pages
    blog/            MDX blog posts at blog/<slug>/page.mdx
    projects/        MDX project pages at projects/<slug>/page.mdx
    experience/      Work experience detail pages
  components/
    blocks/          Composed UI blocks (article lists, showcases)
    layout/          Page layout (header, footer, navigation, container)
    sections/        Homepage sections (hero, about, featured posts)
  data/              Structured data (experience entries)
  lib/               MDX loader, utilities, hooks
  style/             Tailwind CSS entry point and theme variables
  test/
    unit/            Component unit tests
    integration/     Page-level integration tests
    __mocks__/       Test mocks (next/image, next/link, etc.)
public/
  fonts/             Self-hosted Mona Sans variable font
  img/               Portrait photo, skill icons
  sw.js              Service worker for PWA offline support
```

## Deployment

Cloudflare Pages auto-deploys on push to `main`. Pull requests get preview URLs.

## CI

- **Build workflow** — Runs unit + integration tests and a production build on every PR

## License

See [LICENSE](LICENSE).
