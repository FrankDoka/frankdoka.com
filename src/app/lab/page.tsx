import { PageIntro } from '@/components/PageIntro'
import LabSection from '@/components/sections/Lab'

// Unlisted section: noindex keeps it out of search engines; it's also absent from the
// nav, sitemap, RSS, and on-site search. Reachable only by direct link.
export const metadata = {
  title: 'Lab',
  description: 'Creative-tech experiments and reusable tools I build for my own projects.',
  robots: { index: false, follow: false },
}

export default function LabPage() {
  return (
    <>
      <PageIntro eyebrow="Lab" title="Creative-Tech Lab">
        <p>
          A workshop for the tools and pipelines I build to power my side projects — the reusable
          tech behind the games, separated out so it can serve more than one of them. A personal
          R&amp;D corner, not part of my professional portfolio.
        </p>
      </PageIntro>
      <LabSection />
    </>
  )
}
