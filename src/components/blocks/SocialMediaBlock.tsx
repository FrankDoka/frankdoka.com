import { SocialMedia } from '@/components/SocialMedia'

export default function SocialMediaBlock() {
  return (
    <div className="sm:border-l sm:border-transparent">
      <h2 className="font-display text-base font-semibold text-[var(--theme-text-primary)]">Follow me</h2>
      <SocialMedia className="mt-4" />
    </div>
  )
}
