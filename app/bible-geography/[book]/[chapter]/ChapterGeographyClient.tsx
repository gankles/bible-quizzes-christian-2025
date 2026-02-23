'use client';

import { BibleMap, type MapMarker } from '@/components/BibleMapDynamic';

export default function ChapterGeographyClient({ markers }: { markers: MapMarker[] }) {
  return <BibleMap markers={markers} height="350px" />;
}
