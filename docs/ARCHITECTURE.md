# Architecture

How the site is built and how the pieces fit together. For day-to-day "how do I
add a post/project" steps, see [ADDING-CONTENT.md](./ADDING-CONTENT.md). For
shipping, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## Tech stack

| Layer | Choice | Notes |
|-------|--------|-------|
| Framework | **Next.js 15** (App Router) | Static HTML export (`output: 'export'`) |
| Language | **TypeScript** | Strict mode |
| Styling | **Tailwind CSS v4** | CSS-first config (`@theme` in `src/style/tailwind.css`) |
| Content | **MDX** | Markdown + JSX, validated with **Zod** at build time |
| Icons | **lucide-react** | Tree-shaken SVG components |
| Search | **Pagefind** | Static index built after `next build` |
| Animation | CSS + `IntersectionObserver` | No animation library |
| Hosting | **Cloudflare Pages** | Static files served from `out/` |

There is **no server runtime**. `next build` produces a folder of plain
HTML/CSS/JS in `out/`, which Cloudflare Pages serves directly.

## Why static export

The whole site is content-driven (MDX + structured data) and needs no
server-side rendering at request time. `output: 'export'` keeps it simple,
fast, and cheap, and it removes a whole class of runtime failures. Two
consequences to keep in mind:

- **No Next.js Image Optimization server.** `images.unoptimized` is set, so
  source images are served as-is — pre-size and compress them yourself
  (use WebP for photos). See [ADDING-CONTENT.md](./ADDING-CONTENT.md#images).
- **No `headers()` from `next.config`.** Response headers come from
  `public/_headers` (a Cloudflare Pages feature). See [DEPLOYMENT.md](./DEPLOYMENT.md#headers).
- **Route handlers and metadata routes must be static.** Anything dynamic
  (`feed.xml`, `robots`, `sitemap`, `manifest`, OG images) is marked
  `export const dynamic = 'force-static'` and prerendered at build time.

## Content types

There are four ways content lives in the site:

| Type | Location | Listed? | How it's edited |
|------|----------|---------|-----------------|
| **Blog post** | `src/app/blog/<slug>/page.mdx` | Yes — nav, RSS, search, sitemap | MDX file |
| **Project** | `src/app/projects/<slug>/page.mdx` | Yes — Projects page, search, sitemap | MDX file + SVG diagram |
| **Game** | `src/app/games/<slug>/page.mdx` | **No — unlisted** | MDX file (project shape) |
| **Experience** | `src/data/experience.ts` | Yes — About/home | TypeScript array |

**Games are intentionally unlisted.** The `/games` "Game Dev Log" is `noindex`
and is excluded from the nav, sitemap, RSS, and on-site search. The pages render
and are reachable by direct link, but search engines and casual visitors won't
stumble onto them. They reuse the **project** metadata shape.

## The MDX pipeline

MDX is wired up in `next.config.mjs` (the `withMDX(...)` block). When you drop a
`page.mdx` file into `blog/`, `projects/`, or `games/`, this chain runs:

1. **Zod validation** — each file's `export const post`/`project` is validated
   against a schema in `src/lib/mdx.ts`. A bad date or missing field **fails the
   build** with a precise error, so broken metadata never ships.
2. **remark-gfm** — GitHub-flavored markdown (tables, task lists, autolinks).
3. **Layout wrapping** — a per-directory plugin wraps the content in the right
   layout: `src/app/blog/wrapper.tsx`, `projects/wrapper.tsx`, or
   `games/wrapper.tsx`. This is what adds the title header, reading time, table
   of contents, tag links, "more posts", etc.
4. **rehype-slug** — generates heading `id`s (powers anchor links + the TOC).
5. **Shiki** — syntax highlighting for code blocks (theme: `nord`).
6. **Image handling** — `recma-import-images` turns relative image paths into
   imports; `rehype-unwrap-images` lifts images out of paragraphs.

The loader (`src/lib/mdx.ts`) discovers files with `fast-glob`, validates them,
and exposes `loadPosts()`, `loadProjects()`, and `loadGames()`. The `href` for
each entry is derived from its folder name.

## Theming (dark / light)

Tailwind v4 inlines `var()` values at build time, so pure CSS-variable theming
doesn't switch at runtime on its own. The site uses a hybrid approach:

- **CSS variables** define every theme token in `src/style/tailwind.css`
  (`:root` for dark, `:root[data-theme="light"]` for light).
- **`ThemeProvider`** (`src/components/ThemeProvider.tsx`) sets `data-theme` on
  `<html>` and applies inline styles to `<body>` and themed containers.
- **No flash of wrong theme** — a tiny inline script in `src/app/layout.tsx`
  reads the saved preference and sets `data-theme` *before* React hydrates.
  React state starts from the server default and reconciles after mount, so
  there's no hydration mismatch.

Components reference tokens like `text-[var(--theme-text-primary)]` and
`bg-[var(--theme-bg-surface)]`.

## Search (Pagefind)

`npm run build` runs `next build` and then `pagefind --site out`, which indexes
the exported HTML into `out/pagefind/`. Only content inside elements marked
`data-pagefind-body` is indexed (so nav/footer chrome is excluded). The search
dialog (Ctrl/Cmd-K) lazy-loads the Pagefind client on first open. The index is
regenerated on every build — there's nothing to maintain by hand.

## SEO & sharing

- **Per-page OG images** are generated at build time by
  `opengraph-image.tsx` files using `next/og`. The blog/project ones use
  `generateStaticParams`, so **new content automatically gets a share card** —
  no manual image work. (Cloudflare serves these via a content-type rule in
  `public/_headers`.)
- **JSON-LD** structured data: `Person` on the homepage, `BlogPosting` on posts,
  `SoftwareSourceCode` on projects (`src/components/StructuredData.tsx`).
- **Sitemap & robots** are generated from the content at build time
  (`src/app/sitemap.ts`, `robots.ts`). Tag pages are `noindex`; games are
  excluded entirely.
- **RSS** feed at `/feed.xml` includes full post content.

## Project structure

```
src/
  app/
    layout.tsx            Root layout, metadata, theme-init script, font preload
    page.tsx              Homepage (hero, about, featured posts, projects)
    blog/<slug>/page.mdx  Blog posts
    blog/wrapper.tsx      Blog post layout (header, TOC, reading time, tags)
    blog/tags/[tag]/      Tag filter pages (noindex)
    projects/<slug>/      Project pages (page.mdx + diagram.svg)
    projects/wrapper.tsx  Project layout (header, diagram, tags)
    games/<slug>/         Unlisted game dev-log pages (project shape)
    experience/[slug]/    Experience detail pages (from src/data/experience.ts)
    feed.xml/route.ts     RSS feed (force-static)
    sitemap.ts, robots.ts, manifest.ts, opengraph-image.tsx
  components/
    blocks/               Composed UI (ArticleList, ShowcaseList, etc.)
    layout/               Header, Footer, Navigation, Container, RootLayout
    sections/             Homepage sections (HeroBanner, AboutMe, Projects, ...)
    *.tsx                 Reusable pieces (Button, CodeBlock, Callout, ...)
  data/experience.ts      Work experience (structured data, not MDX)
  lib/
    mdx.ts                MDX loader + Zod schemas + types
    formatDate.ts, readingTime.ts, usePagefindSearch.ts, usePrefersReducedMotion.ts
  style/
    tailwind.css          Tailwind entry + theme tokens (@theme, CSS variables)
    typography.css, global.css
  test/                   Vitest unit + integration tests + mocks
public/
  _headers                Cloudflare response headers (CSP, caching, OG types)
  fonts/                  Self-hosted Mona Sans variable font
  img/                    Portrait (WebP) + skill icons
  icon-192.svg, icon-512.svg, sw.js, Frank_Doka_Resume.pdf
```

## Testing

Vitest unit + integration tests live in `src/test/`. Run `npm test`. The build
itself is the strongest check — Zod validation + TypeScript + the static export
all run during `npm run build`, so a green build means the content and types are
sound.
