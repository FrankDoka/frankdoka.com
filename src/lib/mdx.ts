import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import FrankPhoto from '@public/img/frank-portrait.png'
import glob from 'fast-glob'
import { StaticImageData, type ImageProps } from 'next/image'
import { z } from 'zod'

// Zod schemas for build-time validation of MDX metadata
const postSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD'),
  type: z.enum(['Article', 'Tutorial', 'Announcement']),
  icon: z.any(),
  tags: z.array(z.string()).optional(),
  author: z.object({ name: z.string(), image: z.any() }).optional(),
})

const projectSchema = z.object({
  order: z.number().int().min(0),
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD'),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  abstract: z.any(),
  image: z.any(),
  status: z.string().min(1),
  type: z.string().min(1),
  tags: z.array(z.string()).optional(),
  href: z.string().optional(),
  repo: z.string().url().optional(),
  website: z.string().url().optional(),
  support: z.string().optional(),
})

async function loadEntries<T extends MDX>(
  directory: string,
  metaName: string,
  schema: z.ZodType
): Promise<Array<MDXEntry<T>>> {
  return (
    await Promise.all(
      (await glob('**/page.mdx', { cwd: `src/app/${directory}` })).map(async (filename) => {
        const raw = (await import(`../app/${directory}/${filename}`))[metaName]
        const result = schema.safeParse(raw)
        if (!result.success) {
          const issues = result.error.issues.map((i) => `  ${i.path.join('.')}: ${i.message}`).join('\n')
          throw new Error(`Invalid ${metaName} metadata in ${directory}/${filename}:\n${issues}`)
        }
        const metadata = raw as T
        return {
          ...metadata,
          metadata,
          href: `/${directory}/${filename.replace(/\/page\.mdx$/, '')}`
        }
      })
    )
  ).sort((a, b) => b.date.localeCompare(a.date))
}

type ImagePropsWithOptionalAlt = Omit<ImageProps, 'alt'> & { alt?: string }

export type MDXEntry<T extends MDX> = T & {
  metadata: T
}

interface MDX {
  title: string
  description: string
  date: string
  href: string
  tags?: string[]
}

export interface Post extends MDX {
  icon: IconProp | FontAwesomeIconProps['icon']
  type: 'Article' | 'Tutorial' | 'Announcement'
  author: {
    name: string
    image: ImagePropsWithOptionalAlt
  }
}

export interface Project extends MDX {
  order: number
  abstract: string
  startDate: string
  type: string
  image: StaticImageData
  status: string
  repo?: string
  website?: string
  support?: string
}

export const BlogPost = {
  type: 'Article' as const,
  author: {
    name: 'Frank Doka',
    image: {
      src: FrankPhoto,
      alt: 'Frank Doka Portrait'
    }
  }
}

export function loadPosts() {
  return loadEntries<Post>('blog', 'post', postSchema)
}

export function loadProjects() {
  return loadEntries<Project>('projects', 'project', projectSchema)
}
