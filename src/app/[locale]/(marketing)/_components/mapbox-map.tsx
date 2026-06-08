'use client';
import type { LngLatLike } from 'mapbox-gl';
import mapboxgl from 'mapbox-gl';
// MapboxMap.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/use-debounce';
import { useGeolocation } from '@/hooks/use-geolocation';
import { Search } from 'lucide-react';

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
  style = 'mapbox://styles/mapbox/streets-v11',
  height = 'h-80',
  className = '',
  markers = [],
  defaultIconUrl = DEFAULT_ICON,
}) => {
  const { position } = useGeolocation(true);
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [markerInits, setMarkerInits] = useState<MarkerItem[]>(markers);
  const debouncedQuery = useDebounce(searchQuery, 300);

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
  }, [markerInits]);

  useEffect(() => {
    const fetchMarkers = async (query: string) => {
      const res = await fetch(
        `https://greenrelife.dxmd.vn/wp-json/wc/v3/products?search=${encodeURIComponent(query)}`,
        {
          headers: {
            Authorization:
          `Basic ${btoa('ck_199523ebb78a02bb0d6ee9de11ff26d952a589bb:cs_9bbd84666696485dbd1bec40f16c385d39d5af43')}`,
          },
          cache: 'no-store',
        },
      );

      const products = await res.json();
      const newMakers: MarkerItem[] = products
        .map((p: any) => {
          const locationUrl = p.meta_data?.find((m: any) => m.key === '_product_location')?.value;
          if (!locationUrl) {
            return null;
          }

          const match = locationUrl.match(/([-\d.]+),([-\d.]+)/);
          if (!match) {
            return null;
          }

          return {
            id: p.id,
            lng: Number(match[2]),
            lat: Number(match[1]),
            title: p.name,
            description: p.short_description?.replace(/<[^>]+>/g, '') ?? '',
            iconUrl: p.images?.[0]?.src ?? defaultIconUrl,
          };
        })
        .filter(Boolean);
      newMakers.push({
        id: 0,
        lng: Number(position.lat),
        lat: Number(position.lng),
        title: 'Địa điểm hiện tại của bạn',
        description: '',
        iconUrl: defaultIconUrl,
      });
      setMarkerInits(newMakers);
    };
    fetchMarkers(debouncedQuery);
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];
  }, [debouncedQuery, position]);

  return (
    <div className={`${className} relative`}>
      <div className="absolute top-4 left-0 z-10 w-full px-4 pointer-events-none">
        <div className="mx-auto flex w-full max-w-md items-center rounded-full border border-border/50 bg-background/80 backdrop-blur-xl px-4 py-1 shadow-lg shadow-black/5 pointer-events-auto transition-all focus-within:ring-2 focus-within:ring-primary/20">
          <Search className="mr-2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm dịch vụ, địa điểm..."
            className="border-0 bg-transparent p-0 text-foreground shadow-none placeholder:text-muted-foreground focus-visible:ring-0 h-10 text-base"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div
        ref={mapContainer}
        className={`w-full ${height} overflow-hidden rounded-lg border border-gray-100 shadow-sm`}
      />
      <style>{`
        .mapboxgl-ctrl-top-right {
          top: 50% !important;
          transform: translateY(-50%) !important;
        }
      `}</style>
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
