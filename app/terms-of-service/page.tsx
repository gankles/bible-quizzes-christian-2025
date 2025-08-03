import { Metadata } from 'next';
import ComingSoon from '@/components/ComingSoon';

export const metadata: Metadata = {
  title: 'Terms of Service - Coming Soon | Bible Maximum',
  description: 'Our terms of service and usage guidelines will be available soon.',
};

export default function TermsOfServicePage() {
  return (
    <ComingSoon 
      title="Terms of Service Coming Soon"
      description="We're preparing our terms of service to clearly outline how you can use Bible Maximum and what you can expect from us."
      expectedDate="February 2025"
    />
  );
}