import React from 'react'

type MockLinkProps = {
  href: string
  children?: React.ReactNode
  className?: string
  [key: string]: unknown
}

function NextLink({ href, children, className, ...rest }: MockLinkProps) {
  const { prefetch, scroll, replace, shallow, locale, ...htmlProps } = rest as Record<string, unknown>
  void prefetch; void scroll; void replace; void shallow; void locale
  return React.createElement('a', { href, className, ...htmlProps }, children)
}

export default NextLink
