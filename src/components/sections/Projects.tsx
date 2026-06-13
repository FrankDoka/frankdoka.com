import { Button } from '@/components/Button'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { TagList, TagListItem } from '@/components/TagList'
import { loadProjects, Project } from '@/lib/mdx'
import Image from 'next/image'
import Section from '../layout/Section'

function ProjectCard({ project }: { project: Project }) {
  return (
    <FadeIn className="flex">
      <div className="theme-card group relative flex w-full flex-col rounded-2xl border">
        <div className="overflow-hidden rounded-t-2xl">
          <Image
            src={project.image.src}
            alt={project.title}
            width={project.image.width}
            height={project.image.height}
            className="aspect-[16/9] w-full object-cover transition duration-300 group-hover:scale-105"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        </div>
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h3 className="font-display text-lg font-semibold text-[var(--theme-text-primary)]">{project.title}</h3>
          <div className="mt-2 text-sm text-[var(--theme-text-secondary)] line-clamp-2">{project.abstract}</div>
          <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5">
            <TagList>
              {project.tags?.slice(0, 4).map((tag) => (
                <TagListItem key={tag} className="text-xs">{tag}</TagListItem>
              ))}
            </TagList>
          </div>
          <div className="mt-4">
            <Button href={project.href}>View project</Button>
          </div>
        </div>
      </div>
    </FadeIn>
  )
}

export default async function ProjectSection({ limit }: { limit?: number } = {}) {
  const projects = (await loadProjects()).sort((a, b) => a.order - b.order)
  const visible = limit ? projects.slice(0, limit) : projects

  return (
    <Section eyebrow="Projects" title="Things I've built.">
      <FadeInStagger className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {visible.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </FadeInStagger>
      {limit && projects.length > limit && (
        <FadeIn className="mt-10 flex justify-center">
          <Button href="/projects">See all projects</Button>
        </FadeIn>
      )}
    </Section>
  )
}
