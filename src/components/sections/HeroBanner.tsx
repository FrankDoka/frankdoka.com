import { FadeIn } from '@/components/FadeIn'
import { SlotWord } from '@/components/SlotWord'
import { Container } from '@/components/layout/Container'

export default function HeroBanner() {
  return (
    <Container className="mt-16 sm:mt-20 md:mt-28">
      <FadeIn className="max-w-3xl">
        <h1 className="font-display text-5xl font-medium tracking-tight [text-wrap:balance] text-[var(--theme-text-primary)] sm:text-7xl">
          Frank Doka
        </h1>
        <p className="mt-6 text-xl text-[var(--theme-text-secondary)]">
          <SlotWord
            words={[
              'Cloud Engineer.',
              'DevOps Practitioner.',
              'Automation Engineer.',
              'Endpoint Engineer.',
              'Platform Builder.',
              'Kubernetes Operator.',
            ]}
            final="Infrastructure Architect."
          />
        </p>
      </FadeIn>
    </Container>
  )
}
