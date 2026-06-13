import { type Metadata } from 'next'

import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { Container } from '@/components/layout/Container'
import { PageIntro } from '@/components/PageIntro'
import { experience } from '@/data/experience'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Infrastructure and Cloud Engineer focused on Azure, AWS, and automation. Education, certifications, experience, and values.',
  openGraph: {
    title: 'About — Frank Doka',
    description: 'Infrastructure and Cloud Engineer focused on Azure, AWS, and automation.',
    url: 'https://frankdoka.com/about',
  },
}

const education = [
  { school: 'NYU Tandon School of Engineering', degree: 'B.S. Computer Science', year: '2015' },
]

const certifications = [
  { name: 'AWS Certified Solutions Architect', year: 'Aug 2023' },
  { name: 'CompTIA Security+', year: 'Jan 2016' },
]

const values = [
  {
    title: 'Automation First',
    description: 'Every repetitive task is an opportunity to write a script, build a pipeline, or define infrastructure as code — freeing teams to focus on what matters.',
  },
  {
    title: 'Security Mindset',
    description: 'From IAM permissions and least-privilege access to encrypted pipelines and secrets management, security is woven into every layer.',
  },
  {
    title: 'Continuous Learning',
    description: 'Cloud and DevOps tooling moves fast. I stay sharp by building projects, pursuing certifications, and hands-on experimentation.',
  },
]

export default function AboutPage() {
  return (
    <div data-pagefind-body>
      <PageIntro eyebrow="About" title="Frank Doka">
        <p>
          Infrastructure and Cloud Engineer focused on Azure, AWS, and automation.
          I build and manage hybrid environments, deploy containerized workloads on Kubernetes,
          and define everything as code with Terraform, Python, and PowerShell.
        </p>
      </PageIntro>

      <Container className="mt-16 sm:mt-20 lg:mt-24">
        <FadeInStagger>
          <FadeIn>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="theme-card rounded-2xl border p-6">
                <h2 className="mb-4 text-xs font-semibold tracking-widest text-[var(--theme-text-muted)] uppercase">Education</h2>
                {education.map((e) => (
                  <div key={e.school}>
                    <div className="font-display text-base font-semibold text-[var(--theme-text-primary)]">{e.school}</div>
                    <div className="mt-1 text-sm text-[var(--theme-text-secondary)]">{e.degree} &middot; {e.year}</div>
                  </div>
                ))}
              </div>
              <div className="theme-card rounded-2xl border p-6">
                <h2 className="mb-4 text-xs font-semibold tracking-widest text-[var(--theme-text-muted)] uppercase">Certifications</h2>
                <ul className="space-y-3">
                  {certifications.map((c) => (
                    <li key={c.name} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-[var(--theme-text-secondary)]">{c.name}</span>
                      <span className="text-xs text-[var(--theme-text-muted)]">{c.year}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="mt-16 border-t border-[var(--theme-border-subtle)] pt-12">
              <h2 className="text-xs font-semibold tracking-widest text-[var(--theme-text-muted)] uppercase">Experience</h2>
              <div className="mt-8 space-y-8">
                {experience.map((job) => (
                  <Link key={job.slug} href={`/experience/${job.slug}`} className="group block">
                    <div className="theme-card rounded-2xl border p-6 transition">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                        <div>
                          <h3 className="font-display text-base font-semibold text-[var(--theme-text-primary)]">{job.org}</h3>
                          <div className="mt-1 text-sm text-[var(--theme-text-secondary)]">{job.role}</div>
                        </div>
                        <div className="shrink-0 sm:text-right">
                          <div className="text-xs font-semibold tracking-widest text-[var(--theme-text-muted)] uppercase">{job.period}</div>
                          <div className="mt-1 text-xs text-[var(--theme-text-muted)]">{job.location}</div>
                        </div>
                      </div>
                      <p className="mt-4 text-sm text-[var(--theme-text-secondary)]">{job.description}</p>
                      <div className="mt-4 text-xs font-semibold text-[var(--theme-text-muted)] transition group-hover:text-[var(--theme-text-secondary)]">
                        View details &rarr;
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="mt-16 border-t border-[var(--theme-border-subtle)] pt-12">
              <h2 className="text-xs font-semibold tracking-widest text-[var(--theme-text-muted)] uppercase">Values</h2>
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
                {values.map((v) => (
                  <div key={v.title} className="theme-card rounded-2xl border p-6">
                    <h3 className="font-display text-base font-semibold text-[var(--theme-text-primary)]">{v.title}</h3>
                    <p className="mt-2 text-sm text-[var(--theme-text-secondary)]">{v.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </FadeInStagger>
      </Container>
    </div>
  )
}
