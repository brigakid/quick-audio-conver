import { ImageResponse } from 'next/og';

// Next.js App Router — auto-wired as <link rel="apple-touch-icon"> in <head>.
// 180×180 is the canonical size Apple recommends for home-screen bookmarks.
export const size        = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#E1483D',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          // ~20 % radius matches the iOS icon corner rounding mask
          borderRadius: '38px',
        }}
      >
        <svg
          width="104"
          height="104"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 19V6l12-3v13" />
          <circle cx="6" cy="19" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
