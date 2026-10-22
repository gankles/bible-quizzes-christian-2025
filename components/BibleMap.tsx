'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export interface MapMarker {
  lat: number;
  lon: number;
  name: string;
  slug?: string;
}

export interface MapRoute {
  /** [lat, lon] pairs for one continuous leg of the journey */
  path: [number, number][];
  color?: string;
  dashed?: boolean;
  label?: string;
}

interface BibleMapProps {
  markers: MapMarker[];
  routes?: MapRoute[];
  center?: [number, number];
  zoom?: number;
  height?: string;
  className?: string;
  showPopups?: boolean;
}

// Fix Leaflet default icon paths (broken by bundlers)
const iconUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png';
const iconRetinaUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png';
const shadowUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png';

const defaultIcon = L.icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function BibleMap({
  markers,
  routes = [],
  center,
  zoom,
  height = '400px',
  className = '',
  showPopups = true,
}: BibleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Determine center and zoom
    const validMarkers = markers.filter(m => m.lat && m.lon);
    const routePoints = routes.flatMap(r => r.path);
    const allPoints = [...validMarkers.map(m => [m.lat, m.lon] as [number, number]), ...routePoints];
    let mapCenter: [number, number] = center || [31.7683, 35.2137]; // Default: Jerusalem
    let mapZoom = zoom || 7;

    if (!center && allPoints.length === 1) {
      mapCenter = allPoints[0];
      mapZoom = zoom || 10;
    } else if (!center && allPoints.length > 1) {
      const bounds = L.latLngBounds(allPoints);
      mapCenter = [bounds.getCenter().lat, bounds.getCenter().lng];
    }

    const map = L.map(mapRef.current, {
      center: mapCenter,
      zoom: mapZoom,
      scrollWheelZoom: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    // Add route lines
    for (const route of routes) {
      L.polyline(route.path, {
        color: route.color || '#b45309',
        weight: 3,
        opacity: 0.85,
        dashArray: route.dashed ? '6 5' : undefined,
      }).addTo(map);
    }

    // Add markers
    for (const marker of validMarkers) {
      const m = L.marker([marker.lat, marker.lon], { icon: defaultIcon }).addTo(map);
      if (showPopups) {
        const popupContent = marker.slug
          ? `<a href="/bible-places/${marker.slug}" style="font-weight:600;color:#1d4ed8;text-decoration:none">${marker.name}</a>`
          : `<strong>${marker.name}</strong>`;
        m.bindPopup(popupContent);
      }
    }

    // Fit bounds for multiple points
    if (!center && allPoints.length > 1) {
      const bounds = L.latLngBounds(allPoints);
      map.fitBounds(bounds, { padding: [30, 30] });
    }

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [markers, routes, center, zoom, showPopups]);

  return (
    <div
      ref={mapRef}
      style={{ height, width: '100%' }}
      className={`rounded-lg border border-gray-200 ${className}`}
    />
  );
}
