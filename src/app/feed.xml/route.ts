import { loadPosts } from '@/lib/mdx'
import fs from 'fs'
import path from 'path'

// Emit feed.xml as a static file at build time (required for `output: export`).
export const dynamic = 'force-static'

const SITE_URL = 'https://www.frankdoka.com'

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function getPostContent(slug: string): string {
  const filePath = path.join(process.cwd(), 'src/app/blog', slug, 'page.mdx')
  try {
    const raw = fs.readFileSync(filePath, 'utf-8')
    return raw
      .replace(/^import\s.+$/gm, '')
      .replace(/^export\s.+$/gm, '')
      .replace(/\{\/\*.*?\*\/\}/gs, '')
      .replace(/```[\s\S]*?```/g, (match) => match)
      .trim()
  } catch {
    return ''
  }
}

export async function GET() {
  const posts = await loadPosts()

  const items = posts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((post) => {
      const slug = post.href.replace('/blog/', '')
      const content = getPostContent(slug)
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}${post.href}</link>
      <guid isPermaLink="true">${SITE_URL}${post.href}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.description)}</description>${
        content ? `\n      <content:encoded><![CDATA[${content}]]></content:encoded>` : ''
      }${
        post.tags?.length
          ? post.tags.map((tag) => `\n      <category>${escapeXml(tag)}</category>`).join('')
          : ''
      }
    </item>`
    })
    .join('\n')

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Frank Doka — Build Logs &amp; Deep Dives</title>
    <link>${SITE_URL}/blog</link>
    <description>Project deep-dives, build logs, and lessons learned from cloud infrastructure and DevOps work.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
