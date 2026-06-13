import fs from 'fs'
import path from 'path'

const WORDS_PER_MINUTE = 220

export function getReadingTime(slug: string, directory: string = 'blog'): number {
  const filePath = path.join(process.cwd(), 'src', 'app', directory, slug, 'page.mdx')
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    const textOnly = content
      .replace(/^---[\s\S]*?---/, '')
      .replace(/import\s.*$/gm, '')
      .replace(/export\s.*?(\{[\s\S]*?\}|$)/gm, '')
      .replace(/```[\s\S]*?```/g, '')
      .replace(/<[^>]*>/g, '')
      .replace(/[#*`\[\]()!|>-]/g, '')
      .trim()
    const wordCount = textOnly.split(/\s+/).filter(Boolean).length
    return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE))
  } catch {
    return 0
  }
}
