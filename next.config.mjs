import bundleAnalyzer from '@next/bundle-analyzer'
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare'
import createMDX from '@next/mdx'
import rehypeShiki from '@shikijs/rehype'
import { Parser } from 'acorn'
import jsx from 'acorn-jsx'
import escapeStringRegexp from 'escape-string-regexp'
import * as path from 'path'
import { recmaImportImages } from 'recma-import-images'
import rehypeSlug from 'rehype-slug'
import rehypeUnwrapImages from 'rehype-unwrap-images'
import remarkGfm from 'remark-gfm'
import { remarkRehypeWrap } from 'remark-rehype-wrap'
import { unifiedConditional } from 'unified-conditional'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    viewTransition: true,
    optimizePackageImports: ['@fortawesome/free-brands-svg-icons', '@fortawesome/free-solid-svg-icons'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://static.cloudflareinsights.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self'",
              "connect-src 'self' https://cloudflareinsights.com",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join('; '),
          },
        ],
      },
    ]
  },
}

function remarkMDXLayout(source, metaName) {
  let parser = Parser.extend(jsx())
  let parseOptions = { ecmaVersion: 'latest', sourceType: 'module' }

  return (tree) => {
    let imp = `import _Layout from '${source}'`
    let exp = `export default function Layout(props) {
      return <_Layout {...props} ${metaName}={${metaName}} />
    }`

    tree.children.push(
      {
        type: 'mdxjsEsm',
        value: imp,
        data: { estree: parser.parse(imp, parseOptions) }
      },
      {
        type: 'mdxjsEsm',
        value: exp,
        data: { estree: parser.parse(exp, parseOptions) }
      }
    )
  }
}

const withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })

const withMDX = createMDX({
  extension: /\.mdx$/,
  options: {
    recmaPlugins: [recmaImportImages],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeShiki,
        {
          theme: 'nord'
        }
      ],
      [
        remarkRehypeWrap,
        {
          node: { type: 'mdxJsxFlowElement', name: 'Typography' },
          start: ':root > :not(mdxJsxFlowElement)',
          end: ':root > mdxJsxFlowElement'
        }
      ],
      rehypeUnwrapImages
    ],
    remarkPlugins: [
      remarkGfm,
      [
        unifiedConditional,
        [
          new RegExp(`^${escapeStringRegexp(path.resolve('src/app/blog'))}/*`),
          [[remarkMDXLayout, '@/app/blog/wrapper', 'post']]
        ],
        [
          new RegExp(`^${escapeStringRegexp(path.resolve('src/app/projects'))}/*`),
          [[remarkMDXLayout, '@/app/projects/wrapper', 'project']]
        ]
      ]
    ]
  }
})

async function buildConfig() {
  if (process.env.NODE_ENV === 'development') {
    await initOpenNextCloudflareForDev()
  }

  return withBundleAnalyzer(withMDX(nextConfig))
}

export default buildConfig()
