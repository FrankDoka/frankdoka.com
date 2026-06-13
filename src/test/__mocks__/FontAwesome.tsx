import React from 'react'

type IconProp = { iconName?: string; prefix?: string } | string | string[]

type MockFAProps = {
  icon?: IconProp
  className?: string
  size?: string
  [key: string]: unknown
}

export function FontAwesomeIcon({ icon, className, ...rest }: MockFAProps) {
  const { size, spin, pulse, border, fixedWidth, inverse, listItem, flip, rotation, pull, transform, mask, ...htmlProps } = rest as Record<string, unknown>
  void size; void spin; void pulse; void border; void fixedWidth; void inverse; void listItem; void flip; void rotation; void pull; void transform; void mask
  const iconName = typeof icon === 'object' && !Array.isArray(icon) && icon !== null
    ? (icon as { iconName?: string }).iconName ?? 'icon'
    : String(icon ?? 'icon')
  return React.createElement('svg', {
    'data-testid': 'fa-icon',
    'data-icon': iconName,
    className,
    ...htmlProps,
    role: 'img',
    'aria-hidden': true,
  })
}
