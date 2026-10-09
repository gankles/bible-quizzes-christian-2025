import { ImageResponse } from 'next/og';
import { getChapterWithCommentary, formatReference, stripHtml } from '@/lib/bolls-api';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({
  params,
}: {
  params: Promise<{ book: string; chapter: string; verse: string }>;
}) {
  const { book, chapter, verse } = await params;
  const chapterNum = parseInt(chapter, 10);
  const verseNum = parseInt(verse, 10);

  let verseText = '';
  try {
    const verses = await getChapterWithCommentary('KJV', book, chapterNum);
    const verseData = verses.find(v => v.verse === verseNum);
    if (verseData) verseText = stripHtml(verseData.text);
  } catch {
    // fall through with empty text
  }

  const reference = formatReference(book, chapterNum, verseNum);

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
        <div
          style={{
            fontSize: 36,
            color: '#E8DCC4',
            textAlign: 'center',
            lineHeight: 1.4,
            maxWidth: 1000,
          }}
        >
          {`“${verseText.slice(0, 180)}${verseText.length > 180 ? '…' : ''}”`}
        </div>
        <div style={{ fontSize: 40, fontWeight: 700, color: '#C9A961', marginTop: 40 }}>
          {reference}
        </div>
        <div style={{ fontSize: 26, color: '#C9A961', opacity: 0.8, marginTop: 48 }}>Bible Maximum</div>
      </div>
    ),
    { ...size }
  );
}
