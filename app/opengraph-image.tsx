import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#2C3E50',
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: '#F5F1E8',
          }}
        >
          Bible Maximum
        </div>
        <div
          style={{
            fontSize: 32,
            color: '#C9A961',
            marginTop: 20,
          }}
        >
          Bible Study, Quizzes &amp; Scripture Resources
        </div>
      </div>
    ),
    { ...size }
  );
}
