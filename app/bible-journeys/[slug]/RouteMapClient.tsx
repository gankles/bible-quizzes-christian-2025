'use client';
import { BibleMap, type MapRoute } from '@/components/BibleMapDynamic';

export default function RouteMapClient({ routes }: { routes: MapRoute[] }) {
  return <BibleMap markers={[]} routes={routes} height="420px" showPopups={false} />;
}
