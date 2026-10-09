import { ImageResponse } from 'next/og';
import { getBookBySlug } from '@/lib/bible-data';
import { getChapterBreakdown, loadChapterSummary } from '@/lib/chapter-breakdowns';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ book: string; chapter: string }> }) {
  const { book, chapter } = await params;
  const bookData = getBookBySlug(book);
  const chapterNum = parseInt(chapter, 10);
  const breakdown = getChapterBreakdown(book, chapterNum);
  const summary = loadChapterSummary(book, chapterNum);
  const chTitle = summary?.title || breakdown?.title || '';
  const bookName = bookData?.name ?? book;

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
          Chapter Summary
        </div>
        <div
          style={{
            fontSize: 80,
            fontWeight: 700,
            color: '#F5F1E8',
            marginTop: 16,
            textAlign: 'center',
          }}
        >
          {`${bookName} ${chapterNum}`}
        </div>
        {chTitle && (
          <div style={{ fontSize: 32, color: '#E8DCC4', marginTop: 24, textAlign: 'center' }}>
            {chTitle}
          </div>
        )}
        <div style={{ fontSize: 28, color: '#C9A961', marginTop: 48 }}>Bible Maximum</div>
      </div>
    ),
    { ...size }
  );
}
