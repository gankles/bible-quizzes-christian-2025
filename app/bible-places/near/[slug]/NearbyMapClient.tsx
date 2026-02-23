'use client';

import { BibleMap, type MapMarker } from '@/components/BibleMapDynamic';

export default function NearbyMapClient({ markers }: { markers: MapMarker[] }) {
  return <BibleMap markers={markers} height="400px" />;
}
