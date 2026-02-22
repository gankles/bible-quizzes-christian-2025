import { Metadata } from 'next';
import { getAllTopics } from '@/lib/database/queries';
import { TopicGrid } from '@/components/TopicGrid';

export const metadata: Metadata = {
    title: 'Bible Verses by Topic | Love, Faith, Hope, Forgiveness & Hundreds More Themes | Bible Maximum',
    description: 'Find every Bible verse on topics like Love, Faith, Hope, and Forgiveness. Browse thousands of biblical themes categorized for deep study and daily guidance.',
    alternates: { canonical: '/topics' },
};

export default async function TopicsPage() {
    const topicGroups = await getAllTopics();

    return (
        <div className="min-h-screen bg-primary-light/30">
            <section className="py-16 bg-gradient-to-b from-blue-50 to-primary-light/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold font-display text-scripture mb-4">
                        Bible Verses <span className="text-blue-600">By Topic</span>
                    </h1>
                    <p className="text-lg text-primary-dark/70 max-w-2xl mx-auto">
                        Discover specific scripture for every life situation and theological question.
                        Browse our library of cross-referenced biblical topics.
                    </p>
                </div>
            </section>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <TopicGrid initialGroups={topicGroups} />
            </main>
        </div>
    );
}
