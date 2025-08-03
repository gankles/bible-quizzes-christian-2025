import { Metadata } from 'next';
import ComingSoon from '@/components/ComingSoon';

export const metadata: Metadata = {
  title: 'Privacy Policy - Coming Soon | Bible Maximum',
  description: 'Our privacy policy and data protection information will be available soon.',
};

export default function PrivacyPolicyPage() {
  return (
    <ComingSoon 
      title="Privacy Policy Coming Soon"
      description="We're finalizing our privacy policy to ensure your data is protected and you understand how we handle your information."
      expectedDate="February 2025"
    />
  );
}