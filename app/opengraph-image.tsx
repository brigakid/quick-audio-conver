import { ImageResponse } from 'next/og';

export const alt = 'QuickAudioConvert — Free Online Audio Converter';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #2B2B2F 0%, #2B2B2F 60%, #3A2F2A 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          padding: '60px',
        }}
      >
        {/* Logo row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginBottom: '28px' }}>
          <div
            style={{
              background: '#E1483D',
              borderRadius: '18px',
              width: '72px',
              height: '72px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {/* Music note SVG — hardcoded path */}
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 19V6l12-3v13" />
              <circle cx="6" cy="19" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          </div>
          <span
            style={{
              color: 'white',
              fontSize: '42px',
              fontWeight: 800,
              letterSpacing: '-1px',
            }}
          >
            QuickAudioConvert
          </span>
        </div>

        {/* Main headline */}
        <div
          style={{
            color: '#E1483D',
            fontSize: '62px',
            fontWeight: 800,
            letterSpacing: '-2px',
            marginBottom: '18px',
            textAlign: 'center',
            lineHeight: 1.1,
          }}
        >
          Convert audio files
        </div>

        {/* Subline */}
        <div
          style={{
            color: '#9CA3AF',
            fontSize: '28px',
            textAlign: 'center',
            marginBottom: '40px',
            lineHeight: 1.4,
          }}
        >
          MP4 · WAV · FLAC · M4A · MP3 · AAC · OGG → MP3, WAV, M4A
        </div>

        {/* Badge row */}
        <div style={{ display: 'flex', gap: '16px' }}>
          {['Free', 'No account', 'Files auto-deleted'].map((label) => (
            <div
              key={label}
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '100px',
                padding: '10px 24px',
                color: '#9CA3AF',
                fontSize: '20px',
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
