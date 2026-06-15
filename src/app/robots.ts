import { MetadataRoute } from 'next'

// Emit as a static file at build time (required for `output: export`).
export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Unlisted sections — reachable by direct link but kept out of crawlers.
      disallow: ['/games', '/lab'],
    },
    sitemap: 'https://frankdoka.com/sitemap.xml',
  }
}
