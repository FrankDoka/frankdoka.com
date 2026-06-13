import { describe, expect, it } from 'vitest'
import { formatDate } from '@/lib/formatDate'

describe('formatDate', () => {
  it('formats a full date with day', () => {
    expect(formatDate('2025-06-23')).toBe('June 23, 2025')
  })

  it('formats a year-month date without day', () => {
    expect(formatDate('2025-06')).toBe('June 2025')
  })

  it('formats a year-only date', () => {
    const result = formatDate('2025')
    expect(result).toContain('2025')
  })

  it('handles January (month boundary)', () => {
    expect(formatDate('2024-01-01')).toBe('January 1, 2024')
  })

  it('handles December (month boundary)', () => {
    expect(formatDate('2023-12-31')).toBe('December 31, 2023')
  })

  it('does not shift dates due to timezone offset (UTC pinning)', () => {
    // Without UTC pinning, '2025-01-01' parsed locally could show Dec 31 in UTC-X zones
    expect(formatDate('2025-01-01')).toBe('January 1, 2025')
  })

  it('handles single-digit day', () => {
    expect(formatDate('2025-06-05')).toBe('June 5, 2025')
  })

  it('handles leap day', () => {
    expect(formatDate('2024-02-29')).toBe('February 29, 2024')
  })
})
