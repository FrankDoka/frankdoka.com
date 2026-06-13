import { PageIntro } from '@/components/PageIntro'
import Projects from '@/components/sections/Projects'

export const metadata = {
  title: 'Projects',
  description:
    'Cloud and DevOps projects — serverless AWS apps, Kubernetes deployments, and CI/CD pipelines, each with full documentation.',
  openGraph: {
    title: 'Projects — Frank Doka',
    description: 'Cloud and DevOps projects — serverless AWS apps, Kubernetes deployments, and CI/CD pipelines.',
    url: 'https://www.frankdoka.com/projects',
  },
}

export default function ProjectsPage() {
  return (
    <>
      <PageIntro eyebrow="Projects" title="Things I've Built">
        <p>{metadata.description}</p>
      </PageIntro>
      <Projects />
    </>
  )
}
