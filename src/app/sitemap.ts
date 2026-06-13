import fs from 'fs'
import path from 'path'
import { MetadataRoute } from 'next'
import { loadPosts, loadProjects } from '@/lib/mdx'
import { experience } from '@/data/experience'

// Emit as a static file at build time (required for `output: export`).
export const dynamic = 'force-static'

const BASE_URL = 'https://www.frankdoka.com'

function getFileMtime(filePath: string): Date {
  try {
    return fs.statSync(path.join(process.cwd(), filePath)).mtime
  } catch {
    return new Date()
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await loadPosts()
  const projects = await loadProjects()

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: getFileMtime('src/app/page.tsx'), changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE_URL}/blog`, lastModified: getFileMtime('src/app/blog/page.tsx'), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: getFileMtime('src/app/about/page.tsx'), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/projects`, lastModified: getFileMtime('src/app/projects/page.tsx'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/games`, lastModified: getFileMtime('src/app/games/page.tsx'), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/toolbox`, lastModified: getFileMtime('src/app/toolbox/page.tsx'), changeFrequency: 'monthly', priority: 0.5 },
  ]

  const postPages: MetadataRoute.Sitemap = posts.map((post) => {
    const slug = post.href.replace('/blog/', '')
    return {
      url: `${BASE_URL}${post.href}`,
      lastModified: getFileMtime(`src/app/blog/${slug}/page.mdx`),
      changeFrequency: 'yearly',
      priority: 0.6,
    }
  })

  const projectPages: MetadataRoute.Sitemap = projects.map((project) => {
    const slug = project.href.replace('/projects/', '')
    return {
      url: `${BASE_URL}${project.href}`,
      lastModified: getFileMtime(`src/app/projects/${slug}/page.mdx`),
      changeFrequency: 'yearly',
      priority: 0.7,
    }
  })

  const experiencePages: MetadataRoute.Sitemap = experience.map((job) => ({
    url: `${BASE_URL}/experience/${job.slug}`,
    lastModified: getFileMtime('src/data/experience.ts'),
    changeFrequency: 'yearly',
    priority: 0.4,
  }))

  return [...staticPages, ...postPages, ...projectPages, ...experiencePages]
}
