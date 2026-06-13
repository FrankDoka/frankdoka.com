// JSON-LD structured data for SEO — helps search engines understand page content
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Frank Doka',
    url: 'https://www.frankdoka.com',
    jobTitle: 'Infrastructure Architect',
    sameAs: [
      'https://github.com/FrankDoka',
      'https://www.linkedin.com/in/frank-doka-64951828b/',
    ],
    knowsAbout: [
      'AWS', 'Azure', 'Terraform', 'Kubernetes', 'Docker',
      'SCCM', 'Intune', 'CI/CD', 'Infrastructure as Code',
    ],
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'NYU Tandon School of Engineering',
    },
  }
}

export function blogPostSchema(post: {
  title: string
  description: string
  date: string
  href: string
  author: { name: string }
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    url: `https://www.frankdoka.com${post.href}`,
    author: {
      '@type': 'Person',
      name: post.author.name,
      url: 'https://www.frankdoka.com',
    },
  }
}

export function projectSchema(project: {
  title: string
  description: string
  date: string
  href: string
  tags?: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: project.title,
    description: project.description,
    dateCreated: project.date,
    url: `https://www.frankdoka.com${project.href}`,
    author: {
      '@type': 'Person',
      name: 'Frank Doka',
    },
    ...(project.tags && { keywords: project.tags.join(', ') }),
  }
}
