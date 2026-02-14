import Link from 'next/link';
import {
    SparklesIcon,
    ArrowRightIcon,
    BookOpenIcon
} from '@/components/icons';

interface RelatedVerse {
    book: string;
    chapter: number;
    verse: number;
    text: string;
    reference: string;
}

interface RelatedVersesProps {
    currentBook: string;
    currentChapter: number;
    currentVerse: number;
}

export function RelatedVerses({ currentBook, currentChapter, currentVerse }: RelatedVersesProps) {
    const relatedVerses: RelatedVerse[] = [];

    if (currentVerse > 2) {
        relatedVerses.push({
            book: currentBook,
            chapter: currentChapter,
            verse: currentVerse - 2,
            text: '',
            reference: `${currentBook} ${currentChapter}:${currentVerse - 2}`,
        });
    }
    if (currentVerse > 1) {
        relatedVerses.push({
            book: currentBook,
            chapter: currentChapter,
            verse: currentVerse - 1,
            text: '',
            reference: `${currentBook} ${currentChapter}:${currentVerse - 1}`,
        });
    }

    relatedVerses.push({
        book: currentBook,
        chapter: currentChapter,
        verse: currentVerse + 1,
        text: '',
        reference: `${currentBook} ${currentChapter}:${currentVerse + 1}`,
    });
    relatedVerses.push({
        book: currentBook,
        chapter: currentChapter,
        verse: currentVerse + 2,
        text: '',
        reference: `${currentBook} ${currentChapter}:${currentVerse + 2}`,
    });

    if (relatedVerses.length === 0) return null;

    return (
        <div className="mt-32">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                <div>
                    <div className="inline-flex items-center space-x-2 text-blue-600 font-bold text-[10px] uppercase mb-6">
                        <SparklesIcon className="w-4 h-4" />
                        <span>Thematic Continuance</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-950 tracking-tighter">Scriptural <span className="text-gray-400 italic">Synergy.</span></h2>
                </div>
                <p className="text-lg text-gray-500 font-medium leading-relaxed italic border-l-2 border-gray-100 pl-8 max-w-md">
                    Scripture is a tapestry. Explore the immediately adjacent nodes to maintain semantic momentum.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedVerses.map((verse) => (
                    <Link
                        key={`${verse.book}-${verse.chapter}-${verse.verse}`}
                        href={`/verses/${verse.book}/${verse.chapter}/${verse.verse}`}
                        className="group glass-panel p-8 rounded-[40px] border border-white bg-white/60 hover:bg-white hover:border-blue-600/30 hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-16 h-16 bg-gray-50 group-hover:bg-blue-50 transition-colors -z-10 rounded-full -mr-8 -mt-8" />
                        <div className="flex items-center justify-between mb-8">
                            <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                                <BookOpenIcon className="w-5 h-5" />
                            </div>
                            <span className="text-[10px] font-bold text-gray-300 uppercase">v.{verse.verse}</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-950 mb-3 tracking-tight group-hover:text-blue-600 transition-colors capitalize">
                            {verse.reference}
                        </h3>
                        <div className="flex items-center text-[10px] font-bold text-gray-400 uppercase group-hover:text-blue-600 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
                            Resolve Node <ArrowRightIcon className="w-4 h-4 ml-2" />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
