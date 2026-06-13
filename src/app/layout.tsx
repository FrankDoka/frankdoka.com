import { RootLayout } from '@/components/layout/RootLayout'
import { ThemeProvider } from '@/components/ThemeProvider'
import '@/style/tailwind.css'
import { type Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
  metadataBase: new URL('https://frankdoka.com'),
  title: {
    template: '%s | Frank Doka',
    default: 'Frank Doka | Infrastructure Architect',
  },
  creator: 'Frank Doka',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
  openGraph: {
    siteName: 'Frank Doka',
    type: 'website',
    url: 'https://frankdoka.com',
  },
  twitter: {
    card: 'summary_large_image',
  },
  keywords: [
    'Frank Doka',
    'Infrastructure Architect',
    'Cloud Engineer',
    'DevOps',
    'AWS',
    'Azure',
    'Terraform',
    'Kubernetes',
    'Docker',
    'CI/CD',
    'SCCM',
    'Intune',
    'Python',
    'Infrastructure as Code',
  ],
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased" data-theme="dark" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/fonts/Mona-Sans.var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://static.cloudflareinsights.com" />
        <link rel="preconnect" href="https://static.cloudflareinsights.com" crossOrigin="anonymous" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var l=t==='light'||(!t&&window.matchMedia('(prefers-color-scheme:light)').matches);if(l){document.documentElement.setAttribute('data-theme','light');document.addEventListener('DOMContentLoaded',function(){document.body.style.backgroundColor='#f8f8f8';document.body.style.color='#1a1a1a'})}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col text-base">
        <ThemeProvider>
          <RootLayout>{children}</RootLayout>
        </ThemeProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `if('serviceWorker' in navigator){window.addEventListener('load',function(){navigator.serviceWorker.register('/sw.js')})}`,
          }}
        />
        {process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN && (
          <Script
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={`{"token":"${process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN}"}`}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  )
}
