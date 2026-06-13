import { type Metadata } from 'next'

import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { Container } from '@/components/layout/Container'
import { PageIntro } from '@/components/PageIntro'

export const metadata: Metadata = {
  title: 'Toolbox',
  description:
    'The cloud platforms, automation tools, and technologies I work with for infrastructure engineering and DevOps.',
  openGraph: {
    title: 'Toolbox — Frank Doka',
    description: 'The cloud platforms, automation tools, and technologies I work with for infrastructure engineering and DevOps.',
    url: 'https://www.frankdoka.com/toolbox',
  },
}

interface Tool {
  name: string
  description: string
}

interface Category {
  title: string
  tools: Tool[]
}

const categories: Category[] = [
  {
    title: 'Cloud Platforms',
    tools: [
      { name: 'AWS', description: 'EC2, S3, Lambda, CloudFront, DynamoDB, API Gateway, IAM — serverless and traditional workloads.' },
      { name: 'Azure', description: 'AKS, Entra ID, Microsoft 365, hybrid identity, and VM infrastructure.' },
    ],
  },
  {
    title: 'Infrastructure & Automation',
    tools: [
      { name: 'Terraform', description: 'IaC for provisioning and managing cloud resources across AWS and Azure.' },
      { name: 'Ansible', description: 'Configuration management and automated server provisioning via playbooks.' },
      { name: 'Docker', description: 'Container builds, local dev environments, and CI/CD pipeline stages.' },
      { name: 'Kubernetes', description: 'Container orchestration — deploying and scaling production workloads on AKS.' },
      { name: 'GitHub Actions', description: 'CI/CD pipelines: build, test, deploy on every push.' },
    ],
  },
  {
    title: 'Endpoint & Identity',
    tools: [
      { name: 'SCCM (ConfigMgr)', description: 'OS deployment, patching, software distribution, and compliance at scale.' },
      { name: 'Microsoft Intune', description: 'Cloud endpoint management, device compliance, and zero-touch provisioning.' },
      { name: 'Entra ID', description: 'Hybrid identity, Conditional Access, SSO with SAML/OIDC, and RBAC.' },
      { name: 'Microsoft Defender XDR', description: 'Endpoint detection and response with custom rules and automated workflows.' },
    ],
  },
  {
    title: 'Languages & Development',
    tools: [
      { name: 'Python', description: 'Automation scripts, Lambda functions, and infrastructure tooling.' },
      { name: 'PowerShell', description: 'Windows automation, SCCM task sequences, and Active Directory scripting.' },
      { name: 'TypeScript / React', description: 'Frontend development for web applications and this portfolio site.' },
      { name: 'Git + GitHub', description: 'Version control, code review, and collaborative workflows.' },
    ],
  },
]

export default function ToolboxPage() {
  return (
    <div data-pagefind-body>
      <PageIntro eyebrow="Toolbox" title="What I work with">
        <p>
          The platforms, tools, and technologies I use to build, automate,
          and manage infrastructure.
        </p>
      </PageIntro>

      <Container className="mt-16 sm:mt-20 lg:mt-24">
        <FadeInStagger>
          <div className="space-y-16">
            {categories.map((category) => (
              <FadeIn key={category.title}>
                <div className="border-t border-[var(--theme-border-subtle)] pt-10 pb-2">
                  <h2 className="text-xs font-semibold tracking-widest text-[var(--theme-text-muted)] uppercase">
                    {category.title}
                  </h2>
                  <dl className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
                    {category.tools.map((tool) => (
                      <div key={tool.name}>
                        <dt className="text-sm font-semibold text-[var(--theme-text-primary)]">
                          {tool.name}
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-[var(--theme-text-secondary)]">
                          {tool.description}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeInStagger>
      </Container>
    </div>
  )
}
