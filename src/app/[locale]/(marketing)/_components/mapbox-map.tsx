'use client';
import type { LngLatLike } from 'mapbox-gl';
import mapboxgl from 'mapbox-gl';
// MapboxMap.tsx
import React, { useEffect, useRef } from 'react';

export type MarkerItem = {
  id?: string | number;
  lng: number;
  lat: number;
  title?: string;
  description?: string;
  iconUrl?: string; // optional override per-marker
};

type MapboxMapProps = {
  accessToken: string;
  center?: [number, number]; // [lng, lat]
  zoom?: number;
  markers?: MarkerItem[];
  style?: string; // mapbox style url
  height?: string; // tailwind height class or px (e.g. "h-80" or "400px")
  className?: string;
  defaultIconUrl?: string; // default marker image url
};

const DEFAULT_ICON = '/mnt/data/8524ab78-611d-4fb5-899c-0f68fc231d97.png';
const MapboxMap: React.FC<MapboxMapProps> = ({
  accessToken,
  center = [106.6667, 10.8000], // HCM sample
  zoom = 12,
  markers = [],
  style = 'mapbox://styles/mapbox/streets-v11',
  height = 'h-80',
  className = '',
  defaultIconUrl = DEFAULT_ICON,
}) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!mapContainer.current) {
      return;
    }
    // avoid re-init if already created
    if (mapRef.current) {
      return;
    }

    mapboxgl.accessToken = accessToken;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style,
      center: center as LngLatLike,
      zoom,
    });

    // add navigation controls
    map.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }), 'top-right');

    mapRef.current = map;

    return () => {
      // cleanup on unmount
      markersRef.current.forEach(m => m.remove());
      map.remove();
      mapRef.current = null;
      markersRef.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on client

  // update markers when `markers` prop changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map) {
      return;
    }

    // remove existing markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    markers.forEach((m) => {
      // create element for custom marker (img inside a div for sizing)
      const el = document.createElement('div');
      el.className = 'marker-wrapper';
      el.style.display = 'inline-block';
      el.style.cursor = 'pointer';
      el.style.width = '36px';
      el.style.height = '36px';
      el.style.borderRadius = '50%';
      el.style.overflow = 'hidden';
      el.style.boxShadow = '0 1px 6px rgba(0,0,0,0.2)';
      el.style.background = 'white';
      el.style.display = 'flex';
      el.style.alignItems = 'center';
      el.style.justifyContent = 'center';

      const img = document.createElement('img');
      img.src = m.iconUrl || defaultIconUrl;
      img.alt = m.title || 'marker';
      img.style.width = '24px';
      img.style.height = '24px';
      img.style.objectFit = 'cover';
      img.style.display = 'block';

      el.appendChild(img);

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([m.lng, m.lat])
        .addTo(map);

      if (m.title || m.description) {
        const popupHtml = `<div class="p-2">
            ${m.iconUrl ? `<img src="${m.iconUrl}" alt="Girl in a jacket" width="800" height="600" class="w-full">` : ''}
            ${m.title ? `<div class="line-clamp-2 text-lg font-bold mb-1">${escapeHtml(m.title)}</div>` : ''}
            ${m.description ? `<div style="color:#444" class="line-clamp-3 text-xs">${escapeHtml(m.description)}</div>` : ''}
          </div>`;

        const popup = new mapboxgl.Popup({ offset: 12 }).setHTML(popupHtml);
        marker.setPopup(popup);
      }

      markersRef.current.push(marker);
    });

    // optionally adjust bounds to fit markers
    if (markers.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      markers.forEach(m => bounds.extend([m.lng, m.lat]));
      if (markers && markers.length === 1 && Array.isArray(markers)) {
        if (markers[0]) {
          map.flyTo({ center: [markers[0].lng, markers[0].lat], zoom });
        }
      } else {
        map.fitBounds(bounds, { padding: 60, maxZoom: 14 });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markers]);

  return (
    <div className={`${className}`}>
      <div
        ref={mapContainer}
        className={`w-full ${height} overflow-hidden rounded-lg border border-gray-100 shadow-sm`}
      />
    </div>
  );
};

export default MapboxMap;

// small helper to avoid XSS from simple strings used in popup
function escapeHtml(unsafe: string) {
  return unsafe
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll('\'', '&#039;');
}
