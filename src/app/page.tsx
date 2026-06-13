import { type Metadata } from 'next'

import { AboutMe } from '@/components/sections/AboutMe'
import FeaturedPosts from '@/components/sections/FeaturedPosts'
import HeroBanner from '@/components/sections/HeroBanner'
import Projects from '@/components/sections/Projects'
import { JsonLd, personSchema } from '@/components/StructuredData'
import { loadPosts } from '@/lib/mdx'

export const metadata: Metadata = {
  title: {
    absolute: 'Frank Doka | Infrastructure Architect'
  },
  description:
    'Infrastructure and Cloud Engineer focused on Azure, AWS, and automation. Building hybrid environments, deploying containerized workloads on Kubernetes, and defining infrastructure as code with Terraform, Python, and PowerShell.'
}

export default async function Home() {
  const posts = await loadPosts()

  return (
    <div data-pagefind-body>
      <JsonLd data={personSchema()} />
      <HeroBanner />

      <AboutMe />

      <FeaturedPosts posts={posts.slice(0, 3)} />

      <Projects limit={2} />
    </div>
  )
}
