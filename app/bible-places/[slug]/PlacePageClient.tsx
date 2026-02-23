'use client';

import { BibleMap, type MapMarker } from '@/components/BibleMapDynamic';

export default function PlacePageClient({ markers }: { markers: MapMarker[] }) {
  return <BibleMap markers={markers} height="350px" />;
}
