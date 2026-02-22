import { Metadata } from 'next';
import { getAllCharacters } from '@/lib/database/queries';
import { CharacterGrid } from '@/components/CharacterGrid';

export const metadata: Metadata = {
    title: 'Biblical Characters | Biographies of Every Person in the Bible | Key Life Lessons, Scripture References & Study Notes | Bible Maximum',
    description: 'Study the lives of biblical figures from Abraham to Paul. Discovery biographies, key life lessons, and every scripture reference for thousands of Bible characters.',
    alternates: { canonical: '/characters' },
};

export default async function CharactersPage() {
    const characters = await getAllCharacters();

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="bg-primary-light/30 py-16 md:py-24 border-b border-grace">
                <div className="max-w-7xl mx-auto px-4 md:px-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-600 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                        </span>
                        Biographical Bible Study
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold font-display text-scripture mb-6 leading-tight">
                        Bible <br />
                        <span className="text-blue-600">Characters</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-primary-dark/70 leading-relaxed">
                        &ldquo;Encompassed about with so great a cloud of witnesses.&rdquo; Explore the stories, struggles, and triumphs of the people who walked with God.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 md:px-10 py-16">
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-scripture mb-2">
                        People of the Bible
                    </h2>
                    <p className="text-primary-dark/60 font-medium">
                        Search or browse by testament to find biographies and life lessons.
                    </p>
                </div>

                <CharacterGrid initialCharacters={characters as any} />
            </main>
        </div>
    );
}
