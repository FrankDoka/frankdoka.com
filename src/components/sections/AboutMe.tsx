import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { Container } from '@/components/layout/Container'
import imageFrank from '@public/img/frank-portrait.png'
import skillAWS from '@public/img/skills/skill-aws-light.svg'
import skillAzure from '@public/img/skills/skill-azure-light.svg'
import skillDocker from '@public/img/skills/skill-docker-light.svg'
import skillK8s from '@public/img/skills/skill-k8s-light.svg'
import skillTerraform from '@public/img/skills/skill-terraform-light.svg'
import skillAnsible from '@public/img/skills/skill-ansible-light.svg'
import skillPython from '@public/img/skills/skill-python-light.svg'
import skillReact from '@public/img/skills/skill-react-light.svg'
import skillLinux from '@public/img/skills/skill-linux-light.svg'
import skillCICD from '@public/img/skills/skill-cicd-light.svg'
import { Button } from '@/components/Button'
import ShowcaseList from '../blocks/ShowcaseList'
import { HeaderWithDivider, SectionHeader } from '../blocks/TextHeaders'
import { experience } from '@/data/experience'
import Image from 'next/image'
import Link from 'next/link'

const aboutMeText =
  'Infrastructure and Cloud Engineer focused on Azure, AWS, and automation. I build and manage hybrid environments with Entra ID, deploy containerized workloads on Kubernetes, and define everything as code with Terraform. Python and PowerShell are my go-to tools for automating infrastructure at scale — backed by years of hands-on endpoint and identity management.'

const skills: [string, import('next/image').StaticImageData][] = [
  ['AWS', skillAWS],
  ['Azure', skillAzure],
  ['Docker', skillDocker],
  ['Kubernetes', skillK8s],
  ['Terraform', skillTerraform],
  ['Ansible', skillAnsible],
  ['Python', skillPython],
  ['React', skillReact],
  ['Linux', skillLinux],
  ['CI/CD', skillCICD],
]

function ExperienceSection() {
  return (
    <Container className="mb-4 md:mt-14">
      <FadeIn>
        <HeaderWithDivider name="Experience" />
      </FadeIn>
      <FadeInStagger faster>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {experience.map((job) => (
            <FadeIn key={job.slug}>
              <Link href={`/experience/${job.slug}`} className="group block h-full">
                <div className="theme-card flex h-full flex-col rounded-2xl border p-5 sm:p-6">
                  <div className="mb-1 flex flex-wrap items-start justify-between gap-2">
                    <span className="text-xs font-semibold tracking-widest text-[var(--theme-text-muted)] uppercase">
                      {job.period}
                    </span>
                    <span className="shrink-0 text-xs text-[var(--theme-text-muted)]">{job.location}</span>
                  </div>
                  <h3 className="font-display text-base font-semibold text-[var(--theme-text-primary)]">{job.org}</h3>
                  <div className="mt-1 mb-4 text-sm font-medium text-[var(--theme-text-secondary)]">{job.role}</div>
                  <ul className="grow space-y-1.5">
                    {job.cardHighlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm text-[var(--theme-text-secondary)]">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--theme-text-muted)]" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 text-xs font-semibold text-[var(--theme-text-muted)] transition group-hover:text-[var(--theme-text-secondary)]">
                    View details &rarr;
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </FadeInStagger>
    </Container>
  )
}

export function AboutMe() {
  return (
    <div className="mt-12 rounded-4xl py-12 sm:mt-16 sm:py-16 lg:mt-20" data-theme-page>
      <FadeIn>
        <SectionHeader title="About Me" className="!mt-0" />
        <Container>
          <div className="mt-8 flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:gap-10">
            <div className="w-56 shrink-0 overflow-hidden rounded-xl sm:w-72">
              <Image
                src={imageFrank}
                alt="Frank Doka"
                className="w-full object-cover"
                sizes="(min-width: 640px) 18rem, 14rem"
                placeholder="blur"
                priority
              />
            </div>
            <p className="text-center text-lg leading-8 text-[var(--theme-text-primary)] sm:text-left sm:text-xl sm:leading-9">
              {aboutMeText}
            </p>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="/Frank_Doka_Resume.pdf" invert>
              Download Resume
            </Button>
            <Button href="/about">More about me</Button>
          </div>
        </Container>
      </FadeIn>
      <ShowcaseList name="Skills & Technology" items={skills} className="mb-4 md:mt-14" wide />
      <ExperienceSection />
    </div>
  )
}
