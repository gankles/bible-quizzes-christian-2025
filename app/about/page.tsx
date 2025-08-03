import { Metadata } from 'next';
import ComingSoon from '@/components/ComingSoon';

export const metadata: Metadata = {
  title: 'About Bible Maximum - Coming Soon',
  description: 'Learn more about Bible Maximum and our mission to help people grow in their biblical knowledge.',
};

export default function AboutPage() {
  return (
    <ComingSoon 
      title="About Page Coming Soon"
      description="We're crafting our story and mission to help you understand how Bible Maximum can transform your Bible study experience."
      expectedDate="February 2025"
    />
  );
}