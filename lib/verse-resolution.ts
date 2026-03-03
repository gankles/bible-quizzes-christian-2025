// Shared verse reference resolution with chapter-level batching.
// Replaces duplicate implementations in:
//   - app/bible-quotes/[slug]/page.tsx
//   - app/what-does-the-bible-say-about/[topic]/page.tsx
//   - lib/database/queries.ts

import { getChapterWithCommentary, stripHtml, getBookName } from '@/lib/bolls-api'
import { getBookBySlug } from '@/lib/bible-data'

export interface ResolvedVerse {
  book: string
  bookName: string
  chapter: number
  verse: number
  text: string
  translation: string
  testament: string
}

/**
 * Resolve an array of verse reference strings (e.g. "genesis-1-1") into full verse objects.
 * Uses chapter-level batching to minimize Bolls API calls.
 *
 * @param refs - Array of ref strings in "book-chapter-verse" format
 * @param limit - Max refs to process (default 100)
 */
export async function resolveVerseRefs(
  refs: string[],
  limit: number = 100,
): Promise<ResolvedVerse[]> {
  const sliced = refs.slice(0, limit)

  // Group refs by chapter for batched API calls
  const chapterGroups = new Map<
    string,
    { book: string; chapter: number; verses: number[]; refIndices: number[] }
  >()

  sliced.forEach((ref, idx) => {
    const parts = ref.split('-')
    const verse = parseInt(parts.pop() || '0')
    const chapter = parseInt(parts.pop() || '0')
    const book = parts.join('-')
    if (!book || !chapter || !verse) return

    const key = `${book}-${chapter}`
    if (!chapterGroups.has(key)) {
      chapterGroups.set(key, { book, chapter, verses: [], refIndices: [] })
    }
    chapterGroups.get(key)!.verses.push(verse)
    chapterGroups.get(key)!.refIndices.push(idx)
  })

  const results: (ResolvedVerse | null)[] = new Array(sliced.length).fill(null)

  await Promise.all(
    Array.from(chapterGroups.values()).map(async ({ book, chapter, verses, refIndices }) => {
      try {
        const chapterVerses = await getChapterWithCommentary('KJV', book, chapter)
        const bookNameStr = getBookName(book)
        const bookData = getBookBySlug(book)

        verses.forEach((verseNum, i) => {
          const found = chapterVerses.find((v: any) => v.verse === verseNum)
          if (found) {
            results[refIndices[i]] = {
              book,
              bookName: bookNameStr,
              chapter,
              verse: verseNum,
              text: stripHtml(found.text),
              translation: 'KJV',
              testament: bookData?.testament || 'old',
            }
          }
        })
      } catch {
        // Skip chapters that fail to load
      }
    }),
  )

  return results.filter((v): v is ResolvedVerse => v !== null)
}
