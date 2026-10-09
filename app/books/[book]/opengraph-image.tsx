import { ImageResponse } from 'next/og';
import { getBookMetadata } from '@/lib/book-metadata';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ book: string }> }) {
  const { book } = await params;
  const metadata = getBookMetadata(book);
  const name = metadata?.name ?? book;

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
          padding: 80,
        }}
      >
        <div style={{ fontSize: 28, color: '#C9A961', letterSpacing: 4, textTransform: 'uppercase' }}>
          Book of the Bible
        </div>
        <div
          style={{
            fontSize: 84,
            fontWeight: 700,
            color: '#F5F1E8',
            marginTop: 16,
            textAlign: 'center',
          }}
        >
          {name}
        </div>
        {metadata && (
          <div style={{ fontSize: 32, color: '#E8DCC4', marginTop: 24 }}>
            Summary · Themes · Outline · Key Verses
          </div>
        )}
        <div style={{ fontSize: 28, color: '#C9A961', marginTop: 48 }}>Bible Maximum</div>
      </div>
    ),
    { ...size }
  );
}
