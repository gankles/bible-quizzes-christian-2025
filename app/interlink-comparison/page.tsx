import { Metadata } from 'next';
import ComingSoon from '@/components/ComingSoon';

export const metadata: Metadata = {
  title: 'Interlink Comparison - Coming Soon | Bible Maximum',
  description: 'Technical comparison of internal linking strategies coming soon.',
  alternates: { canonical: '/interlink-comparison' },
};

export default function InterlinkComparisonPage() {
  return (
    <ComingSoon 
      title="Interlink Comparison Coming Soon"
      description="We're documenting our internal linking strategies and optimization techniques for better user experience."
      expectedDate="March 2025"
    />
  );
}