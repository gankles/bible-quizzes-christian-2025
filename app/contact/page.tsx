import { Metadata } from 'next';
import ComingSoon from '@/components/ComingSoon';

export const metadata: Metadata = {
  title: 'Contact Us - Coming Soon | Bible Maximum',
  description: 'Get in touch with the Bible Maximum team. Contact form and information coming soon.',
};

export default function ContactPage() {
  return (
    <ComingSoon 
      title="Contact Page Coming Soon"
      description="We're setting up our contact system so you can easily reach out with questions, feedback, or suggestions."
      expectedDate="February 2025"
    />
  );
}