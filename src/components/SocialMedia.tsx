import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import Link from 'next/link'

export const socialMediaProfiles = [
  { title: 'GitHub', href: 'https://github.com/FrankDoka', icon: faGithub },
  { title: 'LinkedIn', href: 'https://www.linkedin.com/in/frank-doka-64951828b/', icon: faLinkedin },
]

export function SocialMedia({ className }: { className?: string }) {
  return (
    <ul role="list" className={clsx('flex gap-x-10 text-[var(--theme-text-primary)]', className)}>
      {socialMediaProfiles.map((profile) => (
        <li key={profile.title}>
          <Link
            href={profile.href}
            aria-label={profile.title}
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-[var(--theme-text-secondary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--theme-text-primary)]"
          >
            <FontAwesomeIcon className="hover:scale-110" icon={profile.icon} size="2xl" />
          </Link>
        </li>
      ))}
    </ul>
  )
}
