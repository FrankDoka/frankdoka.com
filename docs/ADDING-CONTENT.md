# Adding & updating content

Everything on the site is either an **MDX file** (blog posts, projects, games)
or a **TypeScript entry** (experience). You add content by dropping in a file
and pushing — no CMS, no database. The build validates everything, so if a field
is wrong the build fails with a clear message instead of shipping broken.

Workflow for any change:

```bash
npm run dev          # preview at http://localhost:3000 while you edit
# ...make changes...
npm run build        # optional: confirm it builds clean before pushing
git add -A && git commit -m "Add post: <title>" && git push origin main
```

The push auto-deploys (see [DEPLOYMENT.md](./DEPLOYMENT.md)).

---

## Add a blog post

1. Create a folder named after the URL slug and a `page.mdx` inside it:
   `src/app/blog/my-new-post/page.mdx` → lives at `/blog/my-new-post`.

2. Start the file with the metadata block, then write the post in Markdown:

```mdx
import { BlogPost } from '@/lib/mdx.ts'
import { Cloud } from 'lucide-react'

export const post = {
  ...BlogPost,                 // adds author info (name + photo)
  type: 'Article',             // 'Article' | 'Tutorial' | 'Announcement'
  icon: Cloud,                 // any icon from lucide-react (see lucide.dev)
  date: '2026-02-14',          // MUST be YYYY-MM-DD
  title: 'My New Post',
  description: 'One-sentence summary used on cards and in search/SEO.',
  tags: ['AWS', 'Automation'], // optional
}

export const metadata = {
  title: post.title,
  description: post.description,
}

# My New Post

Write the body in Markdown. Tables, code fences, lists, links all work.
```

That's it. The post automatically gets: a header with date + reading time, a
table of contents (if it has 3+ headings), an icon hero banner, tag links, a
share/OG image, an RSS entry, a search index entry, and a sitemap entry.

**Icons:** browse [lucide.dev](https://lucide.dev), import the PascalCase name
(e.g. `import { Server } from 'lucide-react'`), and set `icon: Server`.

**Tags** are free text — just add them to `tags`. Tag filter pages
(`/blog/tags/<tag>`) are generated automatically; nothing to register.

---

## Add a project

Projects have one extra ingredient: an **architecture diagram** (an SVG).

1. Create `src/app/projects/my-project/page.mdx` and put the diagram SVG in the
   same folder (e.g. `my-project.svg`).

2. Metadata block (note this is `project`, not `post`):

```mdx
import image from './my-project.svg'

export const project = {
  order: 0,                    // sort order (lower = first)
  title: 'My Project',
  description: 'One-sentence summary for cards and SEO.',
  abstract: (
    <p>A short paragraph (JSX allowed) shown on the project card and intro.</p>
  ),
  startDate: '2025-01-01',     // YYYY-MM-DD
  date: '2026-02-14',          // YYYY-MM-DD (last updated / completed)
  image: image,                // the imported diagram
  href: '/projects/my-project',
  status: 'Active',            // free text, e.g. 'Active' | 'Completed'
  type: 'Cloud / Serverless',  // free text category
  tags: ['AWS', 'Terraform'],  // optional
  repo: 'https://github.com/FrankDoka/my-repo',     // optional
  website: 'https://example.com',                   // optional
}

export const metadata = {
  title: project.title,
  description: project.description,
}

## Overview

Project write-up in Markdown.
```

The diagrams are hand-built SVGs (≈900×500, dark background, teal/orange
accents) so they stay crisp and tiny. Copy an existing one in
`src/app/projects/*/` as a starting template.

---

## Add a game (unlisted dev-log)

Games live at `src/app/games/<slug>/page.mdx` and use the **same metadata shape
as a project** (`export const project = { ... }`). The difference is purely
visibility: the `/games` section is `noindex` and is **not** in the nav,
sitemap, RSS, or on-site search. Pages render and are reachable by direct link
only. Use this for side-projects you want to share with a link but keep out of
your professional portfolio and search engines.

Put screenshots/cover art in the game's folder and import them like any image.

---

## Edit work experience

Experience is structured data, not MDX. Edit the array in
`src/data/experience.ts`:

```ts
export const experience: Job[] = [
  {
    slug: 'company-name',        // URL: /experience/company-name
    org: 'Company Name',
    period: 'Mar 2024 – Present',
    role: 'Infrastructure Architect',
    location: 'New York, NY',
    description: 'One-paragraph summary (shown on the About page).',
    techStack: ['Azure', 'Terraform', 'Intune'],
    cardHighlights: [           // 2–3 short bullets for the homepage card
      'Short highlight one.',
      'Short highlight two.',
    ],
    highlights: [               // full bullets for the detail page
      'Detailed accomplishment one.',
      'Detailed accomplishment two.',
    ],
  },
  // ...add or reorder entries here
]
```

The card grid, the `/experience/<slug>` detail page, and the sitemap all update
automatically from this array.

---

## Images

Because the site is a static export, there's **no image optimizer at runtime** —
size and compress images before adding them.

- **Diagrams / illustrations:** SVG. Co-locate them with the project/game and
  import relatively (`import image from './diagram.svg'`).
- **Photos:** use **WebP**, sized roughly to how they're displayed. Example —
  the portrait is a 300px WebP at ~7 KB. To convert:
  ```bash
  npx sharp-cli -i input.png -o output.webp -f webp -q 82
  # or any tool that outputs WebP
  ```
  Put photos in `public/img/` (or co-locate) and import them statically — a
  static import gives you an automatic blurred placeholder while the image loads.

### Inline images inside an MDX post

- **A diagram you want shown in full (uncropped):** use the `Figure` component.
  ```mdx
  import diagram from '../../projects/my-project/my-project.svg'

  <Figure src={diagram} alt="Describe the diagram for screen readers." caption="Optional caption." />
  ```
- **A regular photo:** standard Markdown image — it renders as a 16:10 card
  (cropped to fill), good for screenshots:
  ```mdx
  ![Alt text](./screenshot.webp)
  ```

Always write meaningful `alt` text — it's used by screen readers and feeds SEO.

---

## Add a brand-new top-level page

For something that isn't a post/project/game (e.g. a "Uses" page):

1. Create `src/app/uses/page.tsx` with exported `metadata` and a default
   component (copy `src/app/toolbox/page.tsx` as a template — it shows the
   `PageIntro` + `Container` pattern).
2. Add it to the nav in `src/components/layout/Navigation.tsx` and the footer
   site map in `src/components/layout/Footer.tsx`.
3. If it should be indexed, it'll appear in search automatically (wrap content
   in `data-pagefind-body`); add it to `src/app/sitemap.ts` for the sitemap.

---

## Common gotchas

- **Dates must be `YYYY-MM-DD`.** A wrong format fails the build (by design).
- **`post` vs `project`.** Blog files export `post`; projects and games export
  `project`. Mismatched names fail validation.
- **Run `npm run build` before pushing** if you want to catch a metadata typo
  locally instead of in the Cloudflare build log.
- **New content is picked up automatically** — the loaders glob the folders, so
  there's no index/registry to update.
