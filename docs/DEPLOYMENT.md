# Deployment

The site deploys automatically: **push to `main` → Cloudflare Pages builds →
live at frankdoka.com.** There is no manual deploy step for normal updates.

```
local edit ──► git push origin main ──► Cloudflare Pages build ──► https://frankdoka.com
```

## How a deploy works

1. You push to `main` on GitHub (`FrankDoka/frankdoka.com`).
2. Cloudflare Pages detects the push and runs the build command
   **`npm run build:cf`** (which is just `npm run build` → `next build` +
   Pagefind index).
3. The static output in **`out/`** is published to Cloudflare's edge network.
4. Pull requests get their own **preview URL** before merging.

Build settings live in `wrangler.jsonc` (read by Cloudflare), so you don't set
the output directory in the dashboard:

```jsonc
{
  "name": "frankdoka-com",
  "pages_build_output_dir": "out"
}
```

- **Node version:** pinned by `.nvmrc` (currently `24`). To change it, edit
  `.nvmrc` (and the `NODE_VERSION` env var in the Pages dashboard if one is set).
- **Build command (dashboard):** `npm run build:cf`.

## Everyday updates

```bash
# edit content / code
npm run dev            # preview locally at http://localhost:3000
npm run build          # optional: confirm a clean production build
git add -A
git commit -m "Describe the change"
git push origin main   # auto-deploys
```

Give Cloudflare ~1–2 minutes, then hard-refresh (Ctrl/Cmd+Shift+R) — your
browser and the service worker can hold the previous version briefly.

## Local commands

| Command | What it does |
|---------|--------------|
| `npm run dev` | Dev server with hot reload (`http://localhost:3000`) |
| `npm run build` | Production static export to `out/` + Pagefind index |
| `npm run preview` | Build, then serve `out/` exactly as Cloudflare would (`wrangler pages dev`) |
| `npm run deploy` | Build and deploy straight to Cloudflare from your machine (bypasses git — rarely needed) |
| `npm test` | Vitest unit + integration tests |
| `npm run lint` | ESLint |

## Domain & DNS

- **Canonical domain: `frankdoka.com` (apex).** All metadata, canonical tags,
  sitemap, RSS, and JSON-LD use the apex.
- **`www` → apex redirect** is a Cloudflare **Redirect Rule** (Rules → Overview),
  backed by a proxied `www` DNS record. It 301s `www.frankdoka.com/*` to
  `https://frankdoka.com/*`.
- DNS is managed in Cloudflare. The `frankdoka.com` and `www` records are
  proxied (orange cloud) and point at the Pages project. Mail records
  (`MX`, SPF `TXT`) stay **DNS-only** (grey cloud).

## Headers & caching {#headers}

Because this is a static export, response headers come from **`public/_headers`**
(copied into `out/` at build). That file sets:

- **Security headers** — Content-Security-Policy, HSTS, X-Frame-Options,
  X-Content-Type-Options, Referrer-Policy, Permissions-Policy.
- **OG image content-type** — forces `image/png` on the extensionless
  `opengraph-image` files so social scrapers render the share cards.
- **Immutable caching** — `/_next/static/*` and `/fonts/*` get a one-year
  `Cache-Control` (they're content-hashed, so it's safe).

To change any header, edit `public/_headers` and push — no code change needed.

## First-time setup (reference)

Already done for this site, but for reference / replicating elsewhere:

1. Push the repo to GitHub.
2. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**,
   select the repo.
3. Build command `npm run build:cf`; output dir is read from `wrangler.jsonc`.
4. Add the custom domain (`frankdoka.com`) under the project's **Custom domains**;
   SSL provisions automatically.
5. Add the `www → apex` Redirect Rule (Rules → Overview → "Redirect from WWW to
   root" template).

## Troubleshooting

- **Build fails on Cloudflare but works locally:** check the build log for a
  Zod validation error (a bad `date` or missing field in an MDX file) — those
  intentionally fail the build.
- **Old version still showing:** hard-refresh; the service worker caches the
  last good version. It serves fresh content on the next navigation once online.
- **Search returns nothing for new content:** Pagefind only indexes content
  inside `data-pagefind-body`, and the index is rebuilt each deploy — make sure
  the build actually ran (check the deployment log for the Pagefind step).
