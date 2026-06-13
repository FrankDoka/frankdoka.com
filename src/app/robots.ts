import { MetadataRoute } from 'next'

// Emit as a static file at build time (required for `output: export`).
export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://www.frankdoka.com/sitemap.xml',
  }
}
