'use client';

import mapboxgl from 'mapbox-gl';
import { useEffect, useRef } from 'react';

const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '<YOUR_MAPBOX_TOKEN>';
mapboxgl.accessToken = token;

export type Position = {
  lat: number;
  lng: number;
};

type Props = {
  value?: Position | null;
  onChange?: (pos: string) => void;
  height?: string;
};

export default function MapLocationPicker({
  value = null,
  onChange,
  height = '400px',
}: Props) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) {
      return;
    }

    // Khởi tạo map
    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: value ? [value.lng, value.lat] : [106.700981, 10.776889], // HCM
      zoom: value ? 14 : 12,
    });

    // Nếu có sẵn tọa độ → gắn marker
    if (value) {
      markerRef.current = new mapboxgl.Marker({ draggable: true })
        .setLngLat([value.lng, value.lat])
        .addTo(mapRef.current);

      markerRef.current.on('dragend', () => {
        const pos = markerRef.current!.getLngLat();
        onChange?.(`${pos.lat},${pos.lng}`);
      });
    }

    // Chọn bằng click
    mapRef.current.on('click', (e) => {
      const { lat, lng } = e.lngLat;

      onChange?.(`${lat},${lng}`);

      // update marker
      if (markerRef.current) {
        markerRef.current.setLngLat([lng, lat]);
      } else {
        if (mapRef.current) {
          markerRef.current = new mapboxgl.Marker({ draggable: true })
            .setLngLat([lng, lat])
            .addTo(mapRef.current);

          markerRef.current.on('dragend', () => {
            const pos = markerRef.current!.getLngLat();
            onChange?.(`${pos.lat},${pos.lng}`);
          });
        }
      }
    });
  }, []);

  return (
    <div
      ref={mapContainer}
      style={{
        width: '100%',
        height,
        borderRadius: '12px',
        overflow: 'hidden',
      }}
    />
  );
}
