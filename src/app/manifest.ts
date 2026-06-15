import { MetadataRoute } from 'next'

// Emit as a static file at build time (required for `output: export`).
export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Frank Doka — Infrastructure Architect',
    short_name: 'Frank Doka',
    description:
      'Infrastructure Architect and Cloud Engineer specializing in Azure, AWS, and automation with Terraform, Python, and PowerShell.',
    start_url: '/',
    // 'browser' (not 'standalone') keeps the site non-installable, so browsers
    // don't show an "install app" prompt. The manifest still supplies the name,
    // theme color, and icons used for tabs/bookmarks.
    display: 'browser',
    background_color: '#0a0a0a',
    theme_color: '#0a0a0a',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icon-192.svg',
        sizes: '192x192',
        type: 'image/svg+xml',
      },
      {
        src: '/icon-512.svg',
        sizes: '512x512',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
    ],
  }
}
