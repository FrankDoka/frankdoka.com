import { ImageResponse } from 'next/og'
import { loadProjects } from '@/lib/mdx'

export const alt = 'Project by Frank Doka'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const projects = await loadProjects()
  const project = projects.find((p) => p.href === `/projects/${slug}`)

  const title = project?.title ?? slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
  const description = project?.description ?? ''
  const tags = project?.tags?.slice(0, 5) ?? []
  const status = project?.status ?? ''

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          backgroundColor: '#0a0a0a',
          color: '#ffffff',
          fontFamily: 'system-ui, sans-serif',
          padding: '60px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              fontSize: 14,
              color: '#f97316',
              textTransform: 'uppercase',
              letterSpacing: '3px',
              fontWeight: 700,
            }}
          >
            Project
          </div>
          {status && (
            <>
              <div style={{ color: '#404040', fontSize: 14 }}>·</div>
              <div
                style={{
                  fontSize: 14,
                  color: status === 'Active' ? '#22c55e' : '#737373',
                  fontWeight: 600,
                }}
              >
                {status}
              </div>
            </>
          )}
        </div>

        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            lineHeight: 1.15,
            maxWidth: '1000px',
            marginTop: '32px',
            letterSpacing: '-1px',
          }}
        >
          {title}
        </div>

        {description && (
          <div
            style={{
              fontSize: 22,
              color: '#a3a3a3',
              marginTop: '24px',
              maxWidth: '900px',
              lineHeight: 1.4,
            }}
          >
            {description}
          </div>
        )}

        {tags.length > 0 && (
          <div style={{ display: 'flex', gap: '10px', marginTop: '32px', flexWrap: 'wrap' }}>
            {tags.map((tag) => (
              <div
                key={tag}
                style={{
                  fontSize: 14,
                  color: '#d4d4d4',
                  border: '1px solid #404040',
                  borderRadius: '9999px',
                  padding: '6px 16px',
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        )}

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'absolute',
            bottom: '48px',
            left: '60px',
            right: '60px',
          }}
        >
          <div style={{ fontSize: 20, fontWeight: 600, color: '#e5e5e5' }}>Frank Doka</div>
          <div style={{ fontSize: 16, color: '#525252' }}>frankdoka.com</div>
        </div>
      </div>
    ),
    { ...size }
  )
}
