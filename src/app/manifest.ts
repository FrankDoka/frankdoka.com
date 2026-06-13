import { MetadataRoute } from 'next'

// Emit as a static file at build time (required for `output: export`).
export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Frank Doka — Infrastructure Architect',
    short_name: 'Frank Doka',
    description:
      'Infrastructure and Cloud Engineer focused on Azure, AWS, and automation with Terraform, Python, and PowerShell.',
    start_url: '/',
    display: 'standalone',
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
