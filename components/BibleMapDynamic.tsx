import dynamic from 'next/dynamic';
import type { MapMarker } from './BibleMap';

const BibleMap = dynamic(() => import('./BibleMap'), {
  ssr: false,
  loading: () => (
    <div className="rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center" style={{ height: '400px' }}>
      <p className="text-sm text-ink-muted">Loading map...</p>
    </div>
  ),
});

export { BibleMap };
export type { MapMarker };
