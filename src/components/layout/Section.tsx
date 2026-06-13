import { SectionHeader } from '@/components/blocks/TextHeaders'
import clsx from 'clsx'
import { Container } from './Container'

export default function Section({
  children,
  className,
  title,
  description,
  eyebrow,
}: {
  children: React.ReactNode
  className?: string
  title?: string
  description?: string | React.ReactNode
  eyebrow?: string
}) {
  return (
    <section className={clsx('mt-10 mb-8 sm:mt-12 lg:mt-14', className)}>
      <SectionHeader title={title ? title : ''} description={description} eyebrow={eyebrow} />
      <Container>
        <div>{children}</div>
      </Container>
    </section>
  )
}
