import bundleAnalyzer from '@next/bundle-analyzer'
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
  // Static HTML export — the whole site is content-driven (MDX) and needs no
  // server runtime. Cloudflare Pages serves the `out/` directory directly.
  // Security headers live in `public/_headers` (the next.config `headers()`
  // hook does not run for static exports).
  output: 'export',
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    // No Image Optimization server in a static export, so serve images as-is.
    unoptimized: true,
  },
  experimental: {
    viewTransition: true,
    optimizePackageImports: ['lucide-react'],
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

export default withBundleAnalyzer(withMDX(nextConfig))
