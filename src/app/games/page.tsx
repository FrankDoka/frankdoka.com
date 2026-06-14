import { PageIntro } from '@/components/PageIntro'
import GamesSection from '@/components/sections/Games'

// Unlisted section: noindex keeps it out of search engines; it's also absent from the
// nav, sitemap, RSS, and on-site search. Reachable only by direct link.
export const metadata = {
  title: 'Games',
  description: 'A development log for the games I build on the side — design, tech, and art.',
  robots: { index: false, follow: false },
}

export default function GamesPage() {
  return (
    <>
      <PageIntro eyebrow="Games" title="Game Dev Log">
        <p>
          A behind-the-scenes log of the games I build on the side — design decisions, the tech stack, and the art
          pipeline. A personal corner of the site, not part of my professional portfolio.
        </p>
      </PageIntro>
      <GamesSection />
    </>
  )
}
