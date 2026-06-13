import { ImageResponse } from 'next/og'

// Prerender at build time (required for `output: export`).
export const dynamic = 'force-static'

export const alt = 'Frank Doka — Infrastructure Architect'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: '#0a0a0a',
          color: '#ffffff',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #333',
            borderRadius: '24px',
            padding: '60px 80px',
            maxWidth: '900px',
          }}
        >
          <div style={{ fontSize: 64, fontWeight: 700, letterSpacing: '-2px' }}>
            Frank Doka
          </div>
          <div
            style={{
              fontSize: 28,
              color: '#a3a3a3',
              marginTop: '16px',
            }}
          >
            Infrastructure Architect
          </div>
          <div
            style={{
              display: 'flex',
              gap: '16px',
              marginTop: '32px',
              fontSize: 18,
              color: '#737373',
            }}
          >
            <span>AWS</span>
            <span>·</span>
            <span>Azure</span>
            <span>·</span>
            <span>Terraform</span>
            <span>·</span>
            <span>Kubernetes</span>
            <span>·</span>
            <span>Docker</span>
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '32px',
            fontSize: 18,
            color: '#525252',
          }}
        >
          frankdoka.com
        </div>
      </div>
    ),
    { ...size }
  )
}
